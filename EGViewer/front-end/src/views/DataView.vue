<template>
  <div class="dataview">
    <div v-if="loading">loading...
      <v-progress-linear
        indeterminate
        color="primary"
      ></v-progress-linear>
    </div>
    <div v-if="queryData!=null">
      
      <div v-if="view==0">
        <div><h3><h3 style="text-transform : uppercase;">{{mode}}</h3> Sheet</h3></div>
        <SpreadSheet :queryData="queryData" :keyData="keyData"></SpreadSheet>
      </div>
      
      <div v-if="view==1">
        <div><h3><h3 style="text-transform : uppercase;">{{mode}}</h3> Trend</h3></div>
        <TrendLine :queryData="queryData" :keyData="keyData"></TrendLine>
      </div>
      
      <div v-if="view==2">
        <div><h3><h3 style="text-transform : uppercase;">{{mode}}</h3> Average</h3></div>
        <Average :queryData="queryData" :keyData="keyData"></Average>
      </div>

    </div>
  </div>
</template>

<script>
const SHEET = 0
const TREND = 1
const AVERG = 2
import {data} from '../api'
import SpreadSheet from '../components/SpreadSheet'
import Average from '../components/Average'
import TrendLine from '../components/TrendLine'

export default {
  name: 'DataView',
  props : {
    columns : Array,
    shipid : String,
  },
  components:{
    SpreadSheet,
    Average,
    TrendLine,
  },
  data() {
    return {
      viewId:'',
      loading: false,
      mode:'',
      view:'',
      startTime:'',
      endTime:'',
      columsString:'',
      queryData:null,
      keyData:null,
    } 
  },
  created(){

  },
  watch:{
    '$route' () {
      this.FetchData()
    },
  },
  methods: {
    FetchData() {
      this.loading = true
      setTimeout(()=>{
        this.viewId =  this.$route.params.viewid
        const words = this.viewId.split(';')
        this.mode = words[0]
        this.view = words[1]
        this.startTime = `${words[2]} ${words[4]}`
        this.endTime = `${words[3]} ${words[5]}`

        this.keyData = this.columns
        this.queryData = null

        switch(parseInt(this.view)){
          case SHEET:
          case TREND:
            this.columsString = '';
            this.columns.forEach(element => {
              this.columsString += `,${element.column_name}`
            })

            data.fetchRecord(this.shipid,this.mode,this.columsString,this.startTime,this.endTime)
            .then(data => {
              this.queryData = data
            })
            .catch(res=>{
              this.error = res.response.data
              console.log(this.error)
            })
            break
          case AVERG:
            this.columsString = '';
            this.columns.forEach(element => {
              this.columsString += `,avg(${element.column_name}) ${element.column_name}`
            })

            data.fetchAverage(this.shipid,this.mode,this.columsString,this.startTime,this.endTime)
            .then(data => {
              this.queryData = data
            })
            .catch(res=>{
              this.error = res.response.data
              console.log("this.error")
            })
            break
          default:
            break
        }
        this.loading = false
      }, 500)
    }
  },

}
</script>

<style>

</style>