<template>
  <div class="login">
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
                      v-model="email"
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
                  <v-text-field
                      class="form-control" 
                      v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required,rules.min]"
                      :type="showPass ? 'text' : 'password'"
                      :color="error ? '#f00' : ''"
                      :hint="hint"
                      style=";"
                      counter
                      outlined
                      solo
                      single-line
                      clearable
                      label="PASSWORD"
                      @click:append="showPass = !showPass"
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
                  <v-checkbox
                      v-model="isSave"
                      label="아이디 저장"
                      :color="'#213A5B'"
                      style="margin-top: 0px; margin-left: -3px;"
                      hide-details
                      ></v-checkbox>
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
export default {
    data () {
      return {
        showPass: false,
        error: false,
        isSave: false,
        email: '',
        
        hint:'At least 8 characters',
        //password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
}
</script>

<style>
.login {
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