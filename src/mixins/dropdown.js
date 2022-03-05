import config from '../config'
export default {
  computed: {
    hasDropdownLoaded () {
      return this.$store.state.commonObj.hasDropdownLoaded
    }
  },
  watch: {
    hasDropdownLoaded: function () {
      this.loadDropdownCommonConfig()
    }
  },
  created () {
    this.loadDropdownCommonConfig()
  },
  methods: {
    loadDropdownCommonConfig () {
      config.getData('/common')
      .then(response => {
          if (response.status_code === 200) {
            this.$store.commit('mutateCommonProperties', {
              divisionList: response.divisionList,
              districtList: response.districtList,
              thanaList: response.thanaList,
              merchantList: response.merchantList,
              areaList: response.areaList,
              zoneList: response.zoneList,
              zoneAreaList: response.zoneAreaList,
              bankList: response.bankList,
              hubList: response.hubList,
              logisticPartnerList: response.logisticPartnerList,
              riderList: response.riderList,
              reasonList: response.reasonList,
              weightChargeList: response.weightChargeList,
              userList: response.userList,
              serviceChargeList: response.serviceChargeList,
              issueList: response.issueList
            })
          }
          this.$store.dispatch('commonObjLoad', false)
      })
    }
  }
}