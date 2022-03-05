<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Order</h1>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <b-overlay :show="loader">
                                    <div class="table-responsive">
                                        <table id="collectionTable" class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <td colspan="10">
                                                        <label><p>Merchant : {{ merchant_business }}</p></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Contact Name</th>
                                                    <th>Contact Number</th>
                                                    <th>Price (BDT)</th>
                                                    <th>Collected (BDT)</th>
                                                    <th>Service Charge</th>
                                                    <th>Area Charge</th>
                                                    <th>Weight Charge</th>
                                                    <th>COD</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(order,key) in orders" :key="key">
                                                    <td>{{ order.sku }}</td>
                                                    <td>{{ order.contact_name }}</td>
                                                    <td>{{ order.contact_mobile }}</td>
                                                    <td>{{ order.price }}</td>
                                                    <td>{{ order.collected_amount }}</td>
                                                    <td>{{ order.service_charge }}</td>
                                                    <td>{{ order.area_charge }}</td>
                                                    <td>{{ order.weight_charge }}</td>
                                                    <td>{{ order.cod }}</td>
                                                    <td>{{ order.amount }}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Order</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_order }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Price</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_price }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Collected</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_collected }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Service Charge</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_service_charge }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Weight Charge</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_weight_charge }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total Area Charge</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_area_charge }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right"><b>Total COD</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_cod }}</b></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right">
                                                        <label><p>Adjustable Amount : </p></label>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <label><p> {{ adjustment }}</p></label>
                                                    </td>
                                                </tr>
                                                <tr v-if="adjustment > 0">
                                                    <td colspan="8" class="text-right">
                                                        <label><p>Adjust Amount : </p></label>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <label>
                                                            <p> 
                                                                <input type="number" step="any" v-model="form.adjust_amount" @input="calculateAmount"/>
                                                            </p>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="8" class="text-right">
                                                        <label><p>Payable Amount : </p></label>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <label><p> {{ adjustment == 0 ? form.total_amount : form.final_amount }}</p></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="10" class="text-right">
                                                        <button class="btn btn-success float-right btn-sm mr-2" @click="makePayment"> Make Payment</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </b-overlay>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
</template>
<script>
    import config from '@/config'
    export default {
        name:'MakePaymentOrder',
        data(){
            return {   
                loader: true,             
                orders:[],
                key:'',
                merchant_business: '',
                adjustment: 0,
                form : {
                    merchant_id: '',
                    order_ids: '',
                    total_amount: 0,
                    adjust_amount: 0,
                    final_amount: 0,
                },
                params: {
                    merchant_id : this.$route.query.merchant_id,
                    payment_status : 1,
                    start_date : this.$route.query.start_date,
                    end_date : this.$route.query.end_date
                },
                total_order: 0,
                total_price: 0,
                total_collected: 0,
                total_service_charge: 0,
                total_weight_charge: 0,
                total_area_charge: 0,
                total_cod: 0,
            }
        },
        created(){
            this.getOrders();
        },
        methods:{
            searchData () {
                this.getOrders()
            },
            async getOrders(){     
                this.loader = true     
                const response = await config.getData('/accounts/payment/make-payment-orders', this.params)
                this.loader = false
                if (response.status == 200){
                    this.orders = response.data
                    this.adjustment          = response.adjustment
                    this.merchant_business   = response.merchant_business
                    this.form.order_ids      = response.order_ids
                    this.form.total_amount   = response.total_amount
                    this.form.merchant_id    = response.merchant_id
                    this.total_order         = response.total_order,
                    this.total_price         = response.total_price,
                    this.total_collected     = response.total_collected,
                    this.total_service_charge= response.total_service_charge,
                    this.total_weight_charge = response.total_weight_charge,
                    this.total_area_charge   = response.total_area_charge,
                    this.total_cod           = response.total_cod
                } else {
                    this.orders = []
                    this.adjustment = 0
                } 
            },
            calculateAmount (event) {
                this.form.adjust_amount = event.target.value
                this.form.final_amount = parseFloat(this.form.total_amount - this.form.adjust_amount).toFixed(2)
            },
            async makePayment () {
                this.loader = true
                const response = await config.postData('/accounts/payment/make-payment', this.form)
                this.loader = false
                if (response.status == 201) {
                    this.$toast.success({
                        title: 'Success',
                        message: 'Maked Payment successfully',
                        color: '#D6E09B'
                    }) 
                    this.$router.push('/paid')
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    }) 
                }
            },    
            getStatus (status) {
                if (status == 1) {
                    return 'Requesting'
                } else if (status == 2) {
                    return 'Picked Up'
                } else if (status == 3) {
                    return 'Accepted'
                } else if (status == 4) {
                    return 'On Way'
                } else if (status == 5) {
                    return 'Successfull'
                } else if (status == 6) {
                    return 'Reschedule'
                } else if (status == 7) {
                    return 'Return'
                } else if (status == 8) {
                    return 'Cancel'
                } else if (status == 9) {
                    return 'Partial Complete'
                } else {
                    return 'Exchange'
                }
            }
        }
    }
</script>