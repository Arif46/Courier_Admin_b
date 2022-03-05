<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Orders detail of <b>{{ merchant }}</b></h1>
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
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="start_date">Start Date</label>
                                            <input type="date" id="start_date" v-model="search.start_date" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="end_date">End Date</label>
                                            <input type="date" id="end_date" v-model="search.end_date" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <button class="btn btn-info btn-sm" type="submit" @click.prevent="searchData" style="margin-top:28px;"><i class="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <button class="btn btn-warning btn-sm" style="margin-top:28px; margin-left:-100px;">                                            
                                                <export-excel
                                                    :data="dataCustomize"
                                                    :fields= "json_fields"
                                                    :title="headerValue"
                                                    >
                                                    Excel <i class="fa fa-download"></i>
                                                </export-excel>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <b-overlay :show="loader">
                                    <div class="table-responsive">
                                        <table id="collectionTable" class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Reference ID</th>
                                                    <th>Customer</th>
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
                                                    <td>{{ order.reference_id }}</td>
                                                    <td>{{ order.contact_name }}<br/>{{ order.contact_mobile }}</td>
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
                                                    <td colspan="8" class="text-right"><b>Total Amount</b></td>
                                                    <td></td>
                                                    <td><b>{{ total_amount }}</b></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </b-overlay>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import config from '../../config'    
    const excelColumn = {
        'Order ID': 'order_id',
        'SKU': 'order_sku',
        'Reference ID': 'order_reference_id',
        'Customer': 'order_customer',
        'Price': 'order_price',
        'Collected': 'order_collected',
        'Service Charge': 'order_service_charge',
        'Area Charge': 'order_area_charge',
        'Weight Charge': 'order_weight_charge',
        'COD': 'order_cod',
        'Amount': 'order_amount'
    }
    export default {
        name:'ShowOrder',
        data(){
            return {   
                loader: false,             
                orders:[],
                search: {
                    merchant_id: '',
                    payment_id: '',
                    start_date: '',
                    end_date: '',
                    payment_status: ''
                },
                merchant: '',
                total_order: 0,
                total_price: 0,
                total_collected: 0,
                total_service_charge: 0,
                total_weight_charge: 0,
                total_area_charge: 0,
                total_cod: 0,
                total_amount: 0,
                payment_date: ''
            }
        },
        created(){
            this.search.payment_id = this.$route.query.paymentId
            this.search.status = this.$route.query.status
            this.getOrders()
        },
        computed: {            
            json_fields: function () {
                return excelColumn
            },
            headerValue: function () {
                const headerVal = []
                headerVal[1] = 'Paid Order Details of ' + this.merchant
                headerVal[2] = 'Payment Date: ' + this.payment_date
                headerVal[3] = 'Total Order: ' + this.total_order
                headerVal[4] = 'Total Price: ' + this.total_price + ' Tk'
                headerVal[5] = 'Total Collected: ' + this.total_collected + ' Tk'
                headerVal[6] = 'Total Charge: ' + parseFloat(this.total_service_charge + this.total_weight_charge + this.total_area_charge) + ' Tk'
                headerVal[7] = 'Total COD: ' + this.total_cod + ' Tk'
                headerVal[8] = 'Total Amount: ' + this.total_amount + ' Tk'
                return headerVal
            },
            dataCustomize () {
                return this.orders.map(item => {
                    item.order_id = item.id,
                    item.order_sku = item.sku,
                    item.order_reference_id= item.reference_id,
                    item.order_customer = item.contact_name +" "+item.contact_mobile,
                    item.order_price= item.price,
                    item.order_collected= item.collected_amount,
                    item.order_service_charge= item.service_charge,
                    item.order_area_charge= item.area_charge,
                    item.order_weight_charge= item.weight_charge,
                    item.order_cod= item.cod,
                    item.order_amount= item.amount

                    return Object.assign({}, item)
                })
            }
        },
        methods:{
            getOrders() {
                this.loader = true
                const params = this.search
                config.getData('/accounts/payment/payment-orders', params)
                .then((response) => {
                    this.loader = false
                    if (response.status == 200){
                        this.orders = response.data
                        this.merchant = response.merchant_business
                        this.total_order         = response.total_order,
                        this.total_price         = response.total_price,
                        this.total_collected     = response.total_collected,
                        this.total_service_charge= response.total_service_charge,
                        this.total_weight_charge = response.total_weight_charge,
                        this.total_area_charge   = response.total_area_charge,
                        this.total_cod           = response.total_cod,
                        this.total_amount        = response.total_amount
                        this.payment_date        = response.payment_date
                    } else {
                        this.orders = []
                    } 
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            searchData () {
                this.getOrders()
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
<style>
    .w-35{
        width:35px;
    }
</style>