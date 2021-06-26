<template>
    <div class="container">
    <div>
      <p>Here comes a form</p>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group id="input-group-2"  label-for="input-2" class="mb-2">
        <b-form-input
          id="input-2"
          v-model="username"
          placeholder="Username"          
        ></b-form-input>
      </b-form-group> 
      <!-- server side: username errors -->
      <div class="warn mb-1" v-if="servResp.usernameErr">  
        <ul>      
          <li v-for="usernameErr in servResp.usernameErr" :key="usernameErr.id">
            {{usernameErr}}
          </li> 
        </ul>         
      </div>       
      <b-form-group
        id="input-group-1"
        class="mb-1"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"          
        ></b-form-input>
      </b-form-group>
      <!-- server errors: email errors -->
      <div class="warn mb-1" v-if="servResp.emailErr">
        <ul>
          <li v-for="emailErr in servResp.emailErr" :key="emailErr.id">
            {{emailErr}}
          </li>
        </ul>
      </div>
      <b-form-group id="input-group-5"  label-for="input-3" class="mb-2">
        <b-form-input
          id="input-5"
          type="password"
          v-model="psw"
          placeholder="Enter password"          
        ></b-form-input>
      </b-form-group>   
      <!-- server errors: password errors -->
      <div class="warn mb-1" v-if="servResp.pswErr">
        <ul>
          <li v-for="pswErr in servResp.pswErr" :key="pswErr.id">
            {{pswErr}}
          </li>
        </ul>
      </div>   
      <b-form-group id="input-group-4" label-for="input-4" class="mb-1">
        <b-form-input
          id="input-4"
          type="password"
          v-model="psw2"
          placeholder="Confirm password"         
        ></b-form-input>
      </b-form-group>
      <!-- server errors: non-field errors -->
      <div class="warn mb-1" v-if="servResp.nonFieldErr">
        <ul>
          <li v-for="err in servResp.nonFieldErr" :key="err.id">
            {{err}}
          </li>
        </ul>
      </div>
      <!-- django server is down -->
      <div class="warn mb-3" v-if="servResp.netWorkErr">
        <div class="px-1">{{servResp.netWorkErr}}</div>
      </div>
      <b-row class="text-center">
        <b-col cols="6">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col >
        <b-col cols="6">
          <b-button type="reset" variant="danger">Reset</b-button>

        </b-col>
      </b-row>
    </b-form>
    <p class="mt-3">Already have an account?<span class="mute-link"><router-link :to='{name:"login"}'>Sign Up</router-link></span></p>    
    
  </div>
    </div>
</template>

<script>
import {actionTypes} from '@/store/modules/auth'
export default {
    name:'AppSignUp',
     data(){
    return {
      show:true,
      email:"",
      username:"",
      psw:"",
      psw2:"",
      servResp:{
        status:'',
        usernameErr:null,
        emailErr:null,
        pswErr:null,
        nonFieldErr:null,
        netWorkErr:null
      }      
    }
  },
  methods:{
      onSubmit(){
          this.$store.dispatch(actionTypes.register,{
              email:this.email,
              username:this.username,
              password:this.psw,
              re_password:this.psw2
          }).then((resp)=>{
              console.log("got response from store")
              if(resp.status===200||resp.status===201){
                  this.submitStatus = 'PENDING'
                  this.$router.push({name:"confirmEmail"})
              }
          }).catch((err)=>{
              console.log("err by signup",err)
              console.log("err by signup",Object.keys(err))
            if(err.response===undefined&&err.toJSON().message==='Network Error'){
            this.servResp.netWorkErr = 'Sorry. Our server is enduring some problems.Please try to create account later'
            
            }else if(err.response.status ===400){
                this.servResp.status = 400
                this.servResp.usernameErr = err.response.data.username;          
                this.servResp.emailErr = err.response.data.email;
                this.servResp.pswErr = err.response.data.password;
                this.servResp.nonFieldErr = err.response.data.non_field_errors;
            }else if(err.response.status ===404){
                console.log("Page not found")
            }else if(err.status===401){
                console.log("not auth-ed")
            }else if(err.status===500){
                console.log("server error 500")
            }else{
                console.log("Server can't be reach; check your internet connection, please")
            }
        })
      }
  }
}
</script>
<style>
.warn {
  background-color: rgb(240, 194, 194);
  border-radius: 3px;
}
.warn ul li{
  list-style-type:none;
}

</style>