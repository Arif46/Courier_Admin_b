<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Due List</h1>
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
                                            <label for="merchant_id">Merchant</label>
                                            <select2 v-model="search.merchant_id" placeholder="Select" :options="merchantList"></select2>
                                        </div>
                                    </div>
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
                                </div>
                            </div>
                            <div class="card-body">
                                <b-overlay :show="loader">
                                    <div class="table-responsive">
                                        <table id="collectionTable" class="table table-bordered table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Merchant</th>
                                                    <th>Total Order</th>
                                                    <th>Amount</th>
                                                    <th style="text-align:center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(order,key) in listData" :key="key">
                                                    <td>{{ order.merchant_business }}</td>
                                                    <td>{{ order.total_order }}</td>
                                                    <td>{{ order.amount }}</td>
                                                    <td style="text-align:center">
                                                        <button class="btn btn-success btn-sm" @click="makePayment(order.merchant_id, search.start_date, search.end_date)" title="Make Payment"> Make Payment</button>    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mt-3">
                                        <b-pagination
                                            v-model="pagination.currentPage"
                                            :per-page="pagination.perPage"
                                            :total-rows="pagination.totalRows"
                                            @input="searchData"
                                        />
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
    import Select2 from 'v-select2-component' 
    import moment from 'moment'
    export default {
        name:'Due',
        components:{
            'select2': Select2
        },
        data(){
            return {   
                loader: false,             
                orders:[],
                summary: '',
                search: {
                    merchant_id: '',
                    amount: '',
                    start_date: moment().startOf('year').format('MM/DD/YYYY'),
                    end_date: ''
                },
                form:{
                    merchant_id : '',
                    orderIds: [],
                    account_type: 5,
                    payable: 0
                },
                form_edit:'',
                errors:[],
                deleteModal:false,
                order_id:'',
                key:'',
                allSelected: false,
                date: '',
                pagination: {
                    currentPage: 1,
                    totalRows: 0,
                    perPage: this.$store.state.commonObj.perPage,
                    slOffset: 1
                }
            }
        },
        created(){
            this.loadData();
        },
        watch: {
            stateReload : function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.loadData()
                }
            }
        },
        computed : {
            stateReload () {
                return this.$store.state.stateReload
            },
            listData () {
                return this.$store.state.list
            },
            merchantList: function () {
                return this.$store.state.commonObj.merchantList
            }
        },
        methods:{
            selectAll () {
                this.form.orderIds = [];
                if (!this.allSelected) {
                    const orders = this.orders
                    for (var order in orders) {
                        this.form.orderIds.push(orders[order].id);
                    }
                } 
            },
            select(orderId) {
                this.form.orderIds.push(orderId)
                this.allSelected = false;
            },
            makePayment (merchant_id, start_date, end_date) {
                this.$router.push('make-payment?merchant_id='+ merchant_id + '&start_date='+ start_date + '&end_date='+ end_date)
            },         
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
                const response = await config.getData('/accounts/payment/due', params)
                this.loader = false
                if (response.status == 200){
                    this.$store.dispatch('setList', this.getRelationalData(response.data.data))
                    this.paginationData(response.data)
                } else {
                    this.$store.dispatch('setList', [])
                } 
            },
            paginationData (data) {
                this.pagination.currentPage = data.current_page
                this.pagination.totalRows = data.total
                this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
            },
            getRelationalData(data) {
                const merchantList = this.$store.state.commonObj.merchantList
                const listData = data.map(item => {
                    const tmpData = merchantList.find(merchant => merchant.id === item.merchant_id)
                    const merchantData = { merchant_business: tmpData !== undefined ? tmpData.text : '' }
                    return Object.assign({}, item, merchantData)
                })
                return listData
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>