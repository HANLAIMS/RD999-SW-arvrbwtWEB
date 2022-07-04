<template>
  <div class="home">
    <navbar/>
    <div v-if ="loading">
          Loading...
          <v-skeleton-loader
          type="table-tfoot, image, date-picker"
        ></v-skeleton-loader>
    </div>
    <div v-else> 
      <v-progress-circular
      indeterminate
      color="red"
    ></v-progress-circular>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import {dashboard} from '../api'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    // HelloWorld
  },
  data() {
    return {
      loading:false,
      dashboardinfo:'',
      error:'',
    }
  },
  created() {
       this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {

      },300000)

      dashboard.fetch()
        .then(data => {
          this.dashboardinfo = data
        })
        .finally(()=>{
          this.loading = false
        })
    }
  }
}
</script>