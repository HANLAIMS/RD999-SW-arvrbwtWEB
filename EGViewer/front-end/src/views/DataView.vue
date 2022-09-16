<template>
  <div class="dataview">
    <div v-if="loading">loading...</div>
    <div>DataView:{{viewId}}</div>
    <div v-if="view==0">sheet</div>
    <div v-if="view==1">trend line</div>
    <div v-if="view==2">average</div>
  </div>
</template>

<script>
  const SHEET = 0
  const TREND = 1
  const AVERG = 2
export default {
  data() {
    return {
      viewId:'',
      loading: false,
      mode:'',
      view:'',
      startTime:'',
      endTime:'',
      colums:'',
    } 
  },
  created(){
    this.FetchData()
  },
  watch:{
    '$route' () {
      this.FetchData()
    }
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
        this.colums = words[0]

        switch(parseInt(this.view)){
          case SHEET:
            console.log('s')
            break
          case TREND:
          console.log('t')
            break
          case AVERG:
          console.log('a')
            break
          default:
            break
        }

        //지워!!
        //console.log(this.mode+this.view+this.startTime+this.endTime+this.colums)
        this.loading = false
      }, 500)
    }
  },

}
</script>

<style>

</style>