<template>
  <div>DataView:{{viewid}}</div>
</template>

<script>
export default {
  data() {
    return {
      viewid:'',
    } 
  },
  created(){
    this.viewid  = this.$route.params.viewid
  },
  watch:{
    '$route' () {
      this.viewid  = this.$route.params.viewid
    }
  },

}
</script>

<style>

</style>