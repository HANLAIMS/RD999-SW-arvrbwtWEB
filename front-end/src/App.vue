<template>
  <div id="app">
    <SignIn msg=""/>
  </div>
</template>

<script>
import SignIn from './components/SignIn.vue'

export default {
  name: 'App',
  components: {
    SignIn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #da7110;
  margin-top:-8px;
  margin-left: -8px;
}
</style>
