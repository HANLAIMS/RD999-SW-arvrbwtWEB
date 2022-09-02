<template>
  <div class="dataview">
    <div v-if="loading">loading...</div>
    <div>DataView:{{viewid}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewid:'',
      loading: false,
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
        this.viewid =  this.$route.params.viewid
        this.loading = false
      }, 500)
    }
  },

}
</script>

<style>

</style>