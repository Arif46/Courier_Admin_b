<template>
  <div>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <router-link to="/" class="brand-link">
        <div class="login-logo"><img :src="'./images/logo.png'"/></div>
      </router-link>
      <!-- Sidebar -->
      <div class="sidebar">
        <nav>
          <ul class="nav nav-pills nav-sidebar flex-column nav-flat" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>{{ $t('globalTrans.dashboard') }}</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/user" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>System User</p>
              </router-link>
            </li> 
            <li class="nav-item">
              <router-link to="/partner" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Logistic Partner</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rider" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Riders</p>
              </router-link>
            </li>
            <li class="nav-item order-group">
              <router-link to="/merchant" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Merchants</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pickup" class="nav-link">
                <i class="nav-icon fas fa-list"></i>
                <p>Pickups</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/order" class="nav-link">
                <i class="nav-icon fas fa-user-circle"></i>
                <p>Orders</p>
              </router-link>
            </li>
            <li class="nav-item has-treeview" :class="{ 'menu-open': accountsGroupMenu }"
              @click="accountsGroupMenu = !accountsGroupMenu">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-calculator"></i>
                <p>
                  Accounts
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/collection" class="nav-link nav-withdraw">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Collection</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/adjustment" class="nav-link nav-expense">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Adjustment</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/due" class="nav-link">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Due</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/paid" class="nav-link">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Paid</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview role_id-permission-group" :class="{ 'menu-open': rolePermissionGroupMenu }"
              @click="rolePermissionGroupMenu = !rolePermissionGroupMenu">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-address-book"></i>
                <p>
                  Role Permission
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/role" class="nav-link nav-role_id">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Role</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/permission" class="nav-link nav-permission">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Permission</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview settings" :class="{ 'menu-open': settingGroupMenu }"
              @click="settingGroupMenu = !settingGroupMenu">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-cog"></i>
                <p>
                  Settings
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/hub" class="nav-link nav-hub">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Hub</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/profile" class="nav-link nav-profile">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Profile</p>
                  </router-link>
                </li>
                <li class="nav-item">
                   <router-link to="/bank" class="nav-link nav-bank">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Bank</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/banner" class="nav-link nav-banner">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Banner</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/area" class="nav-link nav-area">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Area</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/thana" class="nav-link nav-thana">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Thana</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/zone" class="nav-link nav-zone">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Zone</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/weight-charge" class="nav-link nav-weight-charge">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Weight Charges</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/store" class="nav-link nav-store">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Stores</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/reason" class="nav-link nav-store">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Reasons</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/issue" class="nav-link nav-store">
                    <i class="far fa-circle text-yellow nav-icon"></i>
                    <p>Issue</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/fraud" class="nav-link">
                <i class="nav-icon fas fa-bell"></i>
                <p>Fraud</p>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout">
                <i class="nav-icon fas fa-sign-out-alt"></i>
                <p>Sign Out</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
<script>
import config from '../../config'
export default {
  name:'Sidebar',
  data(){
    return {
      accountsGroupMenu: false,
      accountsPaymentMenu: false,
      settingGroupMenu: false,
      rolePermissionGroupMenu: false
    }
  },
  computed : {
    loading: function () {
      return this.$store.state.loading
    }
  },
  created () {  
    // this.getPermission()
  },
  methods: {
    getPermission() {
      this.$store.dispatch('loadingState',  true)
      config.getData("/user/permissions")
      .then((response) => {
        if (response.status == 200) {
          this.$store.dispatch('loadingState',  false)
          window.Permissions = response.data;
        }
      })
      .catch( error => {
        console.log('errorr', error)
      })  
    },
    logout(){
      config.postData('/admin/logout')
      .then(() => {
        this.$store.dispatch('setAuthUser', '')
        localStorage.removeItem('accessToken');     
        this.$router.push('/auth/login');
      })      
    }
  }
}
</script>