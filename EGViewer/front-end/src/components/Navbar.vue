<template>
    <div id="nav">
      <v-card
        class="mx-auto overflow-hidden"
        height="max"
      >
        <div v-if = "isSignIn">
          <v-app-bar
            color="#E6E6E6"
            height = 64px
            elevation="1"
          >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <router-link to="/" tag = button><v-img src="../assets/IMS-.png" max-height="60" max-width="60"></v-img></router-link>
            <v-toolbar-title style="margin-left:10px">선박평형수 처리장치 A/S지원 플랫폼</v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> | -->
            
            <h4 v-if = "isAuth"><router-link to="/my-page" tag = button><v-icon>mdi-account-circle</v-icon>{{getUser.fullname}}</router-link>님 반갑습니다.</h4>
            <h4 v-else>세션만료. 로그인 바랍니다.</h4>
            <v-menu
              bottom
              min-width="200px"
              rounded
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    x-large
                    v-on="on"
                  >
                  <v-avatar :color="getUser.color" size = "40">
                    <span class="white--text text-h5">{{ getUser.initial }}</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                  <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                      <v-avatar
                        :color="getUser.color"
                      >
                        <span class="white--text text-h5">{{ getUser.initial }}</span>
                      </v-avatar>
                      
                      <h3 style="margin-top:10px">{{ getUser.fullname }}</h3>
                      <p class="text-caption mt-1">
                        {{ getUser.email }}
                      </p>
                      <v-divider class="my-3"></v-divider>
                      <router-link to="/my-page" tag = 'button'>
                        <v-btn
                          depressed
                          rounded
                          text
                        >
                          Edit Account
                        </v-btn>
                      </router-link>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        depressed
                        rounded
                        text
                        @click.prevent="logout"
                      >
                        Disconnect  
                      </v-btn>
                    </div>
                  </v-list-item-content>
              </v-card>
            </v-menu>
          </v-app-bar>
          <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
          >
            <v-list
              nav
              dense
            >
              <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
              >
                <v-list-item>
                  <router-link to="/" tag = 'button'>
                    <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    </router-link>
                    <router-link to="/" tag = 'button'>
                      <div>
                      <v-list-item-title style="width:max-content">Home</v-list-item-title>
                      </div>
                    </router-link>
                </v-list-item>

                <v-list-item>
                  <router-link to="/ship-list" tag = 'button'>
                    <v-list-item-icon>
                      <v-icon>mdi-chart-line</v-icon>
                    </v-list-item-icon>
                  </router-link>
                  <router-link to="/ship-list" tag = 'button'>
                    <v-list-item-title>호선 별 데이터</v-list-item-title>
                  </router-link>
                </v-list-item>

              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </div>
        <RenderingSpace/>
      </v-card>
    </div>
</template>

<script>
import { setAuthInHeader } from "../api"
import RenderingSpace from '../components/RenderingSpace.vue'

export default {
  data() {
      return {
        drawer: false,
        group: null,
      }
  },
  created(){
    console.log("created")
  },
  mounted() {
    console.log("mounted")
  },
  computed:{
    isAuth() {
      return !!localStorage.getItem('token')
    },
    isSignIn() {
      return this.$store.state.userStore.isSignIn
    },
    getUser(){
      return JSON.parse(this.$store.state.userStore.userInfo)//localStorage.getItem('arvr.name')//this.$store.state.fullName
    }
  },
  methods: {
    logout() {
      
      delete localStorage.token
      setAuthInHeader(null)
      this.$router.push('/sign-in')
      this.$store.commit('UPDATE_SIGN_IN',false)
      //this.$store.state.userStore.isSignIn = false
    },
  },
  components: {
    RenderingSpace,
  }
}
</script>


<style lang="scss">
#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>