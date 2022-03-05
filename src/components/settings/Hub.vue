<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Hubs</h1>
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
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" v-model="search.name" placeholder="Name" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="mobile">Mobile</label>
                                            <input type="text" id="mobile" v-model="search.mobile" placeholder="Mobile" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="division_id">Division</label>
                                            <select id="division_id" v-model="search.division_id" class="form-control" required>
                                                <option :value="0">Select</option>
                                                <option v-for="(division,index) in divisionList" :key="index" :value="division.id">{{ division.text }}</option>
                                            </select>
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
                                            <label for="mobile">Thana</label>
                                            <select2 v-model="search.thana_id" placeholder="Select" :options="thanaList"></select2>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
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
                                                <th>Mobile</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr v-for="(hub,key) in listData" :key="hub.id">
                                                <td>{{ hub.name }}</td>
                                                <td>{{ hub.mobile }}</td>
                                                <td>{{ hub.address }}</td>
                                                <td><img :src="$image_path + hub.image" alt="hub image" style="width:50px;"></td>
                                                <td style="text-align:center;">
                                                    <button class="btn btn-warning btn-sm mr-1" @click="editHub(hub)"><i class="fas fa-pencil-alt"></i></button>
                                                    <button class="btn btn-danger btn-sm"  @click="deleteHub(key, hub.id)"><i class="fas fa-trash"></i></button>
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
        <div v-if="createModal" class="modal fade show" style="display:block" tabindex="-1" id="addHubModal" Hub="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" Hub="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Create New Hub</h5>
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
                                        <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Mobile">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                    </div>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="division_id">Division <span class="text-danger" title="Required">*</span></label>
                                        <select id="division_id" v-model="form.division_id" class="form-control" required>
                                            <option :value="0">Select</option>
                                            <option v-for="(division,index) in divisionList" :key="index" :value="division.id">{{ division.text }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.division_id">{{ errors.division_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="district_id">District <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form.district_id" placeholder="Select" :options="districtList"></select2>
                                        <!-- <select id="district_id" v-model="form.district_id" class="form-control" required>
                                            <option :value="0">Select</option>
                                            <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
                                        </select> -->
                                        <span class="text-danger" v-if="errors.district_id">{{ errors.district_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="thana_id">Thana <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form.thana_id" placeholder="Select" :options="thanaList"></select2>
                                        <!-- <select id="thana_id" v-model="form.thana_id" class="form-control" required>
                                            <option :value="0">Select</option>
                                            <option v-for="thana in thanas" :key="thana.id" :value="thana.id">{{ thana.name }}</option>
                                        </select> -->
                                        <span class="text-danger" v-if="errors.thana_id">{{ errors.thana_id[0] }}</span>
                                    </div>
                                </div>
                            </div>  
                            <div class="form-group">
                                <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="address" v-model="form.address" class="form-control" placeholder="Address">
                                <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label for="image">Image <span class="text-danger" title="Required">*</span></label>
                                <input type="file" id="image" v-on:change="onImageChange" class="form-control">                                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createHub">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" id="editHubModal" Hub="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" Hub="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Hub</h5>
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
                                        <input type="hidden" id="id" v-model="form_edit.id" />
                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                    </div>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="division_id">Division <span class="text-danger" title="Required">*</span></label>
                                        <select id="division_id" v-model="form_edit.division_id" class="form-control" required>
                                            <option v-for="division in divisionList" :key="division.id" :value="division.id">{{ division.text }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.division_id">{{ errors.division_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="district_id">District <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form_edit.district_id" placeholder="Select" :options="editDistricts"></select2>
                                        <span class="text-danger" v-if="errors.district_id">{{ errors.district_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="thana_id">Thana <span class="text-danger" title="Required">*</span></label>
                                        <select2 v-model="form_edit.thana_id" placeholder="Select" :options="editThanas"></select2>
                                        <span class="text-danger" v-if="errors.thana_id">{{ errors.thana_id[0] }}</span>
                                    </div>
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="address" v-model="form_edit.address" class="form-control" placeholder="Address">
                                        <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="image">Current Image <span class="text-danger" title="Required">*</span></label>
                                        <img :src="$image_path + form_edit.image" class="form-control" style="width:60px;">                                                
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="image">Update Image <span class="text-danger" title="Required">*</span></label>
                                        <input type="file" id="image" v-on:change="onImageChange" class="form-control">                                                
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateHub">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteHubModal" Hub="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" Hub="document">
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
                            <button type="button" class="btn btn-info" @click="destroyHub">Delete</button>
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
    name:'Hub',
    components:{
        'select2': Select2
    },
    data(){
        return {
            loader: false,
            form:{
                name    : '',
                mobile  : '',
                address : '',
                division_id : 0,
                district_id : 0,
                thana_id : 0,
                image : '',
            },
            search: {
                name: '',
                mobile: '',
                address: '',
                division_id: 0,
                district_id: 0,
                thana_id: 0
            },
            tmpImage: '',
            form_edit:'',
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            hub_id:'',
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
        stateReload : function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.loadData()
            }
        },
        'search.division_id': function (newVal) {
            this.districtList = this.getDistrictList(newVal)
        },
        'search.district_id': function (newVal) {
            this.thanaList = this.getThanaList(newVal)
        },
        'form.division_id': function (newVal) {
            this.districtList = this.getDistrictList(newVal)
        },
        'form.district_id': function (newVal) {
            this.thanaList = this.getThanaList(newVal)
        }
    },
    computed : {
        stateReload () {
            return this.$store.state.stateReload
        },
        listData () {
            return this.$store.state.list
        },
        divisionList: function () {
            return this.$store.state.commonObj.divisionList
        },
        editDistricts: function () {
            return this.$store.state.commonObj.districtList
        },
        editThanas: function () {
            return this.$store.state.commonObj.thanaList
        }
    },
    methods:{
        searchData () {
            this.loadData()
        },
        onImageChange(e){
            this.tmpImage = e.target.files[0];
        },
        async loadData(){     
            this.loader = true 
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
            const response = await config.getData('/hub', params)
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
        async createHub() {
            this.loader = true
            this.$store.dispatch('stateReload', true)

            var formData = new FormData();
            Object.keys(this.form).map(key => {
                if (key === 'image') {
                    formData.append(key, this.tmpImage)
                } else {
                    formData.append(key, this.form[key])
                }
            })

            const response = await config.postData('/hub/store', formData)

            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.createModal = false;
                this.form = ''           
                this.$toast.success({
                    title: 'Success',
                    message: 'Hub created successfully',
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
        editHub(hub){
            this.editModal = true;
            this.form_edit = hub;
        },
        async updateHub(){
            this.loader = true
            this.$store.dispatch('stateReload', true)

            var formData = new FormData();
            Object.keys(this.form_edit).map(key => {
                if (key === 'image') {
                    formData.append(key, this.tmpImage)
                } else {
                    formData.append(key, this.form_edit[key])
                }
            })

            const response = await config.postData('/hub/update', formData)
            
            this.loader = false
            if (response.status == 201) {
                this.$store.dispatch('commonObjLoad', true)
                this.editModal = false         
                this.$toast.success({
                    title: 'Success',
                    message: 'Hub updated successfully',
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
        deleteHub(key, hub_id){
            this.hub_id = hub_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyHub(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/hub/destroy/'+this.hub_id)
            this.loader = false           
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Hub deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        },
        getDistrictList (divisionId) {
            const districts = this.$store.state.commonObj.districtList
            if (divisionId) {
                return districts.filter(district => district.division_id === divisionId)
            }
            return districts
        },
        getThanaList () {
            return this.$store.state.commonObj.thanaList
        }
    }
}
</script>