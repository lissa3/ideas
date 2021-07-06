<template>
    <div class="container">
      <div class="row mx-auto  my-5 main-signup" style="max-width: 800px;">
          <div class="col col-md-12 col-sm-6 py-3">    
          <h3>Register, please.</h3>
          <b-form @submit.prevent="onSubmit" v-if="show">
<!-- username  -->
            <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
                description="Username should be at least 2 chars long"
                class="form-group required"
              > 
            <b-form-input
                id="input-1"
                type="text"
                :class="{ 'is-invalid warning': this.$v.username.$error,'form-control':true, }"
                @blur="$v.username.$touch()"      
                v-model.trim="username"
                         
            ></b-form-input>
<!-- front side errors -->
              <b-form-invalid-feedback v-if="usernameRequired" class="invalid-feedback"
              >{{ fieldRequired }}
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="inValidUsernameMinLen" class="invalid-feedback"
              >username should at most {{ $v.username.$params.minLength.min }} chars
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="inValidUsernameMaxLen" class="invalid-feedback"
              >username should at most {{ $v.username.$params.maxLength.max }} chars
              </b-form-invalid-feedback>             
              
            </b-form-group> 
<!-- server side: username errors -->
            <div class="warn mb-1" v-if="servResp.usernameErr">  
              <ul>      
                <li v-for="usernameErr in servResp.usernameErr" :key="usernameErr.id">
                  {{usernameErr}}
                </li> 
              </ul>         
            </div> 
<!-- email -->
            <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
                description="We'll never share your email with anyone else."
              >
              <b-form-input
                id="input-2"
                v-model.trim="email"            
                type="email"
                :class="{ 'is-invalid warning': this.$v.email.$error }"
                @blur="$v.email.$touch()" 
                          
              ></b-form-input>
<!-- front-side errors email-->            
            <b-form-invalid-feedback v-if="emailRequired" class="invalid-feedback"
              >{{ fieldRequired }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="inValidEmail" class="invalid-feedback"
              >This field should be a valid email</b-form-invalid-feedback>
            </b-form-group>
<!-- server errors: email errors -->            
            <div class="warn mb-1" v-if="servResp.emailErr">
              <ul>
                <li v-for="emailErr in servResp.emailErr" :key="emailErr.id">
                  {{emailErr}}
                </li>
              </ul>
            </div>

<!-- psw -->
          <b-form-group
                id="input-group-3"
                label="Password:"
                label-for="input-3"
                description="Password should contain at least one capital letter: (A-Z); at least one digit: 0-9; at least one special character (! @ $ % #) and be at least 6 chars long"                
              >
               <div class="row border">
                <div class="col-md-10 border-0">
                  <b-form-input
                    id="input-3"
                    v-model.trim="psw"
                    :type="showPassword ? 'text' : 'password'"
                    @blur="$v.psw.$touch()"
                    :class="{ 'is-invalid warning': this.$v.psw.$error }"          
                  ></b-form-input>
                </div>
                <div class="col-md-2 border-0 pt-1 point-it">
                <span ><b-icon-eye @click="toggleShowPws" /></span>
              </div>
              </div>
<!--psw front side errors  -->
              <div class="mistake" v-if="checkSimilar">
                <div>{{ checkSimilar }}</div>
              </div>           
              <b-form-invalid-feedback v-if="inValidPswMinLen" class="invalid-feedback"
                >password should at least
                {{ $v.psw.$params.minLength.min }} chars
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="inValidPswMaxLen" class="invalid-feedback"
                >password should at most {{ $v.psw.$params.maxLength.max }} chars
              </b-form-invalid-feedback>
              <ul class="mistake" v-if="$v.psw.$dirty && inCorrectPsw">
                <li class="" v-for="note in inCorrectPsw" :key="note.id">{{ note }}</li>
              </ul>
          </b-form-group>  
              
<!-- psw server errors: password errors -->
            <div class="warn mb-1" v-if="servResp.pswErr">
              <ul>
                <li v-for="pswErr in servResp.pswErr" :key="pswErr.id">
                  {{pswErr}}
                </li>
              </ul>
            </div>            
<!-- re-psw -->
            <b-form-group
                id="input-group-4"
                label="Password confirmation"
                label-for="input-4"                
              >             
              <b-form-input
                id="input-4"
                type="password"
                placeholder="Repeat your password, please"
                v-model="psw2"
                @blur="$v.psw2.$touch()"
              :class="{ 'is-invalid warning': this.$v.psw2.$error }"         
              ></b-form-input>
<!-- front re-psw errors -->
              <b-form-invalid-feedback
                v-if="$v.psw2.$dirty && !$v.psw2.sameAs"
                class="invalid-feedback"
                >Passwords must be identical
              </b-form-invalid-feedback>
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
<!-- accept rules -->
            <div>
              <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
                class="control-lable"
                @blur="$v.state.$touch()"
              >
                I accept the rules
              </b-form-checkbox>
            </div>
<!-- buttons group -->
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-button type="submit"  variant="success" :disabled="$v.$invalid && $v.$error||!this.checkSelected">Submit</b-button>
              </b-col >
              <b-col cols="6">
                <b-button type="reset" variant="danger">Reset</b-button>

              </b-col>
            </b-row>
              
          </b-form> 
          <p class="mt-3">
            Already have an account? <router-link to="/login">Login</router-link>
          </p>  
      </div>
    </div>
    </div> 
</template>

<script>
import {actionTypes} from '@/store/modules/auth'
import { required,  email,  minLength,  maxLength,  sameAs,} from  "vuelidate/lib/validators";
export default {
    name:'AppSignUp',
     data(){
    return {
      show:true,
      email:"",
      username:"",
      psw:"",
      psw2:"",
      // user should accept terms and use
      status:'not accepted',
      servResp:{
        status:'',
        usernameErr:null,
        emailErr:null,
        pswErr:null,
        nonFieldErr:null,
        netWorkErr:null
      },
      //front-side vars/errors
      fieldRequired: "This field is required",
      // toggle password visiabilty
      showPassword: false,     
    }
  },
  validations: {
    username:{
      required,
      minLength: minLength(2),
      maxLength: maxLength(120)
    },
    email: { required, email },
    // status:{required},
    psw: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(128),
    },
    psw2: {
      required,
       minLength: minLength(8),
      maxLength: maxLength(128),
      sameAs: sameAs("psw"),
    },
  },
  computed:{
    usernameRequired() {
      return this.$v.username.$dirty && !this.$v.username.required;
    },
    inValidUsernameMinLen() {
      return this.$v.username.$dirty && !this.$v.username.minLength;
    },
    inValidUsernameMaxLen() {
      return this.$v.username.$dirty && !this.$v.username.maxLength;
    },
    emailRequired() {
      return this.$v.email.$dirty && !this.$v.email.required;
    },
    inValidEmail() {
      return this.$v.email.$dirty && !this.$v.email.email;
    },
    pswRequired() {
      return this.$v.psw.$dirty && !this.$v.psw.required;
    },
    inValidPswMinLen() {
      return this.$v.psw.$dirty && !this.$v.psw.minLength;
    },
    inValidPswMaxLen() {
      return this.$v.psw.$dirty && !this.$v.psw.maxLength;
    },
    inCorrectPsw() {
      const customErrors = [];
      if (!this.$v.psw.$dirty) return customErrors;
      !/(?=.*[A-Z])/.test(this.psw) &&
        customErrors.push("Your passsword should have a capital letter");
      !/(?=.*\d)/.test(this.psw) &&
        customErrors.push("Your password should have a digit");
      !/([!@$%#])/.test(this.psw) &&
        customErrors.push("Your password should have a special chars like !@$%#");
      return customErrors;
    },
    checkSimilar() {
      let lookLike = "";
      if (!this.$v.psw.$dirty) {
        return lookLike
      }else{ 
        if(this.$v.psw.$dirty&&this.$v.email.$dirty){
            console.log("starting validation on similarity")
            const head = this.email.split("@", 1)[0].toLowerCase();
            
            console.log(this.psw.toLowerCase().indexOf(head) >= 0)
            console.log("true?",this.psw.toLowerCase().indexOf(head) >= 0)
              if(this.psw.toLowerCase().indexOf(head) >= 0) {
              lookLike = "Email and password are too similar";
              console.log("toooo similar....")
              return lookLike;
          }else{
            console.log("simil OK")
            return lookLike
          }
        }      
      }
    },
    checkSelected() {
      return this.status == "accepted";
    },
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
      },
      toggleShowPws() {
      this.showPassword = !this.showPassword;
    },
    
  }
}
</script>

<style scoped>

.warn {
  background-color: rgb(240, 194, 194);
  border-radius: 3px;
}
.warn ul li{
  list-style-type:none;
}

 .main-signup {
  padding:2rem;
  background-color: blanchedalmond;
  box-shadow: 0 0 10px 10px rgba(0,0,0,.05);
  border-radius: 0.5rem;
} 

.form-group.required .control-lable::after {
  content: " *";
  color: red;
}
.red {
  color: red;
}
.warning {
  background-color: #f1cfcfa1;
}
.mistake {
  color: red;
  text-align: left;
  font-size: 0.8rem;
}



</style>