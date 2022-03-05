<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Users</h1>
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
                                    <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" v-model="search.name" placeholder="Enter Name" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="text" id="email" v-model="search.email" placeholder="Enter Email Address" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="mobile">Mobile No</label>
                                            <input type="text" id="mobile" v-model="search.mobile" placeholder="Enter Mobile No" class="form-control" />
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
                                    <table class="table table-responsive table-bordered table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr v-for="user in listData" :key="user.id">
                                                <td>{{ user.name }} <br/> {{ user.mobile }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>{{ user.address }}</td>
                                                <td><img :src="$image_path+user.image" alt="User Image" style="width:80px;height:50px;"/></td>                    
                                                <td>{{ getRoleName(user.roles) }}</td>    
                                                <td v-if="user.status == 0">Inactive</td>
                                                <td v-if="user.status == 1">Active</td>                
                                                <td style="text-align:center;">    
                                                    <button v-if="user.status == 0" class="btn btn-success btn-sm mr-1" @click="statusUpdate(1, user)" title="Active"><i class="fas fa-check"></i></button>
                                                    <button v-if="user.status == 1" class="btn btn-danger btn-sm mr-1" @click="statusUpdate(0, user)" title="Inactive"><i class="fas fa-user-slash"></i></button>                                                                   
                                                    <button class="btn btn-warning btn-sm mr-1" @click="editModal(user)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                    <!-- <button class="btn btn-danger btn-sm" @click="deleteModal(key, user.id)" title="Delete"><i class="fas fa-trash"></i></button> -->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                            <h5 class="modal-title text-center w-100">Add New User</h5>
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
                                        <label for="email">Email <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="email" v-model="form.email" class="form-control" placeholder="Email">
                                        <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
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
                                        <label for="password">Password <span class="text-danger" title="Required">*</span></label>
                                        <input type="password" id="password" v-model="form.password" class="form-control" placeholder="Enter Password">
                                        <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                                    </div>                      
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="image">Image</label>
                                        <input type="file" id="image" @change="onImageChange" class="form-control">
                                        <span class="text-danger" v-if="errors.image">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="role_id">Role <span class="text-danger" title="Required">*</span></label> 
                                        <multiselect v-model="form.roles" 
                                            :options="roles.map(role => role.id)" 
                                            :custom-label="opt => roles.find(x => x.id == opt).name" 
                                            :multiple="true" 
                                            :searchable="true" 
                                            :close-on-select="false" 
                                            :clear-on-select="false" 
                                            :show-labels="false" placeholder="Select ">
                                        </multiselect>   
                                        <!-- <select v-model="form.roles" multiple="multiple" id="role_id" class="form-control">
                                            <option v-for="(role,index) in roles" :key="index" :value="role.id">{{ role.name }}</option>
                                        </select> -->
                                        <span class="text-danger" v-if="errors.roles">{{ errors.roles[0] }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createUser">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="userEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit User</h5>
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
                                        <input type="hidden" name="id" v-model="form_edit.id" />
                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="email">Email <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="email" v-model="form_edit.email" class="form-control" placeholder="Email">
                                        <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                                    </div>                        
                                </div>                        
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                    </div>                        
                                </div>
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
                                        <label for="password">Password</label>
                                        <input type="password" id="password" v-model="form_edit.password" class="form-control">
                                        <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="image">Update Image</label>
                                        <input type="file" id="image" @change="onImageChange" class="form-control">
                                        <span class="text-danger" v-if="errors.image">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="roles">Role <span class="text-danger" title="Required">*</span></label>
                                        <multiselect v-model="form_edit.roles" 
                                            :options="roles.map(role => role.id)" 
                                            :custom-label="opt => roles.find(x => x.id == opt).name" 
                                            :multiple="true" 
                                            :searchable="true" 
                                            :close-on-select="false" 
                                            :clear-on-select="false" 
                                            :show-labels="false" placeholder="Select ">
                                        </multiselect> 
                                        <span class="text-danger" v-if="errors.roles">{{ errors.roles[0] }}</span>
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateUser">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="userDeleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyUser">Delete</button>
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
    import Multiselect from 'vue-multiselect'
    export default {
        name:'Rider',
        components:{
            Multiselect: Multiselect
        },
        data(){
            return {   
                loader: false,             
                roles:[],
                users:{
                    data: []
                },
                search: {
                    name: '',
                    email: '',
                    mobile: ''
                },
                form:{
                    name : '',
                    email : '',
                    mobile : '',
                    address : '',
                    image : '',
                    value : null,
                    roles : [],
                    password : ''
                },
                tmpImage: [],
                form_edit:'',
                errors:[],
                createModal:false,
                userEditModal:false,
                userDeleteModal:false,
                user_id:'',
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
            this.getRoles();
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
            onImageChange(e){
                this.tmpImage = e.target.files[0];
            },
            getRoles(){            
                config.getData('/roles')
                .then((response) => {
                    this.roles =  response.map(item => {
                        return Object.assign({ id: item.id, name: item.name})
                    }) 
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
                const response = await config.getData('/user', params)
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
            async createUser(){
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

                const response = await config.postData('/user/store', formData)

                this.loader = false
                if (response.status == 201) {
                    this.createModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'User created successfully',
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
                this.userEditModal = false;
                this.userDeleteModal = false;
                document.body.classList.remove("modal-open");
            },
            editModal(user){
                this.userEditModal = true;
                this.form_edit = Object.assign({}, user, {
                    role_id: user.roles.map(role => role.id),
                    roles: []
                })
                document.body.classList.add("modal-open");
            },
            async updateUser(){
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

                const response = await config.postData('/user/update', formData)
                this.loader = false
                if (response.status == 201) {
                    this.userEditModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'User updated successfully',
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
            deleteModal(key, user_id){ 
                this.user_id = user_id;
                this.key = key;
                this.userDeleteModal = true;
            },
            async destroyUser(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.deleteData('/user/destroy/'+ this.user_id)
                this.loader = false           
                this.deleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'User deleted successfully',
                    color: '#D6E09B'
                }) 
                this.$store.dispatch('stateReload', false)
            },
            getRoleName (data) {
                return data.map(item => {
                    return Object.assign(item.name)
                })
            },
            async statusUpdate(status, user){ 
                this.loader = true
                this.$store.dispatch('stateReload', true)
                const response = await config.getData('/user/status-update/' + user.id + '/' + status)
                this.loader = false
                if (response.status == 201) {      
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