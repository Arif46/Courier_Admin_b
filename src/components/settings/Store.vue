<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Stores</h1>
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
                            <div class="card-body">
                                <b-overlay :show="loader">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Pickup Name</th>
                                                    <th>Pickup Number</th>
                                                    <th>Pickup Address</th>
                                                    <th>Pickup Instruction</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Pickup Name</th>
                                                    <th>Pickup Number</th>
                                                    <th>Pickup Address</th>
                                                    <th>Pickup Instruction</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(store,key) in listData" :key="store.id">
                                                    <td>{{ store.pickup_name }}</td>
                                                    <td>{{ store.pickup_contact_number }}</td>
                                                    <td>{{ store.pickup_address }}</td>
                                                    <td>{{ store.pickup_instruction }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editStore(store)"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm"  @click="deleteStore(key, store.id)"><i class="fas fa-trash"></i></button>
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
        <div v-if="createModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Create Pickup Store</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="merchant_id">Merchant <span class="text-danger" title="Required">*</span></label>  
                                        <select2 v-model="form.merchant_id" placeholder="Select" :options="commonObj.merchantList"></select2>
                                        <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="logistic_partner_id">Logistic Partner</label>  
                                        <select2 v-model="form.logistic_partner_id" placeholder="Select" :options="commonObj.logisticPartnerList"></select2>                             
                                        <span class="text-danger" v-if="errors.logistic_partner_id">{{ errors.logistic_partner_id[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_name">Pickup Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_name" v-model="form.pickup_name" class="form-control" placeholder="Pickup Name">
                                        <span class="text-danger" v-if="errors.pickup_name">{{ errors.pickup_name[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_contact_number">Pickup Contact Number <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_contact_number" v-model="form.pickup_contact_number" class="form-control" placeholder="Pickup Number">
                                        <span class="text-danger" v-if="errors.pickup_contact_number">{{ errors.pickup_contact_number[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_address">Pickup Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_address" v-model="form.pickup_address" class="form-control" placeholder="Pickup Address">
                                        <span class="text-danger" v-if="errors.pickup_address">{{ errors.pickup_address[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_instruction">Pickup Instruction <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_instruction" v-model="form.pickup_instruction" class="form-control" placeholder="Pickup Instruction">
                                        <span class="text-danger" v-if="errors.pickup_instruction">{{ errors.pickup_instruction[0] }}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createStore">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Pickup Store</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="merchant_id">Merchant <span class="text-danger" title="Required">*</span></label>                                
                                        <select2 v-model="form_edit.merchant_id" placeholder="Select" :options="commonObj.merchantList"></select2>
                                        <input type="hidden" id="id" v-model="form_edit.id" />
                                        <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="logistic_partner_id">Logistic Partner</label>                         
                                        <select2 v-model="form_edit.logistic_partner_id" placeholder="Select" :options="commonObj.logisticPartnerList"></select2> 
                                        <span class="text-danger" v-if="errors.logistic_partner_id">{{ errors.logistic_partner_id[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_name">Pickup Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_name" v-model="form_edit.pickup_name" class="form-control" placeholder="Pickup Name">
                                        <span class="text-danger" v-if="errors.pickup_name">{{ errors.pickup_name[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_contact_number">Pickup Contact Number <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_contact_number" v-model="form_edit.pickup_contact_number" class="form-control" placeholder="Pickup Number">
                                        <span class="text-danger" v-if="errors.pickup_contact_number">{{ errors.pickup_contact_number[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_address">Pickup Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_address" v-model="form_edit.pickup_address" class="form-control" placeholder="Pickup Address">
                                        <span class="text-danger" v-if="errors.pickup_address">{{ errors.pickup_address[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="pickup_instruction">Pickup Instruction <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="pickup_instruction" v-model="form_edit.pickup_instruction" class="form-control" placeholder="Pickup Instruction">
                                        <span class="text-danger" v-if="errors.pickup_instruction">{{ errors.pickup_instruction[0] }}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateStore">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Delete Confirmation</h5>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" name="del_id" />
                            <h3 class="text-center">Are you sure to delete ?</h3>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click="destroyStore">Delete</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
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
    name:'Store',
    components:{
        'select2': Select2
    },
    data(){
        return {
            loader: false,
            merchants:{},
            partners:{},
            stores:{
                data: []
            },
            form:{
                merchant_id : '',
                logistic_partner_id  : '',
                pickup_name : '',
                pickup_contact_number : '',
                pickup_address : '',
                pickup_instruction : '',
            },
            form_edit:'',
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            store_id:'',
            key:'',
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
        commonObj () {
            return this.$store.state.commonObj
        }
    },
    methods:{
        searchData () {
            this.loadData()
        },
        async loadData() {               
            this.loader = true 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
            const response = await config.getData('/store', params)
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
        },
        async createStore() {
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/store/store', this.form)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.createModal = false;
                this.form = ''           
                this.$toast.success({
                    title: 'Success',
                    message: 'Store created successfully',
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
        },
        editStore(store){
            this.editModal = true;
            this.form_edit = store;
        },
        async updateStore(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/store/update', this.form_edit)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.editModal = false;            
                this.$toast.success({
                    title: 'Success',
                    message: 'Store updated successfully',
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
        deleteStore(key, store_id){
            this.store_id = store_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyStore(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/store/destroy/'+ this.store_id)
            this.loader = false           
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Stpre deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        }
    }
}
</script>