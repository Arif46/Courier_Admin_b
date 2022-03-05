<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Rider</h1>
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
                                <form v-on:keyup.enter="searchData">
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="name">Name</label>
                                                <input type="text" id="name" v-model="search.name" placeholder="Enter Name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="mobile">Mobile No</label>
                                                <input type="text" id="mobile" v-model="search.mobile" placeholder="Enter Mobile No" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="nid">NID No</label>
                                                <input type="text" id="nid" v-model="search.nid" placeholder="Enter NID no" class="form-control" />
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
                                                    <th>Mobile</th>
                                                    <th>NID</th>
                                                    <th>Address</th>
                                                    <th>Vehicle</th>
                                                    <th>Image</th>
                                                    <th>Status</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Mobile</th>
                                                    <th>NID</th>
                                                    <th>Address</th>
                                                    <th>Vehicle</th>
                                                    <th>Image</th>
                                                    <th>Status</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(rider,key) in listData" :key="rider.id">
                                                    <td>{{ rider.name }}</td>
                                                    <td>{{ rider.mobile }}</td>
                                                    <td>{{ rider.nid }}</td>
                                                    <td>{{ rider.address }}</td>
                                                    <td>{{ rider.vehicle }}</td>
                                                    <td><img :src="$image_path+rider.image" alt="Rider Image" style="width:80px;height:50px;"/></td>
                                                    <td>{{ rider.status == 0 ? 'Inactive' : 'Active' }}</td>
                                                    <td style="text-align:center;">                                    
                                                        <button v-if="rider.status == 0" class="btn btn-success btn-sm mr-1" @click="statusUpdate(1, rider)" title="Active"><i class="fas fa-check"></i></button>
                                                        <button v-if="rider.status == 1" class="btn btn-danger btn-sm mr-1" @click="statusUpdate(0, rider)" title="Inactive"><i class="fas fa-user-slash"></i></button>
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editModal(rider)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm" @click="deleteModal(key, rider.id)" title="Delete"><i class="fas fa-trash"></i></button>
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
                            <h5 class="modal-title text-center w-100">Add New Rider</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:keyup.enter="createRider">
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
                                            <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                        </div>                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="nid">NID <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="nid" v-model="form.nid" class="form-control" placeholder="NID" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.nid">{{ errors.nid[0] }}</span>
                                        </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="business" v-model="form.address" class="form-control" placeholder="Enter Address">
                                            <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                        <label for="vehicle">Vehicle <span class="text-danger" title="Required">*</span></label>
                                        <!-- <input type="text" id="vehicle" v-model="form.vehicle" class="form-control" placeholder="Enter Vehicle"> -->
                                        <select id="vehicle" v-model="form.vehicle" class="form-control">
                                            <option v-for="(vehicle, index) in vehicles" :key="index" :value="vehicle.text">{{ vehicle.text }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.vehicle">{{ errors.vehicle[0] }}</span>
                                    </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Hub</label>
                                            <select2 v-model="form.hub_id" placeholder="Select" :options="commonObj.hubList"></select2>
                                            <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="image">Image</label>
                                            <input type="file" id="image" @change="onImageChange" class="form-control">
                                            <span class="text-danger" v-if="errors.image">{{ errors.address[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createRider">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="riderEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document"> 
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Rider</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:keyup.enter="updateRider">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                            <input type="hidden" name="id" v-model="form_edit.id" />
                                            <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                        </div>                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="nid">NID <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="nid" v-model="form_edit.nid" class="form-control" placeholder="NID" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.nid">{{ errors.nid[0] }}</span>
                                        </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="business" v-model="form_edit.address" class="form-control" placeholder="Enter Address">
                                            <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="vehicle">Vehicle <span class="text-danger" title="Required">*</span></label>
                                            <select id="vehicle" v-model="form_edit.vehicle" class="form-control">
                                                <option v-for="(vehicle, index) in vehicles" :key="index" :value="vehicle.text">{{ vehicle.text }}</option>
                                            </select>
                                            <span class="text-danger" v-if="errors.vehicle">{{ errors.vehicle[0] }}</span>
                                        </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="status">Status</label>
                                            <select id="status" v-model="form_edit.status" class="form-control">
                                                <option :value="1">Active</option>
                                                <option :value="0">Inactive</option>
                                            </select>
                                            <span class="text-danger" v-if="errors.status">{{ errors.status[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="image">Update Image</label>
                                            <input type="file" id="image" @change="onImageChange" class="form-control">
                                            <span class="text-danger" v-if="errors.image">{{ errors.address[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Hub</label>
                                            <select2 v-model="form_edit.hub_id" placeholder="Select" :options="commonObj.hubList"></select2>
                                            <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateRider">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="riderDeleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyRider">Delete</button>
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
        name:'Rider',
        components:{
            'select2': Select2
        },
        data(){
            return {  
                loader: false, 
                riders:{
                    data: []
                },
                search: {
                    name: '',
                    mobile: '',
                    nid: ''
                },
                form:{
                    name : '',
                    mobile : '',
                    nid : '',
                    address : '',
                    image : '',
                    vehicle : 'Cycle',
                    hub_id : 0
                },
                vehicles:[
                    {value:1, text: 'Bike'},
                    {value:2, text: 'Cycle'},
                    {value:3, text: 'Covered Van'}
                ],
                form_edit:'',
                tmpImage:[],
                errors:[],
                createModal:false,
                riderEditModal:false,
                riderDeleteModal:false,
                rider_id:'',
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
            onImageChange(e){
                this.tmpImage = e.target.files[0];
            },
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
                const response = await config.getData('/rider', params)
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
            async createRider(){ 
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

                const response = await config.postData('/rider/store', formData)
                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.createModal = false        
                    this.$toast.success({
                        title: 'Success',
                        message: 'Rider created successfully',
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
                this.riderEditModal = false;
                this.riderDeleteModal = false;
                document.body.classList.remove("modal-open");
            },
            editModal(rider){
                this.riderEditModal = true;
                this.form_edit = rider;
                document.body.classList.add("modal-open");
            },
            async updateRider(){
                this.loader = true
                this.$store.dispatch('stateReload', true)

                var formData = new FormData()
                Object.keys(this.form_edit).map(key => {
                    if (key === 'image') {
                        formData.append(key, this.tmpImage)
                    } else {
                        formData.append(key, this.form_edit[key])
                    }
                })

                const response = await config.postData('/rider/update', formData)

                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.riderEditModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'Rider updated successfully',
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
            deleteModal(key, rider_id){ 
                this.rider_id = rider_id;
                this.key = key;
                this.riderDeleteModal = true;
            },
            async destroyRider(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.getData('/rider/destroy/'+ this.rider_id)
                this.loader = false           
                this.riderDeleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'Rider deleted successfully',
                    color: '#D6E09B'
                }) 
                this.$store.dispatch('stateReload', false)
            },
            async statusUpdate(status, rider){ 
                this.loader = true
                this.$store.dispatch('stateReload', true)
                const response = config.getData('/rider/status-update/'+rider.id+'/'+status)
                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)   
                    this.$toast.success({
                        title: 'Success',
                        message: 'Status updated successfully',
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