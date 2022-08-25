<template>
  <div class="shiplist">
    <div class="card-mounted">
      <v-card
      class="mx-auto my-card"

      >
        <div style="background-color:; margin-bottom:10px;">
          <v-row>
            <v-col>
              <h2 style="float:left; padding-left: 10px;">호선 별 정보 및 운전 데이터</h2>
            </v-col>
            <v-col>
              <v-text-field style="background-color:aquamarine; height: 26px; float: right;"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                class="mx-4 my-tf"
                hide-details="auto"
                rounded
                dense
                background-color="#EDF2FA"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </div>

        <div class="text-center">
          <v-data-table
            class="elevation-1 mytable"
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            hide-default-footer
            multiSort
            :loading="loading"
            loading-text="Loading...Please wait"
            :search="search"

            :page.sync="page"
            @page-count="pageCount = $event"
            @click:row="rowClick"
          >
            <template v-slot:[`item.name`]="{item}">
              <router-link :to="`ship-data/`+item.imo" tag='button'>{{item.name}}</router-link>
            </template>
            <template v-slot:[`item.number`]="{item}">
              <router-link :to="`ship-data/`+item.imo" tag='button'>{{item.number}}</router-link>
            </template>
            <template v-slot:[`item.imo`]="{item}">
              <router-link :to="`ship-data/`+item.imo" tag='button'>{{item.imo}}</router-link>
            </template>
            <template v-slot:[`item.owner`]="{item}">
              <router-link :to="`ship-data/`+item.imo" tag='button'>{{item.owner}}</router-link>
            </template>
            <template v-slot:[`item.delivery`]="{item}">
              <router-link :to="`ship-data/`+item.imo" tag='button'>{{item.delivery}}</router-link>
            </template>
            
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination 
              v-model="page"
              :length="pageCount"
              :total-visible="totalVisible"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              >
            </v-pagination>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        itemsPerPage: 10,
        pageCount: 0,
        totalVisible: 10,
        search: '',
        selectedUrl:'',
        loading: false,
        headers: [
          { text: 'No.', align: 'center', sortable: true, value: 'number' },
          { text: 'Ship Name', align: 'start', sortable: true, value: 'name' },
          { text: 'IMO', align: 'center', sortable: true, value: 'imo' },
          { text: 'Ship Owner', align: 'start', sortable: false, value: 'owner' },
          { text: 'Delivery', align: 'center', sortable: true, value: 'delivery' },
        ],
        items: [
          {
            number: 1,
            name: '창양호',
            imo: '9121027',
            owner: '쌍용 C&E',
            delivery: '2022.02.21',
          },
          {
            number: 2,
            name: '단양호',
            imo: '9121026',
            owner: '쌍용 C&E',
            delivery: '2021.02.22',
          },
          {
            number: 2,
            name: '진양호',
            imo: '9121025',
            owner: '쌍용 C&E',
            delivery: '2021.02.23',
          },
        ],
        
      }
    },
    computed: {
      // pageCount() {
      //   return ~~(this.items.length/this.itemsPerPage)+((this.items.length%this.itemsPerPage)===0 ? 0:1);
      // }
      getitems () {
        if (length(this.items)%this.itemsPerPage === 0)
        return this.items
        else{
          this.items.add({
            number: null,
            name: '',
            imo: '',
            owner: '',
            delivery: '',
          },)
        return this.items
        }
      }
    },
    methods: {
      filterOnlyCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
      //rowClick(item,row)
      rowClick(item)
      {
        this.selectedUrl = "/ship-data/" + item.imo
        this.$router.push(this.selectedUrl)
        //location.href= this.selectedUrl
      },
      // getPageCount (itemQty, itemPerPage){
      //   return  ~~(length(items)/itemsPerPage)+((length(items)%itemsPerPage)===0 ? 0:1);
      // }
    },
  }
</script>

<style scoped>
  .v-data-table-header{
    color :aquamarine
  }
  .mid-headercell{
            
    background-color: rgb(233, 112, 13);
  }
  .my-card{
    max-width: 80vw;
  }
  .shiplist{
    background-color: #EDF2FA;
    height: calc(100vh - 64px);
    min-height: 800px;
  }
  .card-mounted{
    padding-top: 100px;
  }
  .my-tf{
    max-width: 300px;
  }
  ::v-deep .v-data-table-header{
    background-color: #E6E6E640;
    font-family: sans-serif bold;
  }
</style>