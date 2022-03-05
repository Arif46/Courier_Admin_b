<template>
  <div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">        
        <li class="nav-item dropdown">
          <select v-model="locale" @change="handleChange($event)" class="custom-select">
            <option value="en">En</option>
            <option value="bn">Bn</option>
          </select>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <p class="title-summary" title="Merchant Request">
              <i class="fa fa-male text-dark"></i>
              <span class="quantity" v-if="merchantList.length > 0">{{ merchantList.length }}</span>
            </p>
          </a>
          <div class="nav-dropdown dropdown-menu dropdown-menu-md dropdown-menu-right mt-3">
            <div v-for="(merchant, mrchant) in merchantList" :key="mrchant">
              <div class="dropdown-divider"></div>
              <router-link :to="'/merchant?id='+ merchant.id" class="dropdown-item">
               {{ merchant.business }} - {{ merchant.mobile }}
              </router-link>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <p class="title-summary" title="Pickup Request">
              <i class="fa fa-truck text-dark"></i>
              <span class="quantity" v-if="pickupRequestList.length > 0">{{ pickupRequestList.length }}</span>
            </p>
          </a>
          <div class="nav-dropdown dropdown-menu dropdown-menu-md dropdown-menu-right mt-3" v-if="pickupRequestList.length > 0">
            <div v-for="(pickup, pick) in pickupRequestList" :key="pick">
              <div class="dropdown-divider"></div>
              <router-link :to="'/pickup?id='+ pickup.id" class="dropdown-item">
                <i class="fas fa-user-edit mr-2"></i> {{ pickup.merchant.business }}
              </router-link>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown issue-dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <p class="title-summary" title="Issue Request">
              <i class="fa fa-question text-dark"></i>
              <span class="quantity" v-if="issues.length > 0">{{ issues.length }}</span>
            </p>
          </a>
          <div class="nav-dropdown dropdown-menu dropdown-menu-md dropdown-menu-right mt-3" v-if="issues.length > 0">
            <div v-for="(issue, index) in issues" :key="index">
              <div class="dropdown-divider"></div>
              <router-link :to="'/order?sku='+ issue.order_id" class="dropdown-item">
                {{ issue.business }} - {{ issue.sku }}
              </router-link>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <slot v-if="authUser.image">
              <img :src="$image_path + authUser.image" class="img-circle" style="height: 30px;" alt="User Image"> {{ authUser.name }}
            </slot>
            <slot v-else>
              <img :src="'./images/avatar.png'" class="img-circle" style="height: 30px;" alt="User Image"> {{ authUser.name }}
            </slot>              
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right mt-3">
            <div class="dropdown-divider"></div>
            <router-link to="/edit-user" class="dropdown-item">
              <i class="fas fa-user-edit mr-2"></i> Edit Profile
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" @click.prevent="logout">
              <i class="fas fa-sign-out-alt mr-2"></i> Sign Out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import config from '@/config'
export default {
  name:'Navbar',   
  data () {
    return {
      locale: 'en'
    }
  },
  created () {
    this.locale = this.currentLang
    this.getNavbarData()
  },
  computed : {
    currentLang: function () {
      return this.$store.state.language
    },
    merchantList: function () {
      return this.$store.state.pendingMerchantList
    },
    pickupRequestList: function () {
      return this.$store.state.pickupRequestList
    },
    issues: function () {
      return this.$store.state.issueRequestList
    },
    authUser: function () {
      return this.$store.state.authUser
    }
  },
  methods:{
    handleChange (event) {
      const localeVal = event.target.value
      if (this.$i18n.locale !== localeVal) {
        this.$i18n.locale = localeVal
        this.locale = event.target.value
        this.$store.dispatch('setLang', event.target.value)
      }
    },
    async getNavbarData () {
      const params = { hub_id: 1 }
      const response = await config.getData('/order/navbar', params)
      if (response.status === 200) {
        this.$store.dispatch('setNavbarMerchant', response.data.merchants)
        this.$store.dispatch('setNavbarPickup', response.data.pickups)
        this.$store.dispatch('setNavbarIssue', response.data.issues)
      } else {
        this.$store.dispatch('setNavbarMerchant', [])
        this.$store.dispatch('setNavbarPickup', [])
        this.$store.dispatch('setNavbarIssue', [])
      }  
    },
    logout(){
      config.postData('/admin/logout')
      .then(() => {
        this.$store.dispatch('setAuthUser', '')
        localStorage.removeItem('accessToken')   
        this.$router.push('/auth/login');
      })      
    }
  }
}
</script>