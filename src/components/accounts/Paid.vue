<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Paid Amount List</h1>
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
                                            <select2 v-model="search.merchant_id" placeholder="Select" :options="getMerchantList"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">Date</label>
                                            <input type="date" id="date" v-model="search.date" class="form-control" />
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
                                        <table id="paymentTable" class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Merchant</th>
                                                    <th>Make Date</th>
                                                    <th>Payment Date</th>
                                                    <th>TnxID</th>
                                                    <th>Payment By</th>
                                                    <th>Status</th>
                                                    <th>Image</th>
                                                    <th>Total Order</th>
                                                    <th>Amount</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Merchant</th>
                                                    <th>Make Date</th>
                                                    <th>Payment Date</th>
                                                    <th>TnxID</th>
                                                    <th>Payment By</th>
                                                    <th>Status</th>
                                                    <th>Image</th>
                                                    <th>Total Order</th>
                                                    <th>Amount</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(payment,key) in listData" :key="key">
                                                    <td>{{ payment.merchant_business }}</td>
                                                    <td>{{ payment.make_date }}</td>
                                                    <td>{{ payment.payment_date != null ? payment.payment_date : '' }}</td>
                                                    <td>{{ payment.tnxid != null ? payment.tnxid : '' }}</td>
                                                    <td>{{ paymentBy(payment.payment_by) }}</td>
                                                    <td :class="'status'+payment.status">{{ getStatus(payment.status) }}</td>
                                                    <td>
                                                        <a target="_blank" download="custom-filename.jpg" :href="$image_path+payment.image" title="ImageName">
                                                            <img v-if="payment.image != null" :src="$image_path+payment.image" style="width:60px;height:35px;"/>
                                                        </a>
                                                    </td>
                                                    <td>{{ payment.total_order }}</td>
                                                    <td>{{ payment.final_amount }}</td>
                                                    <td style="text-align:center;">  
                                                        <button class="btn btn-primary btn-sm mr-1" @click="showOrder(payment.id, payment.status)" title="Show Order"> <i class="fa fa-eye"></i> </button>       
                                                        <button v-if="payment.status == 1" class="btn btn-success btn-sm" @click="payNow(key, payment)" title="Pay Now"><i class="fas fa-check"></i></button>
                                                        <button v-else class="btn btn-success btn-sm" @click="invoice(payment.id)" title="Invoice">Invoice<i class="fas fa-invoice"></i></button>
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
        <div v-if="payNowModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Pay Now</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">   
                    <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="merchant_id">Merchant <span class="text-danger" title="Required">*</span></label>
                                    <select2 v-model="pay_now.merchant_id" placeholder="Select" :options="getMerchantList"></select2>
                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    <input type="hidden" v-model="pay_now.id" />
                                </div>                     
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="payment_by">Payment By <span class="text-danger" title="Required">*</span></label>
                                    <select id="payment_by" class="form-control" v-model="pay_now.payment_by">
                                        <option :value="1">Bkash</option>
                                        <option :value="2">Rocket</option>
                                        <option :value="3">Nagad</option>
                                        <option :value="4">Bank</option>
                                        <option :value="5">Cash</option>
                                        <option :value="6">Cheque</option>
                                    </select>
                                    <span class="text-danger" v-if="errors.payment_by">{{ errors.payment_by[0] }}</span>
                                </div>                     
                            </div>
                        </div>   
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="amount">Order Amount </label>
                                    <input type="text" id="amount" v-model="pay_now.amount" class="form-control" readonly>
                                    <span class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</span>
                                </div>                      
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="adjustment">Adjustment </label>
                                    <input type="text" id="adjustment" v-model="pay_now.adjustment" class="form-control" readonly>
                                    <span class="text-danger" v-if="errors.adjustment">{{ errors.adjustment[0] }}</span>
                                </div>                      
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="final_amount">Final Amount </label>
                                    <input type="text" id="final_amount" v-model="pay_now.final_amount" class="form-control" readonly>
                                    <span class="text-danger" v-if="errors.final_amount">{{ errors.final_amount[0] }}</span>
                                </div>                      
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="end_date">Tnxid </label>
                                    <input type="text" id="tnxid" v-model="pay_now.tnxid" class="form-control" required>
                                    <span class="text-danger" v-if="errors.tnxid">{{ errors.tnxid[0] }}</span>
                                </div>                      
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="image">Image </label>
                                    <input type="file" id="image" @change="onImageChange" class="form-control">
                                    <span class="text-danger" v-if="errors.image">{{ errors.image[0] }}</span>
                                </div>                      
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="note">Note </label>
                                    <input type="text" id="note" v-model="pay_now.note" class="form-control">
                                    <span class="text-danger" v-if="errors.note">{{ errors.note[0] }}</span>
                                </div>                      
                            </div>
                        </div>
                    </div>              
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="submitPayment">Save</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->
    </div>
</template>
<script>
    import config from '@/config'
    import Select2 from 'v-select2-component'
    export default {
        name:'payment',
        components:{
            'select2': Select2
        },
        data(){
            return {   
                loader: false,             
                payments:{
                    data: []
                },
                search: {
                    merchant_id: '',
                    amount: '',
                    date: ''
                },
                pay_now:{
                    id : '',
                    merchant_id : '',
                    payment_by : '',
                    amount : '',
                    adjustment : '',
                    final_amount : '',
                    tnxid : '',
                    note : '',
                    image : ''
                },
                form_edit:'',
                errors:[],
                payNowModal:false,
                payment_id:'',
                key:'',
                allSelected: false,
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
            getMerchantList: function () {
                return this.$store.state.commonObj.merchantList
            }
        },
        methods:{
            onImageChange(e){
                this.pay_now.image = e.target.files[0];
            },
            searchData () {
                this.loadData()
            },
            async loadData(){    
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })       
                const response = await config.getData('/accounts/payment/paid', params)
                this.loader = false
                if (response.status == 200){
                    this.$store.dispatch('setList', response.data.data)
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
            showOrder (paymentId, status) {
                this.$router.push({ name: 'show-order', query: { paymentId: paymentId, status: status } })
            },
            invoice (paymentId) {
                this.$router.push({ name: 'invoice', query: { paymentId: paymentId } })
            },
            payNow (key, payment) { 
                this.key = key;
                this.pay_now = payment;
                this.payNowModal = true;
                this.pay_now.final_amount = payment.final_amount
                document.body.classList.add("modal-open");
            },
            async submitPayment () {
                this.loader = true
                this.$store.dispatch('stateReload', true)

                var formData = new FormData();
                Object.keys(this.pay_now).map(key => {
                    if (key === 'image') {
                        formData.append(key, this.tmpImage)
                    } else {
                        formData.append(key, this.pay_now[key])
                    }
                })

                const response = await config.postData('/accounts/payment/pay-now', formData)
                this.loader = false
                
                if (response.status == 201) {
                    this.payNowModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'Paid successfully',
                        color: '#D6E09B'
                    }) 
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    })   
                }
                this.$store.dispatch('stateReload', false)
            },
            cancelModal(){
                this.createModal = false;
                this.editModal = false;
                this.deleteModal = false;
                this.payNowModal = false;
                document.body.classList.remove("modal-open");
            },
            destroy(key, payment_id){ 
                this.payment_id = payment_id;
                this.key = key;
                this.deleteModal = true;
            },
            async destroypayment(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.deleteData('/accounts/payment/destroy/'+ this.payment_id)
                this.loader = false           
                this.deleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'Payment deleted successfully',
                    color: '#D6E09B'
                }) 
                this.$store.dispatch('stateReload', false)
            },
            paymentBy (payment_by) {
                if (payment_by == 1) {
                    return 'Operation'
                }else if (status == 2) {
                    return 'Merchant'
                } else {
                    return 'Accounts'
                }
            },
            getStatus (status) {
                if (parseInt(status) == 1) {
                    return 'Pending'
                }else {
                    return 'Paid'
                }
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
    .status1{
        color: #bfbf06;
        font-weight: bold;
    }
    .status2{
        color: green;
        font-weight: bold;
    }
    .imagePreviewWrapper {
        width: 250px;
        height: 250px;
        display: block;
        margin: 0 auto;
    }
</style>