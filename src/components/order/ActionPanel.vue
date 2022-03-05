<template>
    <div class="modal-dialog modal-default" role="document">
        <div class="modal-content">
            <div class="modal-header bg-info text-white">
                <h5 class="modal-title text-center w-100">Rapid Action on Order</h5>
                <button type="button" class="close" aria-label="Close" @click="actionPanel.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">                        
                    <input type="text" class="form-control" v-model="barcode.sku" @keyup.enter="keepOrder" placeholder="Scan barcode or type order id and press enter"/>
                </div>
                <div class="form-group">   
                    <span v-for="(order, index) in orderList" :key="index" class="btn btn-sm btn-warning mb-1 mr-1">
                        {{ order }}<i class="ml-1 fas fa-times" @click="removeRow(index)"></i> 
                    </span>
                </div>
                <div class="form-group">   
                    <h6> 
                        Total Order: <b>{{ orderList.length != 0 ? orderList.length : totalSelected }}</b>                            
                        <button class="ml-1 btn btn-default btn-sm" @click="scanDone" v-if="isScan">Scan/Select Done <i class="fa fa-check"></i></button>
                        <button class="ml-1 btn btn-warning btn-sm" @click="printPos">POS <i class="fa fa-print"></i></button>
                        <button class="ml-1 btn btn-success btn-sm" @click="actionPanelOrderToPdf">PDF <i class="fa fa-download"></i></button>
                        <button class="ml-1 btn btn-info btn-sm" @click="bulkAction">Submit</button>
                        <button class="ml-1 btn btn-danger btn-sm" @click="actionPanel.hide()">Cancel</button>
                    </h6>                        
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="name">Rider Assign</label>
                            <select2 v-model="bulk.rider_id" placeholder="Select" :options="riderList"></select2>
                        </div>   
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="status">Status </label>                        
                            <select class="form-control" v-model="bulk.status">
                                <option :value="0">Select</option>
                                <option :value="1">Requesting</option>
                                <option :value="2">Picked Up</option>
                                <option :value="3">Accepted </option>
                                <option :value="4">On Way </option>
                                <option :value="5">Done</option>
                                <option :value="6">Reschedule</option>
                                <option :value="8">Cancel</option>
                                <option :value="7">Return</option>
                                <option :value="11">Hold</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="status">Merchant</label>   
                            <select2 v-model="bulk.merchant_id" :options="merchantList"></select2> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '../../config'
    import Select2 from 'v-select2-component'
    export default {
        name: 'ActionPanel',
        props: ['actionPanel', 'orderList', 'totalSelected'],
        components: {
            'select2': Select2
        },
        data() {
            return {
                isScan: false,
                barcode:{
                    sku: ''
                },
                bulk:{
                    order_ids: [],
                    status: 0,
                    merchant_id: 0,
                    rider_id: 0,
                },
                errors: []
            }
        },
        computed: {
            merchantList: function () {
                return this.$store.state.commonObj.merchantList
            },
            riderList: function () {
                return this.$store.state.commonObj.riderList
            }
        },
        methods: {
            keepOrder() { 
                this.isScan = true  
                this.orderList.push(this.barcode.sku); 
                this.barcode.sku = ''
            },
            bulkAction(){  
                if (this.orderList.length > 0) {
                    const orderIdList = this.orderList.filter(val => (val !== undefined) && (val !== null));                     
                    this.bulk.order_ids = []         
                    this.bulk.order_ids = orderIdList
                }
                const skuList = this.barcode.sku.split(" ")
                if (!this.isScan && skuList.length > 0) {
                    skuList.forEach((value) => {
                        const orderId = value.split("-")[2]
                        this.bulk.order_ids.push(orderId)
                    })
                }
                this.loader = true
                config.postData('/order/bulk-action', this.bulk)
                .then((response) => { 
                    if(response.status == 201){   
                        this.$toast.success('Success') 
                        this.orders = response.data 
                        this.bulk.status = this.bulk.merchant_id = this.bulk.rider_id = 0,
                        this.pages.push(1);
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                    this.loader = false
                })
                .catch((error) => {
                    this.loader = false
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            scanDone () {
                config.postData('/order/scaned-order', { 'order_ids': this.orderList })
                .then((response) => {               
                    if (response.status === 200) {                                           
                        this.printorders = response.data;
                        this.isScan = false                                          
                    } else {
                        this.$toast.error('Order not found') 
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            printPos() {
                this.$htmlToPaper("printSection");
            }
        }
    }
</script>