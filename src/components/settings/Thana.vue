<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Thana</h1>
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
                                            <label for="division_id">Division</label>
                                            <select2 v-model="search.division_id" placeholder="Select" :options="commonObj.divisionList"></select2>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="district_id">District</label>
                                            <select2 v-model="search.district_id" placeholder="Select" :options="districtList"></select2>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" v-model="search.name" placeholder="Enter Name" class="form-control" />
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
                                                    <th>SL</th>
                                                    <th>District</th>
                                                    <th>Name</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>District</th>
                                                    <th>Name</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(thana, key) in listData" :key="thana.id">
                                                    <td>{{ key + 1 }}</td>
                                                    <td>{{ thana.district.name }}</td>
                                                    <td>{{ thana.name }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editThana(key, thana)"><i class="fas fa-pencil-alt"></i></button>
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
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Create New Thana</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="division_id">Division <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form.division_id" placeholder="Select" :options="commonObj.divisionList"></select2>
                                        <span class="text-danger" v-if="errors.division_id">{{ errors.division_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="district_id">District <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form.district_id" placeholder="Select" :options="districtList"></select2>
                                        <span class="text-danger" v-if="errors.district_id">{{ errors.district_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name">
                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createThana">Save</button>
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
                            <h5 class="modal-title text-center w-100">Edit Thana</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">                        
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="division_id">Division <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form_edit.division_id" placeholder="Select" :options="commonObj.divisionList"></select2>
                                        <span class="text-danger" v-if="errors.division_id">{{ errors.division_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="district_id">District <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form_edit.district_id" placeholder="Select" :options="districtList"></select2>
                                        <span class="text-danger" v-if="errors.district_id">{{ errors.district_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                    </div>
                                </div>                         
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateThana">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteThanaModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyThana">Delete</button>
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
    name:'Thana',
    components:{
        'select2': Select2
    },
    data(){
        return {
            loader: false,
            search: {
                division_id : 0,
                district_id : 0,
                name: ''
            },
            form:{
                division_id: 0,
                district_id: 0,
                name: ''
            },
            form_edit: {},
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            thana_id:'',
            key:'',
            districtList: [],
            thanaList: [],
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
        loadingState : function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.loadData()
            }
        },
        'search.division_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.districtList = this.getDistrictList(newVal)
            }
        },
        'search.district_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.thanaList = this.getThanaList(newVal)
            }
        },
        'form.division_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.districtList = this.getDistrictList(newVal)
            }
        },
        'form.district_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.thanaList = this.getThanaList(newVal)
            }
        },
        'form_edit.division_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.districtList = this.getDistrictList(newVal)
            }
        },
        'form_edit.district_id': function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.thanaList = this.getThanaList(newVal)
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
        },
    },
    methods:{
        searchData () {
            this.loadData()
        },
        async loadData(){     
            this.loader = true 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
            const response = await config.getData('/thana', params)
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
        async createThana(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.postData('/thana/store', this.form)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.createModal = false;      
                this.$toast.success({
                    title: 'Success',
                    message: 'Thana created successfully',
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
        editThana(key, thana){
            this.key = key
            this.editModal = true
            this.form_edit = thana
        },
        async updateThana(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            const response = await config.putData(`/thana/update/${this.form_edit.id}`, this.form_edit)
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.editModal = false;            
                this.$toast.success({
                    title: 'Success',
                    message: 'Thana updated successfully',
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
        deleteThana(key, thana_id){
            this.thana_id = thana_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyThana(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/thana/destroy/'+ this.thana_id)
            this.loader = false           
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Bank deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        },
        getDistrictList (divisionId) {
            return this.commonObj.districtList.filter(dist => dist.division_id == divisionId)
        },
        getThanaList (districtId) {
            return this.commonObj.thanaList.filter(thana => thana.district_id == districtId)
        }
    }
}
</script>