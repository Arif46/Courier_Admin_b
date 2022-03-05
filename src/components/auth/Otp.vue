<template>
    <div class="login-box" style="margin:30px auto;">
      <div class="card">
        <div class="card-body login-card-body">
          <div class="login-logo"><img style="width: 120px;" :src="'../images/logo.png'"/></div>
          <b-overlay :show="loader">
            <p class="login-box-msg">OTP Confirmation</p>    
            <form v-on:keyup.enter="login">         
              <div class="input-group mb-3">
                <input type="text" class="form-control input-mobile" name="mobile" v-model="form.mobile" placeholder="Email Mobile no" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required>
                <div class="input-group-append">
                  <div class="input-group-text"></div>
                </div>
                <span class="text-danger show-error" v-if="errors.mobile">{{ errors.mobile[0] }}</span>  
              </div>
              <div class="input-group mb-3" v-if="isOtp">
                <input type="text" class="form-control input-mobile" name="otp" v-model="form.otp" placeholder="Email OTP" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required>
                <div class="input-group-append">
                  <div class="input-group-text"></div>
                </div>
                <span class="text-danger show-error" v-if="errors.email">{{ errors.email[0] }}</span>  
              </div>
              <div class="row pb-3">
                <div class="col-8">
                  <router-link to="/auth/login" class="text-left">Login</router-link>
                </div>
                <div class="col-4">
                  <button type="submit" @click.prevent="otpSubmit" class="btn btn-primary btn-block">Submit</button>
                </div>
              </div>  
            </form> 
          </b-overlay>       
        </div>
      </div>
    </div>
</template>
<script>
import config from '@/config'
export default {
  name:'Otp',
  data(){
    return{
      loader: false,   
      isOtp: false,   
      form:{
        mobile:'',
        otp:'',
      },
      errors:[],
    }
  },
  methods:{
    otpSubmit () {
        if (!this.isOtp) {
            this.mobileCheck()
        } else {
            this.otpCheck()
        }
    },
    async mobileCheck(){
        this.loader = true
        console.log('form = ', this.form)
        const response = await config.getData("/admin/check-mobile", this.form)         
        this.loader = false 
        if(response.status == 200){
            this.isOtp = true
            this.$toast.success({
                title: 'Success',
                message: 'Mobile no matched. Enter otp from your sms',
                color: '#D6E09B'
            })
        } else {
            this.isOtp = false
            this.$toast.error({
                title: 'Error',
                message: response.message
            })
        } 
    },
    async otpCheck(){
        this.loader = true
        const response = await config.postData("/admin/otp-verify", this.form)         
        this.loader = false    
        if(response.status == 200){
            this.$toast.success({
                title: 'Success',
                message: 'Please check your mobile sms for new credential',
                color: '#D6E09B'
            })
            this.$router.push('/auth/login')
        } else {
            this.$toast.error({
                title: 'Error',
                message: response.message
            })
        } 
    }
  }
}
</script>
<style scoped>
  .input-mobile, .input-password {
    height: 38px !important;
  }
</style>