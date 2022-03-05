<template>
    <div class="login-box" style="margin:0 auto;">
      <div class="card">
        <div class="card-body login-card-body">
          <div class="login-logo"><img style="width: 120px;margin: 10px 82px;" :src="'../images/logo.png'"/></div>
          <b-overlay :show="loader">
            <p class="login-box-msg">REGISTER PANEL</p>             
            <div class="input-group mb-3">
              <input type="name" class="form-control" name="name" v-model="form.name" placeholder="Enter Name" required>
              <div class="input-group-append">
                <div class="input-group-text"><span class="fas fa-edit"></span></div>
              </div>   
              <span class="text-danger show-error" v-if="errors.name">{{ errors.name[0] }}</span>           
            </div>
            <div class="input-group mb-3">
              <input type="name" class="form-control" name="mobile" v-model="form.mobile" placeholder="Enter Mobile No" onkeyup="this.value=this.value.replace(/[^\d]/,'')" required>
              <div class="input-group-append">
                <div class="input-group-text"><span class="fas fa-edit"></span></div>
              </div>   
              <span class="text-danger show-error" v-if="errors.mobile">{{ errors.mobile[0] }}</span>           
            </div>
            <div class="input-group mb-3">
              <input type="email" class="form-control" name="email" v-model="form.email" placeholder="Email Address" required>
              <div class="input-group-append">
                <div class="input-group-text"><span class="fas fa-envelope"></span></div>
              </div>
              <span class="text-danger show-error" v-if="errors.email">{{ errors.email[0] }}</span>  
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" name="password" v-model="form.password" placeholder="Password" required>
              <div class="input-group-append">
                <div class="input-group-text"><span class="fas fa-lock"></span></div>
              </div>
              <span class="text-danger show-error" v-if="errors.password">{{ errors.password[0] }}</span>  
            </div>
            <div class="row pb-3">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" name="remember" value="1" >
                  <label for="remember">Remember Me</label>
                </div>
              </div>
              <div class="col-4">
                <button type="submit" @click.prevent="register" class="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>      
            <p class="mb-1">
                <router-link to="/auth/login">Login Now</router-link>
            </p>  
          </b-overlay>       
        </div>
      </div>
    </div>
</template>
<script>
import config from '@/config'
export default {
  name:'Login',
  data(){
    return{
      loader: false,
      form:{
        name:'',
        email:'',
        mobile:'',
        password:''
      },
      errors:[],
    }
  },
  methods:{
    register(){ 
      this.loader = true     
      config.postData("/admin/register",this.form)
      .then((response) => {
        this.loader = false
        if(response.status_code == 200){     
          this.$toast.success('Your registration successfull, now your can login.') 
          this.$router.push('/login');
        }
      })
      .catch( error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      })  
    }
  }
}
</script>