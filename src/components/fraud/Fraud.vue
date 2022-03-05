<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Fraud</h1>
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
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" v-model="search.name" placeholder="Enter Name" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="mobile">Mobile</label>
                                            <input type="text" id="id" v-model="search.mobile"  placeholder="Mobile no" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
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
                                                    <th>Name</th>
                                                    <th>Mobile</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Mobile</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="fraud in listData" :key="fraud.id">
                                                    <td>{{ fraud.name }}</td>
                                                    <td>{{ fraud.mobile }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editFraud(fraud)"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm mr-1" @click="deleteFraud(fraud)"><i class="fas fa-trash"></i></button>
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
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Create New Fraud</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                    <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name">
                                    <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                    <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Enter Mobile no"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                    <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="createFraud">Save</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Edit Fraud</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                    <input type="text" id="name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                    <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                    <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Enter Mobile no"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                    <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="updateFraud">Update</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteFraudModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-info" @click="destroyFraud">Delete</button>
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
export default {
    name:'Fraud',
    data(){
        return {
            loader: true,
            loadingState: false,
            id: 0,
            frauds:{
                data: []
            },
            search: {
                name: '',
                mobile: ''
            },
            form:{
                name    : '',
                mobile  : ''
            },
            errors:[],
            createModal:false,
            createEdit: 0,
            editModal:false,
            deleteModal:false,
            fraud_id:'',
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
        }
    },
    methods:{
        searchData () {
            this.loadData()
        },
        async loadData(){ 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })              
            const response = await config.getData('/fraud', params)
            if (response) {
                this.loader = false
                this.$store.dispatch('setList', response.data.data)
                this.paginationData(response.data)
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
        async createFraud(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/fraud/store', this.form)            
            this.loader = false 
            if(response.status == 201){
                this.createModal = false;
                this.frauds.data.push(response.data);  
                this.$toast.success('Fraud created successfully')  
            }else{
                this.$toast.error('Sorry, something went wrong')  
            }
            this.$store.dispatch('stateReload', false)
        },
        cancelModal(){
            this.createModal = false;
            this.editModal = false;
            this.deleteModal = false;
        },
        editFraud(fraud){
            this.editModal = true  
            this.form_edit = fraud;
        },
        async updateFraud(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.putData(`/fraud/update/${this.form_edit.id}`, this.form_edit)
            .then((response) => {
                if(response.status == 201){  
                    this.$toast.success('Fraud update successfully')  
                    this.editModal = false;   
                    this.loader = false
                }else{
                    this.$toast.error('Sorry, something went wrong')  
                }
            });
            this.$store.dispatch('stateReload', false)
        },
        deleteFraud(key, fraud_id){
            this.fraud_id = fraud_id;
            this.key = key;
            this.deleteModal = true;
        },
        destroyFraud(){
            config.deleteData(`/fraud/destroy/${this.fraud_id}`)
            .then(() => {
                this.frauds.data.splice(this.key, 1);
                this.deleteModal = false;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>