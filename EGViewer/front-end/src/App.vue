<template>
  <v-app>
    <div id="app">
      <Navbar></Navbar>
    </div>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
  name: "app",
  created() {
    this.$store.state.isSignIn = !!localStorage.getItem('token')
  },
  data() {
      return {};
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body, #app {
  height: 100%;
  margin: 0px;
}
#app {
  display: flex;
  flex-direction:column;
}
.container {
  flex-grow: 1;
  position: relative;
}
.btn {
  border-radius: 3px;
  padding: 6px 8px;
  background-color: #e2e4e6;
  border: none;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  line-height: 20px;  
  font-weight: 700;
  cursor: pointer;
}
.btn-success {
  background-color: #5aac44;
  box-shadow: 0 0px 0 #423998;
}
.form-control {
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color .3s;
}
input[type=text].form-control,
input[type=password].form-control,
textarea.form-control {
  font-size: 14px;
}
.form-control:focus {
  background-color: #fff;
}
</style>
