<template>
  <div class="shipdata">
    <v-card
    :loading="loading"
    class="mx-auto my-card"
    >
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        max-height="800"
        contain
        :src=image
      ></v-img>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 text-left">{{shipName}}</v-list-item-title>
          <v-list-item-subtitle class="text-left" >{{shipid}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-list class="transparent">
        <v-list-item
          class="my-list-item"
          v-for="param in params"
          :key="param.name"
        >
          <v-list-item-subtitle class="text-left">{{param.name}}</v-list-item-subtitle>
          <v-list-item-subtitle class="text-left" style="color:royalblue">{{param.value}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Operation data</v-card-title>

      <v-card-text class="text-left">
          <v-list-item class="my-list-item2">
            <v-list-item-subtitle class="text-left">[Accumulated operating hours]</v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            class="my-list-item"
            v-for="operation in operations"
            :key="operation.name"
          >
            <v-list-item-subtitle class="text-left" style="text-transform:uppercase">{{operation.name}}-MODE</v-list-item-subtitle>
            <v-list-item-subtitle class="text-right" style="color:royalblue; white-space: pre;;">{{operation.value}}</v-list-item-subtitle>
          </v-list-item>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      
      <v-card-title>Detail figures</v-card-title>

      <v-card-text class="text-left">
        <v-list-item>
          <v-chip-group
              v-model="selection"
              active-class="primary accent-4 white--text"
              column
          >
            <v-icon>mdi-ship-wheel</v-icon>
            <div 
              v-for="operation in operations"
              :key="operation.name"
            >
              <v-chip style="text-transform:capitalize" label>{{operation.name}}</v-chip>
            </div>
            <v-chip @click="InitViewType" style="text-transform:capitalize" label >Alarm</v-chip>
          </v-chip-group>
          
          <v-chip-group
              v-model="viewtype"
              active-class="primary accent-4 white--text"
              column
              v-if="selection!==3"
          >
            <v-icon >mdi-database-eye-outline</v-icon>
            <v-chip style="text-transform:capitalize" label>Sheet</v-chip>
            <v-chip style="text-transform:capitalize" label>Trend line</v-chip>            
            <v-chip style="text-transform:capitalize" label>Average</v-chip>
          </v-chip-group>
        </v-list-item>

        <v-list-item class="my-list-item2">
          <!-- 날짜 -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-combobox
                v-model="dates"
                multiple
                chips
                small-chips
                label="Multiple picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-combobox>
            </template>
            <v-date-picker
              v-model="dates"
              range
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <!-- 시작시간 -->
          <v-menu
            ref="startpick"
            v-model="startpick"
            :close-on-content-click="false"
            :return-value.sync="startTime"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTime"
                label="Start time"
                prepend-icon="mdi-clock-start"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="startTime"
              format="24hr"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="startpick = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startpick.save(startTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-menu>
          <!-- 종료시간 -->
          <v-menu
            ref="endpick"
            v-model="endpick"
            :close-on-content-click="false"
            :return-value.sync="endTime"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endTime"
                label="End time"
                prepend-icon="mdi-clock-end"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="endTime"
              format="24hr"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="endpick = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.endpick.save(endTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-menu>
        </v-list-item>
      </v-card-text>

      <router-view></router-view>

      <v-card-actions>
        <router-link :to="`/ship-data/${shipid}/data-view/${viewid}`" tag = 'button'>
          <v-btn
            color="primary lighten-2"
            text
          >
            View Detail
          </v-btn>
        </router-link>
        <router-link :to="`/ship-list`" tag = 'button'>
          <v-btn
            color="primary lighten-2"
            text
          >
            ship list
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {list,data} from '../api'

export default {
  name: 'ShipData',
  components: {
  },
  data () {
    return{
      dates: [
        (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      ],
      error:'',
      startTime: '00:00',
      endTime: '23:59',
      menu: false,
      startpick: false,
      endpick: false,
      loading: false,
      shipid: '',
      selection: 0,
      viewtype:0,
      selectedUrl:'',
      columns:[],
      selectedColString:'',
      viewid:'default',
      image:'https://photos.marinetraffic.com/ais/showphoto.aspx?photoid=2597671',
      shipName: 'CHANG YANG',
      params: [
        {
          name:"Ship Owner",
          value:"쌍용E&C",
        },
        {
          name:"Flag",
          value:"KR",
        },
        {
          name:"Install Date",
          value:"2021.08.10",
        },
        {
          name:"Model",
          value:"EG0500",
        },

      ],
      operations: [
        {
          name:"ballast",
          value:"00:05:34",
        },
        {
          name:"deballast",
          value:"00:07:17",
        },
        {
          name:"bypass",
          value:"17:23:34",
        },
      ]
    }
  },
  watch:{
    selection(){
      this.SetViewId()
    },
    viewtype(){
      this.SetViewId()
    },
    dates(){
      this.SetViewId()
    },
    startTime(){
      this.SetViewId()
    },
    endTime(){
      this.SetViewId()
    },
  },
  created() {
    //ref route/index.js
    this.shipid = this.$route.params.shipid
    this.FetchData()
    this.SetViewId()
    scrollTo(0,0)
  },
  methods:{
    InitViewType(){
      this.viewtype = '';
    },
    SetViewId(){
      this.viewid = this.operations[this.selection].name + ';' + 
                    this.viewtype + ';' + 
                    this.dates[0] + ';' +
                    (this.dates[1]?this.dates[1]:this.dates[0]) + ';' +
                    this.startTime + ';' +
                    this.endTime + ';'
    },
    FetchData(){
      this.loading = true
      //setTimeout(() => (this.loading = false), 2000)
      list.fetch(localStorage.getItem('account'),this.shipid)
        .then(data => {
          this.params.splice(0,this.params.length)
          this.params.push({
              name: "Ship Owner",
              value: data.data.owner_name
          })
          this.params.push({
              name: "Flag",
              value: data.data.owner_country
          })
          this.params.push({
              name: "Install Date",
              value: new Date(data.data.hull_product_installed_date).toLocaleDateString()
          })
          this.params.push({
              name: "Model",
              value: `${data.data.hull_product}(${data.data.hull_product_ver})`
          })
        })
        .catch(res=>{
          this.error = res.response.data
          console.log(this.error)
        })
        .finally(()=>{
          this.loading = false
        })
      data.fetch(this.shipid)
        .then(datas => {
        this.operations.splice(0,this.operations.length)
        datas.list.forEach((data) => {
          this.operations.push({
            name: data.operation_name,
            value: `${(data.total_operation_duration.days ? data.total_operation_duration.days : 0).toString()} day ${(data.total_operation_duration.hours ? data.total_operation_duration.hours : 0).toString().padStart(2,'0')} :${(data.total_operation_duration.minutes ? data.total_operation_duration.minutes : 0).toString().padStart(2,'0')} :${(data.total_operation_duration.seconds ? data.total_operation_duration.seconds : 0).toString().padStart(2,'0')}  (${new Date(data.min).toLocaleDateString()}~${new Date(data.max).toLocaleDateString()})`
          })
        })
      })
      .catch(res=>{
          this.error = res.response.data
          console.log(this.error)
      })
      
      data.fetchColumn(this.shipid,this.operations[this.selection].name)
        .then(datas => {
        this.columns = datas.list;
        console.log(this.columns)
      })
      .catch(res=>{
          this.error = res.response.data
          console.log(this.error)
      })
    }
  },
}
</script>

<style scoped>

  .shipdata{
    background-color: #EDF2FA;
    min-height: calc(100vh - 64px);
    padding: 40px;
  }
  .my-card{
    max-width: 60vw;
  }
  .my-text-field{
    max-width: 200px;
    max-height: 50px;
  }
  .my-list-item{
    margin-top:-25px;
    margin-bottom:-25px;
  }
  .my-list-item2{
    margin-top:-10px;
    margin-bottom:-10px;
  }


</style>