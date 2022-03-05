<template>
    <div class="login-box" style="margin:30px auto;">
      <div class="card">
        <div class="card-body login-card-body">
          <div class="login-logo"><img style="width: 120px;" :src="'../images/logo.png'"/></div>
          <b-overlay :show="loader">
            <p class="login-box-msg">LOGIN PANEL</p>    
            <form v-on:keyup.enter="login">         
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
                  <button type="submit" @click.prevent="login" class="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>  
            </form>   
            <div class="row">
                <div class="col-6">
                  <router-link to="/auth/register" class="text-left">Register Now</router-link>
                </div>
                <div class="col-6 text-right">
                  <router-link to="/auth/otp">Forgot Password ?</router-link>
                </div>
              </div>
          </b-overlay>        
        </div>
      </div>
    </div>
</template>
<script>
import config from '../../config'
export default {
  name:'Login',
  data(){
    return{
      loader: false,
      form:{
        email:'',
        password:''
      },
      errors:[],
    }
  },
  methods:{
    async login(){
      this.loader = true
      await config.postData("/admin/login", this.form)
      .then((response) => { 
        this.loader = false  
        if(response.status_code == 200){
          localStorage.setItem('accessToken', response.access_token);
          this.$store.dispatch('setAuthUser', response.user)
          // this.getPermission();
          this.$router.push('/');
          this.$toast.success({
            title: 'Success',
            message: 'Loggedin successfully',
            color: '#D6E09B'
          })
        } else if (response.status_code == 403) {
          this.$toast.error(response.message)
        } else {
          this.$toast.error({
            title: 'Error',
            message: 'Email or password not match'
          })
        }    
      })
      .catch( error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      })  
    },
    getPermission() {
      config.getData("/user/permissions")
      .then((response) => {
        if (response.status == 200) {
          //window.location.reload(true)
          this.$store.dispatch('loadingState',  false)
          window.Permissions = response.data;
        }
      })
      .catch( error => {
        console.log('errorr', error)
      })  
    }
  }
}
</script>