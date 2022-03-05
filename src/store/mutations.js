export default {
    mutateCommonProperties (state, payload) {
        state.commonObj = Object.assign({}, state.commonObj, payload)
    },
    commonObjLoad (state, payload) {
        state.commonObj.hasDropdownLoaded = payload
    },
    loadingState (state, payload) {
        state.loading = payload
    },
    stateReload (state, payload) {
        state.stateReload = payload
    },
    setList (state, payload) {
        state.list = payload
    },
    setLang (state, payload) {
        state.language = payload
    },
    setNavbarMerchant (state, payload) {
        state.pendingMerchantList = payload
    },
    setNavbarIssue (state, payload) {
        state.issueRequestList = payload
    },
    setNavbarPickup (state, payload) {
        state.pickupRequestList = payload
    },
    removeFromNavbarMerchantList (state, merchantId) {
        state.pendingMerchantList = state.pendingMerchantList.filter(mer => mer.id !== merchantId)
    },
    removeFromNavbarPickup (state, pickupId) {
        state.pickupRequestList = state.pickupRequestList.filter(pick => pick.id !== pickupId)
    },
    removeIssueFromIssueList (state, issueId) {
        state.issueRequestList = state.issueRequestList.filter(iss => iss.order_issue_id !== issueId)
    },
    setAuthUser (state, user) {
        state.authUser = user
    },
    addBankList (state, banks) {
        state.banks = banks
    },
    addBank (state, banks) {
        state.banks.push(banks)
    },
    updateBank (state, bank) {
        state.banks = state.banks.map(function (item) {
            if (item.id === bank.id) {
                return bank
            }
            return item
        })
    },
    deleteBank (state, bankId) {
        state.banks = state.banks.map(function (item) {
            if (item.id === bankId) {
                state.banks.splice(item.id, 1)
            }
            return item
        })
    },
    addHubList (state, hubs) {
        state.hubs = hubs
    },
    addHub (state, hub) {
        state.hubs.push(hub)
    },
    updateHub (state, hub) {
        state.hubs = state.hubs.map(function (item) {
            if (item.id === hub.id) {
                return hub
            }
            return item
        })
    },
    addZoneList (state, zones) {
        state.zones = zones
    },
    addZone (state, zone) {
        state.zones.push(zone)
    },
    updateZone (state, zone) {
        state.zones = state.zones.map(function (item) {
            if (item.id === zone.id) {
                return zone
            }
            return item
        })
    },
    deleteZone (state, zoneId) {
        state.zones = state.zones.map(function (item) {
            if (item.id === zoneId) {
                state.zones.splice(item.id, 1)
            }
            return item
        })
    },
    // weight charge
    addWeightChargeList (state, weightCharges) {
        state.weightCharges = weightCharges
    },
    addWeightCharge (state, weightCharge) {
        state.weightCharges.push(weightCharge)
    },
    updateWeightCharge (state, weightCharge) {
        state.weightCharges = state.weightCharges.map(function (item) {
            if (item.id === weightCharge.id) {
                return weightCharge
            }
            return item
        })
    },
    deleteWeightCharge (state, weightChargeId) {
        state.weightCharges = state.weightCharges.map(function (item) {
            if (item.id === weightChargeId) {
                state.weightCharges.splice(item.id, 1)
            }
            return item
        })
    },
    // store
    addStoreList (state, stores) {
        state.stores = stores
    },
    addStore (state, store) {
        state.stores.push(store)
    },
    updateStore (state, store) {
        state.stores = state.stores.map(function (item) {
            if (item.id === store.id) {
                return store
            }
            return item
        })
    },
    deleteStore (state, storeId) {
        state.stores = state.stores.map(function (item) {
            if (item.id === storeId) {
                state.stores.splice(item.id, 1)
            }
            return item
        })
    },
    // reason
    addReasonList (state, reasons) {
        state.reasons = reasons
    },
    addReason (state, reason) {
        state.reasons.push(reason)
    },
    updateReason (state, reason) {
        state.reasons = state.reasons.map(function (item) {
            if (item.id === reason.id) {
                return reason
            }
            return item
        })
    },
    deleteReason (state, reasonId) {
        state.reasons = state.reasons.map(function (item) {
            if (item.id === reasonId) {
                state.reasons.splice(item.id, 1)
            }
            return item
        })
    },
    // weight charge
    addRiderList (state, riders) {
        state.riders = riders
    },
    addRider (state, rider) {
        state.riders.push(rider)
    },
    updateRider (state, rider) {
        state.riders = state.riders.map(function (item) {
            if (item.id === rider.id) {
                return rider
            }
            return item
        })
    },
    deleteRider (state, riderId) {
        state.riders = state.riders.map(function (item) {
            if (item.id === riderId) {
                state.riders.splice(item.id, 1)
            }
            return item
        })
    },
    statusUpdateRider (state, rider) {
        state.riders = state.riders.map(function (item) {
            if (item.id === rider.id) {
                return rider
            }
            return item
        })
    },
    // merchant
    addMerchantList (state, merchants) {
        state.merchants = merchants
    },
    addMerchant (state, merchant) {
        state.merchants.push(merchant)
    },
    updateMerchant (state, merchant) {
        state.merchants = state.merchants.map(function (item) {
            if (item.id === merchant.id) {
                return merchant
            }
            return item
        })
    },
    statusUpdateMerchant (state, merchant) {
        state.merchants = state.merchants.map(function (item) {
            if (item.id === merchant.id) {
                return merchant
            }
            return item
        })
    },
    // logistic partner
    addLogisticPartnerList (state, logisticPartners) {
        state.logisticPartners = logisticPartners
    },
    addLogisticPartner (state, ogisticPartner) {
        state.logisticPartners.push(ogisticPartner)
    },
    updateLogisticPartner (state, ogisticPartner) {
        state.logisticPartners = state.logisticPartners.map(function (item) {
            if (item.id === ogisticPartner.id) {
                return ogisticPartner
            }
            return item
        })
    },
    deleteLogisticPartner (state, logisticPartnerId) {
        state.logisticPartners = state.logisticPartners.map(function (item) {
            if (item.id === logisticPartnerId) {
                state.logisticPartners.splice(item.id, 1)
            }
            return item
        })
    }
}