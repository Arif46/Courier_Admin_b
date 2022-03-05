<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Weight Charges</h1>
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
                                                    <th>Name</th>
                                                    <th>Charge</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Charge</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(charge,key) in listData" :key="charge.id">
                                                    <td>{{ charge.name }}</td>
                                                    <td>{{ charge.charge }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editWeightCharge(key, charge)"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm"  @click="deleteWeightCharge(key, charge.id)"><i class="fas fa-trash"></i></button>
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
                    <b-overlay :show="loader">
                        <form autocomplete="off">
                            <div class="modal-header bg-info text-white">
                                <h5 class="modal-title text-center w-100">Create New Weight Charge</h5>
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
                                <div class="form-group">
                                    <label for="name">Charge <span class="text-danger" title="Required">*</span></label>
                                    <input type="text" id="weight" v-model="form.charge" class="form-control" placeholder="Enter Charge" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                    <span class="text-danger" v-if="errors.charge">{{ errors.charge[0] }}</span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" @click.prevent="createWeightCharge">Save</button>
                                <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                            </div>
                        </form>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Weight Charge</h5>
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
                            <div class="form-group">
                                <label for="name">Charge <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="base_charge" v-model="form_edit.charge" class="form-control" placeholder="Enter Base Charge" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                <span class="text-danger" v-if="errors.charge">{{ errors.charge[0] }}</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateWeightCharge">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteWeightChargeModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyWeightCharge">Delete</button>
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
    name:'WeightCharge',
    data(){
        return {
            loader: false,
            form:{
                name: '',
                charge: ''
            },
            form_edit:'',
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            weight_charge_id:'',
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
        async loadData() {     
            this.loader = true 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
            const response = await config.getData('/weight-charge', params)
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
        async createWeightCharge(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/weight-charge/store', this.form)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.createModal = false;
                this.form = ''           
                this.$toast.success({
                    title: 'Success',
                    message: 'Weight Charge created successfully',
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
        editWeightCharge(key, zone){
            this.key = key;
            this.editModal = true;
            this.form_edit = zone;
        },
        async updateWeightCharge(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/weight-charge/update', this.form_edit)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.editModal = false;       
                this.$toast.success({
                    title: 'Success',
                    message: 'Weight Charge updated successfully',
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
        deleteWeightCharge(key, weight_charge_id){
            this.weight_charge_id = weight_charge_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyWeightCharge(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/weight-charge/destroy/' + this.weight_charge_id)
            this.loader = false           
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Weight Charge deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        }
    }
}
</script>