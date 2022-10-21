<template>
  <div class="signin">
    <v-row>
      <v-col>
        <img class="IMS__WHITE-01" src="../assets/IMS__WHITE-01.png">
      </v-col>
      <v-col>
        <div class="panel">
          <div class = "image">
            <div class="dialog">
              <h2 style="color:white">선박평형수 처리장치 A/S지원 플랫폼</h2>
              <div Class = "discription">로그인을 하시면 서비스를 이용하실 수 있습니다.</div>
              <form @submit.prevent="onSubmit">
              <div class ="tfield_pass">
                  <v-text-field
                      class="form-control" 
                      autofocus
                      v-model="account"
                      single-line
                      outlined
                      clearable
                      solo
                      label="USER ID"
                      prepend-inner-icon="mdi-account"
                      style="height:72px; padding-top: 10px;"
                  ></v-text-field>
              </div>
              <div class ="tfield_pass">
                <!-- :rules="[rules.required,rules.min]" -->
                  
                  <v-text-field
                      class="form-control" 
                      id="passinput"
                      v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"                      
                      :rules="!error=='' ? [rules.emailMatch]:[rules.required,rules.min]"
                      :type="showPass ? 'text' : 'password'"                      
                      counter
                      outlined
                      solo
                      single-line
                      clearable
                      label="PASSWORD"
                      @click:append="showPass = !showPass"
                      @input="error=''"
                      prepend-inner-icon="mdi-key"
                  ></v-text-field>
              </div>      
              <div>
                  <v-btn  
                      class="btn" 
                      :class="{'btn-success': !invalidForm}" 
                      type="submit" 
                      x-large
                      depressed
                      :color="'#213A5B'"
                      style="color:white"
                      block
                      :disabled="invalidForm">로그인
                  </v-btn>
              </div>
              <div>
                <v-row>
                  <v-col>
                     <!-- :color="'#213A5B'"             -->

                    <div>        
                                  
                      <v-checkbox
                        v-model="isSave"

                        label="아이디 저장"
                        color = #213A5B
                        
                        style="margin-top: 0px; margin-left: -3px;"
                        hide-details
                        ></v-checkbox>
                      </div>
                  </v-col>
                  <v-col>
                    <div style="margin-top:4px; float:right" >
                      <router-link to="/register" style="color:#A6ADB4; font-size:small ;">계정 등록하기</router-link>
                    </div>
                  </v-col>
                </v-row>
              </div>
              
              </form>
              <!-- <p class="error" v-if="error">{{hint}}</p> -->
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {auth,setAuthInHeader} from '../api'

export default {
    data () {
      return {
        showPass: false,
        account: '',
        error:'',
        isSave: false,
        email: '',
        password: '',
        rPath: '',
        
        hint:'At least 8 characters',
        //password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    computed: {
      invalidForm() {
         return !this.account ||!this.password
      },
      isSignIn() {
        return this.$store.state.userStore.isSignIn
      }
    },
    created() {
      this.rPath = this.$route.query.rPath || '/'
      this.account = localStorage.getItem('account')
      this.isSave = JSON.parse(localStorage.getItem('issave'))
      this.$store.state.isSignIn = false
    },
    methods: {
      onSubmit() {
        auth.login(this.account, this.password)
        .then(data => {
          localStorage.setItem('issave',this.isSave)
          localStorage.setItem('token',data.accessToken)
          //localStorage.setItem('arvr.name',data.user.name)
          this.$store.commit('UPDATE_USER_INFO',JSON.stringify(data.user.info))
          
          this.isSave ? localStorage.setItem('account',this.account) : delete localStorage.account
          setAuthInHeader(data.accessToken)
          this.$router.push(this.rPath)
          this.$store.commit('UPDATE_SIGN_IN',true)
          //this.$store.state.userStore.isSignIn = true
        })
        .catch(err => {
          this.error = err.data.error
          document.getElementById('passinput').focus()
          this.$store.commit('UPDATE_SIGN_IN',false)
          //this.$store.state.isSignIn = false
        })
          
      },
      setItemWithExpireTime(keyName,keyValue,tts) {
        const obj = {
          value: keyValue,
          expire: Date.now() + tts
        }
        const objString = JSON.stringify(obj);
        window.localStorage.setItem(keyName, objString)
      }
    }
}
</script>

<style>
.signin {
  width: 200vh;
  background-color: #3E88D2;
  background-image: url("../assets/GettyImages-946232676.jpg");
  background-size:cover;
  background-position: center;
  margin: auto; 
  height: 100vh;
}
.error {
  color: #f00;
}
.discription{
  font-size:smaller;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #A6ADB4;  
}
.tfield_pass{
    margin-top: auto;
}
.v-text-field-error{
    height:auto;
}
.v-text-field{
    height:83px;
}
.dialog{
    
    width:fit-content;
    padding-top: 50vh;
    padding-bottom: 30vh;    
    
}
.image{
    overflow: hidden;
    height: 100vh;
    width:500px;
    display: inline-block;
    float: right;
    background-size: cover;
    background-repeat: repeat;
    background-position: center;
    background-image: url("../assets/loginPanel.png");
    background-blend-mode: multiply;
    background-color: #1C5688;
}
.panel{
    float: right;
    width: 680px;
    height: 100vh;
    border-bottom: 100vh solid #1C5688;
    border-left: 180px solid transparent;
    
}
.IMS__WHITE-01{
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.502));
		position: absolute;
		width: 150px;
		height: 92.87px;
		left: 100px;
		top: 100px;
		overflow: visible;
}
</style>