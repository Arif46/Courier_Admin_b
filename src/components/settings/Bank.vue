<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All banks</h1>
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
                                <form>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="bank_name">Bank Name</label>
                                                <input type="text" id="bank_name" v-model="search.name" placeholder="Enter Bank Name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <button class="btn btn-info btn-sm" type="submit" @click.prevent="searchData" style="margin-top:28px;"><i class="fa fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="card-body">
                                <b-overlay :show="loader">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped table-sm"> 
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(bank,key) in listData" :key="bank.id">
                                                    <td>{{ bank.name }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editBank(bank)"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm"  @click="deleteBank(key, bank.id)"><i class="fas fa-trash"></i></button>
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
        <div v-if="createModal" class="modal fade show" style="display:block" tabindex="-1" id="addBankModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Create New Bank</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name">
                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createBank">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" id="editBankModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Bank</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="fullname">Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="edit_name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                <input type="hidden" name="id" v-model="form_edit.id" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateBank">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteBankModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyBank">Delete</button>
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
export default {
    name:'Bank',
    data(){
        return {
            loader: false,
            banks:{
                data: []
            },
            form:{
                name : '',
            },
            search: {
                name: ''
            },
            form_edit:'',
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            bank_id:'',
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
        this.loadData()
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
            this.loader = true 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
            const response = await config.getData('/bank', params)
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
        async createBank(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/bank/store', this.form)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.createModal = false;
                this.form = ''           
                this.$toast.success({
                    title: 'Success',
                    message: 'Bank created successfully',
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
        editBank(bank){
            this.editModal = true;
            this.form_edit = bank;
        },
        async updateBank(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/bank/update', this.form_edit)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.editModal = false;            
                this.$toast.success({
                    title: 'Success',
                    message: 'Bank updated successfully',
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
        deleteBank(key, bank_id){
            this.bank_id = bank_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyBank(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/bank/destroy/' + this.bank_id) 
            this.loader = false           
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Bank deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        }
    }
}
</script>