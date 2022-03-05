<template>
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-info text-white">
                <h5 class="modal-title text-center w-100">Create New Order</h5>
                <button type="button" class="close" aria-label="Close" @click="createModal.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <h6 class="mb-2 ml-1 text-dark text-bold">Order Information</h6>
                </div>
                <form v-on:keyup.enter="store" ref="form" :class=" isFraud ? 'text-red' : 'text-black' ">
                    <div class="row">
                        <div class="col-3">
                            <div class="form-group">
                                <label for="delivery_type">Delivery Type <span class="text-danger" title="Required">*</span></label>
                                <select id="delivery_type" v-model="form.delivery_type" class="form-control select2" required>
                                    <option :value="1">Express Delivery(24hr)</option>
                                    <option :value="2">Bullet Delivery(6hr)</option>
                                    <option :value="3">Special Offer</option>
                                </select>
                                <span class="text-danger" v-if="errors.delivery_type">{{ errors.delivery_type[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="service_charge">Service Charge <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="service_charge" v-model.number="form.service_charge" class="form-control" placeholder="Service Charge" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" readonly required>
                                <span class="text-danger" v-if="errors.service_charge">{{ errors.service_charge[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="weight_charge">Weight Charge <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="weight_charge" v-model.number="form.weight_charge" class="form-control" value="1" required readonly>
                                <span class="text-danger" v-if="errors.cod">{{ errors.cod[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="area_charge">Area Charge <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="area_charge" v-model="form.area_charge" class="form-control" readonly required>
                                <span class="text-danger" v-if="errors.area_charge">{{ errors.area_charge[0] }}</span>
                            </div>
                        </div>  
                        <div class="col-3">
                            <div class="form-group">
                                <label for="name">Merchant</label>
                                <select2 v-model="form.merchant_id" :options="commonObj.merchantList"></select2>
                                <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="area_id">Area <span class="text-danger" title="Required">*</span></label>
                                <select id="area_id" class="form-control select2" required>                                        
                                    <option v-for="area in commonObj.areaList" :key="area.id" :value="area.id">{{ area.text }}</option>
                                </select>
                                <span class="text-danger" v-if="errors.zone_id">{{ errors.zone_id[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="zone_id">Zone <span class="text-danger" title="Required">*</span></label>
                                <select2 ref="zone_id" v-model="form.zone_id" :options="commonObj.zoneAreaList"></select2>
                                <span class="text-danger" v-if="errors.zone_id">{{ errors.zone_id[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="weight">Weight(kg) </label>
                                <select2 v-model="form.weight" :options="commonObj.weightChargeList"></select2>
                                <span class="text-danger" v-if="errors.weight">{{ errors.weight[0] }}</span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="contact_name">Contact Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="contact_name" v-model="form.contact_name" class="form-control" placeholder="Contact Name" required>
                                <span class="text-danger" v-if="errors.contact_name">{{ errors.contact_name[0] }}</span>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group">
                                <label for="contact_mobile">Contact Mobile <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="contact_mobile" v-model="form.contact_mobile" class="form-control" placeholder="Contact Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                                <span class="text-danger" v-if="errors.contact_mobile">{{ errors.contact_mobile[0] }}</span>
                            </div>
                        </div>                 
                        <div class="col-6">
                            <div class="form-group">
                                <label for="delivery_address">Delivery Address <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="delivery_address" v-model="form.delivery_address" class="form-control" placeholder="Delivery Address" required>
                                <span class="text-danger" v-if="errors.delivery_address">{{ errors.delivery_address[0] }}</span>
                            </div>
                        </div> 
                    </div>
                    <div class="row mt-1 mb-1" v-if="fraudResponse">
                        <div class="col text-center">
                            <h3 class="text-success">Success Rate: {{ successRate }}%</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="form-group">
                                <label for="price">Price <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="price  " v-model.number="form.price" class="form-control" placeholder="Price" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>                                
                            </div>
                        </div>  
                        <div class="col-3">
                            <div class="form-group">
                                <label for="delivery_instruction">Delivery Instruction </label>
                                <input type="text" id="delivery_instruction" v-model="form.delivery_instruction" class="form-control" placeholder="Delivery Instruction">
                                <span class="text-danger" v-if="errors.delivery_instruction">{{ errors.delivery_instruction[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="reference_id">Reference ID </label>
                                <input type="text" id="reference_id" v-model="form.reference_id" class="form-control" placeholder="Ex: XYZ1000">
                                <span class="text-danger" v-if="errors.reference_id">{{ errors.reference_id[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                <input type="date" id="date" v-model="form.date" class="form-control" required>
                                <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                            </div>
                        </div>              
                        <div class="col-9">
                            <div class="form-group">
                                <label for="description">Product Description </label>
                                <textarea type="text" id="description" v-model="form.description" class="form-control" placeholder="Description Maximum 200 Character"></textarea>
                                <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label for="category_id">Category <span class="text-danger" title="Required">*</span></label>
                                <select2 v-model="form.category_id" :options="customState.categoryList"></select2>
                                <span class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" @click.prevent="store">Save</button>
                <button type="button" class="btn btn-danger" @click="createModal.hide()">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '../../config'
    import Select2 from 'v-select2-component'
    export default {
        name: 'Create',
        props: ['createModal'],
        components: {
            'select2': Select2
        },
        data() {
            return {
                form:{
                    merchant_id : 0,
                    logistic_partner_id : '',
                    delivery_type : 1,
                    service_charge : '',
                    zone_id : 0,
                    weight : 1,
                    weight_charge : 0,
                    area_charge : 0,
                    price : '',
                    contact_name : '',
                    contact_mobile : '',
                    delivery_address : '',
                    delivery_instruction : '',
                    date : '',
                    reference_id : '',
                    description: '',
                    category_id: 1
                },
                zones: [],
                errors: [],
                isFraud: false,
                fraudResponse: false,
                successRate: 0
            }
        },
        watch: {
            'form.weight': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getWeightCharge()
                }
            },
            'form.zone_id': function (newVal, oldVal) {
                if (newVal != 0 && newVal != oldVal) {
                    this.getServiceCharge()
                }
            },
            'form.area_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getZones()
                }
            },
            'form.contact_mobile': function (newVal, oldVal) {
                if (newVal != oldVal && newVal.length >= 11) {
                    this.fraudCheck(newVal)
                }
            }
        },
        computed: {
            customState () {
                return this.$store.state
            },
            commonObj () {
                return this.$store.state.commonObj
            }
        },
        methods: {
            store() {
                config.postData('/order/store', this.form)
                .then((response) => {
                    if(response.status == 201){                 
                        this.form.contact_name = this.form.contact_mobile = this.form.reference_id = this.form.price = this.form.service_charge = this.form.delivery_address = '';
                        this.form.weight_charge = this.form.area_charge = this.form.zone_id = 0
                        this.isFraud = this.fraudResponse = false
                        this.$toast.success('Order created') 
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getServiceCharge () {
                const merchantId = this.form.merchant_id
                const zoneId = this.form.zone_id
                const charge = this.commonObj.serviceChargeList.find(charge => ((charge.merchant_id == merchantId) && (charge.zone_id == zoneId)))
                this.form.service_charge = charge.base_charge
                this.form.area_charge = charge.area_charge
            },
            getZones () {
                const areaId = this.form.area_id
                const tmpZones = this.commonObj.zoneList.find(tmp => tmp.area_id == areaId)
                this.zones = tmpZones
            },
            getWeightCharge () {
                const tmpCharge = this.commonObj.weightChargeList.find(charge => charge.id == this.form.weight)
                this.form.weight_charge = tmpCharge.charge
            },
            fraudCheck (mobileNo) {
                const params = { mobile: mobileNo }
                config.getData(`/order/fraud-check`, params)
                .then((response) => {
                    if (response.status == 200) {
                        this.isFraud = true
                    } else {
                        this.isFraud = false 
                    }
                    this.fraudResponse = true
                    this.successRate = response.success_rate
                });
            }
        }
    }
</script>