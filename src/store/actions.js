export default {
    mutateCommonProperties ({commit}, payload) {
        commit('mutateCommonProperties', payload)
    },
    loadingState ({commit}, payload) {
        commit('loadingState', payload)
    },
    stateReload ({commit}, payload) {
        commit('stateReload', payload)
    },
    commonObjLoad ({commit}, payload) {
        commit('commonObjLoad', payload)
    },
    setList ({commit}, payload) {
        commit('setList', payload)
    },
    setLang ({commit}, payload) {
        commit('setLang', payload)
    },
    setNavbarMerchant ({commit}, payload) {
        commit('setNavbarMerchant', payload)
    },
    setNavbarIssue ({commit}, payload) {
        commit('setNavbarIssue', payload)
    },
    setNavbarPickup ({commit}, payload) {
        commit('setNavbarPickup', payload)
    },
    removeFromNavbarMerchantList ({commit}, payload) {
        commit('removeFromNavbarMerchantList', payload)
    },
    removeFromNavbarPickup ({commit}, payload) {
        commit('removeFromNavbarPickup', payload)
    },
    removeIssueFromIssueList ({commit}, payload) {
        commit('removeIssueFromIssueList', payload)
    },
    setAuthUser ({commit}, payload) {
        commit('setAuthUser', payload)
    },
    addBankList ({commit}, payload) {
        commit('addBankList', payload)
    },
    addBank ({commit}, payload) {
        commit('addBank', payload)
    },
    editBank ({commit}, payload) {
        commit('updateBank', payload)
    },
    deleteBank ({commit}, payload) {
        commit('deleteBank', payload)
    },
    // Hub list
    addHubList ({commit}, payload) {
        commit('addHubList', payload)
    },
    addHub ({commit}, payload) {
        commit('addHub', payload)
    },
    editHub ({commit}, payload) {
        commit('updateHub', payload)
    },
    addZoneList ({commit}, payload) {
        commit('addZoneList', payload)
    },
    addZone ({commit}, payload) {
        commit('addZone', payload)
    },
    editZone ({commit}, payload) {
        commit('updateZone', payload)
    },
    deleteZone ({commit}, payload) {
        commit('deleteZone', payload)
    },
    // weight charge
    addWeightChargeList ({commit}, payload) {
        commit('addWeightChargeList', payload)
    },
    addWeightCharge ({commit}, payload) {
        commit('addWeightCharge', payload)
    },
    editWeightCharge ({commit}, payload) {
        commit('updateWeightCharge', payload)
    },
    deleteWeightCharge ({commit}, payload) {
        commit('deleteWeightCharge', payload)
    },
    // store
    addStoreList ({commit}, payload) {
        commit('addStoreList', payload)
    },
    addStore ({commit}, payload) {
        commit('addStore', payload)
    },
    editStore ({commit}, payload) {
        commit('updateStore', payload)
    },
    deleteStore ({commit}, payload) {
        commit('deleteStore', payload)
    },
    // reason
    addReasonList ({commit}, payload) {
        commit('addReasonList', payload)
    },
    addReason ({commit}, payload) {
        commit('addReason', payload)
    },
    editReason ({commit}, payload) {
        commit('updateReason', payload)
    },
    deleteReason ({commit}, payload) {
        commit('deleteReason', payload)
    },
    // rider
    addRiderList ({commit}, payload) {
        commit('addRiderList', payload)
    },
    addRider ({commit}, payload) {
        commit('addRider', payload)
    },
    editRider ({commit}, payload) {
        commit('updateRider', payload)
    },
    deleteRider ({commit}, payload) {
        commit('deleteRider', payload)
    },
    statusUpdateRider ({commit}, payload) {
        commit('statusUpdateRider', payload)
    },
    //merchant
    addMerchantList ({commit}, payload) {
        commit('addMerchantList', payload)
    },
    addMerchant ({commit}, payload) {
        commit('addMerchant', payload)
    },
    editMerchant ({commit}, payload) {
        commit('updateMerchant', payload)
    },
    statusUpdateMerchant ({commit}, payload) {
        commit('statusUpdateMerchant', payload)
    },
    //merchant
    addLogisticPartnerList ({commit}, payload) {
        commit('addLogisticPartnerList', payload)
    },
    addLogisticPartner ({commit}, payload) {
        commit('addLogisticPartner', payload)
    },
    editLogisticPartner ({commit}, payload) {
        commit('updateLogisticPartner', payload)
    },
    deleteLogisticPartner ({commit}, payload) {
        commit('deleteLogisticPartner', payload)
    }
}