<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Logistic Partner</h1>
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
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Address</th>
                                                    <th>Image</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Address</th>
                                                    <th>Image</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(partner,key) in listData" :key="partner.id">
                                                    <td>{{ partner.name }}</td>
                                                    <td>{{ partner.mobile }}</td>
                                                    <td>{{ partner.email }}</td>
                                                    <td>{{ partner.address }}</td>
                                                    <td><img :src="$image_path+partner.image" alt="Rider Image" style="width:80px;height:50px;"/></td>                              
                                                    <td style="text-align:center;">                                                                        
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editModal(partner)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm" @click="deleteModal(key, partner.id)" title="Delete"><i class="fas fa-trash"></i></button>
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
                            <h5 class="modal-title text-center w-100">Add New Logistic Partner</h5>
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
                                        <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Mobile">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="website">Website <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="website" v-model="form.website" class="form-control" placeholder="Website">
                                        <span class="text-danger" v-if="errors.website">{{ errors.website[0] }}</span>
                                    </div>                        
                                </div>                        
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="business" v-model="form.address" class="form-control" placeholder="Enter Address">
                                        <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createPartner">Save</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                     </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="partnerEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                     <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Partner</h5>
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
                                        <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile">
                                        <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="website">Website <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="website" v-model="form_edit.website" class="form-control" placeholder="Website">
                                        <span class="text-danger" v-if="errors.website">{{ errors.website[0] }}</span>
                                    </div>                        
                                </div>                        
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="business" v-model="form_edit.address" class="form-control" placeholder="Enter Address">
                                        <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updatePartner">Update</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                     </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="partnerDeleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-info" @click="destroyPartner">Delete</button>
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
        name:'Partner',
        data(){
            return {  
                loader: false,    
                form:{
                    name : '',
                    email : '',
                    mobile : '',
                    website : '',
                    address : '',
                    image : ''
                },
                tmpImage: '',
                form_edit:'',
                errors:[],
                createModal:false,
                partnerEditModal:false,
                partnerDeleteModal:false,
                partner_id:'',
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
            onImageChange(e){
                this.tmpImage = e.target.files[0];
            },
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true 
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })          
                const response = await config.getData('/partner', params)
                this.loader = false
                if (response.status == 200){
                    this.$store.dispatch('setList', response.data.data)
                    this.paginationData(response.data)
                } else {
                    this.$store.dispatch('setList', [])
                } 
            },
            showCreateModal(){
                this.createModal = true;
                document.body.classList.add("modal-open");
            },
            async createPartner(){
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

                const response = await config.postData('/partner/store', formData)

                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.createModal = false        
                    this.$toast.success({
                        title: 'Success',
                        message: 'Partner created successfully',
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
                this.partnerEditModal = false;
                this.partnerDeleteModal = false;
                document.body.classList.remove("modal-open");
            },
            editModal(rider){
                this.partnerEditModal = true;
                this.form_edit = rider;
                document.body.classList.add("modal-open");
            },
            async updatePartner(){
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

                const response = await config.postData('/partner/update', formData)

                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.partnerEditModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'Partner updated successfully',
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
            deleteModal(key, partner_id){ 
                this.partner_id = partner_id;
                this.key = key;
                this.partnerDeleteModal = true;
            },
            async destroyPartner(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.deleteData('/partner/destroy/'+ this.partner_id)
                this.loader = false           
                this.deleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'Partner deleted successfully',
                    color: '#D6E09B'
                }) 
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