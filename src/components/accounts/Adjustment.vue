<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All adjustment</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <button class="btn btn-info float-right" @click="showCreateModal"><i class="fas fa-plus-circle"></i> Create</button>
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
                                        <label for="title">Merchant</label>
                                        <select2 v-model="search.merchant_id" placeholder="Select" :options="getMerchantList"></select2>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="amount">Amount</label>
                                        <input type="text" id="amount" v-model="search.amount" placeholder="Amount" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
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
                                    <table class="table table-bordered table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th>Merchant</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Merchant</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr v-for="(adjustment,key) in listData" :key="key">
                                                <td>{{ adjustment.merchant_business }}</td>
                                                <td>{{ adjustment.date }}</td>
                                                <td>{{ adjustment.amount }}</td>
                                                <td>{{ adjustment.description }}</td>
                                                <td style="text-align:center;">      
                                                    <button class="btn btn-warning btn-sm mr-1" @click="edit(adjustment)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                    <button class="btn btn-danger btn-sm" @click="destroy(key, adjustment.id)" title="Delete"><i class="fas fa-trash"></i></button>
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
        <div v-if="createModal" class="modal fade show" style="display:block" tabindex="-1" id="addHubModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <b-overlay :show="loader">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Add New Adjustment</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="merchant_id">Merchant <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form.merchant_id" placeholder="Select" :options="getMerchantList"></select2>
                                        <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                        <input type="date" id="date" v-model="form.date" class="form-control">
                                        <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="amount">Amount <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="amount" v-model="form.amount" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                        <span class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="description">Description <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="description" v-model="form.description" class="form-control">
                                        <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createAdjustment">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                 <b-overlay :show="loader">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Adjustment</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="merchant_id">Merchant <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form_edit.merchant_id" placeholder="Select" :options="getMerchantList"></select2>
                                        <input type="hidden" name="id" v-model="form_edit.id" />
                                        <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                        <input type="date" id="date" v-model="form_edit.date" class="form-control">
                                        <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="amount">Amount <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="amount" v-model="form_edit.amount" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                        <span class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="description">Description <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="description" v-model="form_edit.description" class="form-control">
                                        <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateAdjustment">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Delete Confirmation</h5>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="del_id" />
                        <h3 class="text-center">Are you sure to delete ?</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click="destroyadjustment">Delete</button>
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
        name:'Adjustment',
        components:{
            'select2': Select2
        },
        data(){
            return {   
                loader: false,             
                adjustments:{
                    data: []
                },
                search: {
                    merchant_id: '',
                    amount: '',
                    date: ''
                },
                form:{
                    merchant_id : '',
                    date : '',
                    amount : '',
                    description : ''
                },
                form_edit:'',
                errors:[],
                createModal:false,
                editModal:false,
                deleteModal:false,
                adjustment_id:'',
                key:'',
                merchants: '',
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
            getStatus (status) {
                if (status == 1) {
                    return 'Pending'
                } else if (status == 2) {
                    return 'Accept'
                } else if (status == 3) {
                    return 'Running'
                } else {
                    return 'History'
                }
            },
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
                const response = await config.getData('/accounts/adjustment', params)
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
            showCreateModal(){
                this.createModal = true;
                document.body.classList.add("modal-open");
            },
            async createAdjustment(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                const response = await config.postData('/accounts/adjustment/store', this.form)
                this.loader = false
                if (response.status == 201) {
                    this.createModal = false;
                    this.form = ''           
                    this.$toast.success({
                        title: 'Success',
                        message: 'Adjustment created successfully',
                        color: '#D6E09B'
                    }) 
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    })   
                }
            },
            cancelModal(){
                this.createModal = false;
                this.editModal = false;
                this.deleteModal = false;
                document.body.classList.remove("modal-open");
            },
            edit(adjustment){
                this.editModal = true;
                this.form_edit = adjustment;
                document.body.classList.add("modal-open");
            },
            async updateAdjustment(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                const response = await config.postData('/accounts/adjustment/update', this.form_edit)
                this.loader = false
                if (response.status == 201) {
                    this.editModal = false;            
                    this.$toast.success({
                        title: 'Success',
                        message: 'Adjustment updated successfully',
                        color: '#D6E09B'
                    })  
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    })  
                }
            },
            destroy(key, adjustment_id){ 
                this.adjustment_id = adjustment_id;
                this.key = key;
                this.deleteModal = true;
            },
            async destroyadjustment(){
                this.$store.dispatch('stateReload', true)
                const response = await config.deleteData('/accounts/adjustment/destroy/'+ this.adjustment_id)
                if (response.status == 200) {
                    this.deleteModal = false
                    this.$toast.success({
                        title: 'Success',
                        message: 'Adjustment deleted successfully',
                        color: '#D6E09B'
                    })  
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    })  
                }
                this.$store.dispatch('stateReload', false)
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>