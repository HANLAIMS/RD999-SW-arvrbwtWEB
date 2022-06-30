<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/my-page">회원정보 수정</router-link> |
      <a href="" v-if = "isAuth" @click.prevent="logout">로그아웃</a>
      <router-link v-else to="/sign-in">로그인</router-link>
      <h4 v-if = "isAuth"><router-link to="/my-page" style="color:#008F8F">{{user}}</router-link>님 반갑습니다.</h4>
      <h4 v-else>세션만료. 로그인 바랍니다.</h4>
    </div>
</template>

<script>
import { setAuthInHeader } from "../api"

export default {
  data(){
    return{
      user: '기술연구소'
    }
  },
  created(){
    this.user = localStorage.getItem('arvr.name')
  },
  computed:{
    isAuth() {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      delete localStorage.token
      setAuthInHeader(null)
      this.$router.push('/sign-in')
    }
  },
}
</script>


<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>