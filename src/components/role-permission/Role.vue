<template>
    <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">All Roles</h1>
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
                                            <th style="width:20%">Name</th>
                                            <th style="width:70%">Permission</th>
                                            <th style="width:10%;text-align:center;">Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th style="width:20%">Name</th>
                                            <th style="width:70%">Permission</th>
                                            <th style="width:10%;text-align:center;">Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr v-for="(role,key) in roles" :key="role.id">
                                            <td style="width:20%">{{ role.name }}</td>
                                            <td style="width:70%">{{ getPermissionName(role.permissions) }}</td>
                                            <td style="width:10%;text-align:center;">                                                                       
                                                <!-- <button class="btn btn-warning btn-sm mr-1" @click="editModal(role)" title="Edit"><i class="fas fa-pencil-alt"></i></button> -->
                                                <button class="btn btn-danger btn-sm" @click="deleteModal(key, role.id)" title="Delete"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                    <h5 class="modal-title text-center w-100">Add New Role</h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name">
                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3" for="permissions">Permission <span class="text-danger" title="Required">*</span></label>
                                <div class="col-sm-9"> 
                                    <multiselect v-model="form.permissions" 
                                        :options="permissions.map(permission => permission.id)" 
                                        :custom-label="opt => permissions.find(x => x.id == opt).name" 
                                        :multiple="true" 
                                        :searchable="true" 
                                        :close-on-select="false" 
                                        :clear-on-select="false" 
                                        :show-labels="false" placeholder="Select ">
                                    </multiselect> 
                                </div>
                                <span class="text-danger" v-if="errors.permissions">{{ errors.permissions[0] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="createRole">Save</button>
                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="roleEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Edit Role</h5>
                    <button type="button" class="close" aria-label="Close" @click="cancelModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="name">Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                <input type="hidden" name="id" v-model="form_edit.id" />
                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3" for="permissions">Permission <span class="text-danger" title="Required">*</span></label>
                                <div class="col-sm-9">         
                                    <select id="permissions" v-model="form_edit.permissions" multiple="multiple" class="form-control select2">
                                        <option v-for="(permission, index) in permissions" :key="index" :value="permission.id">{{ permission.name }}</option>
                                    </select>
                                </div>
                                <span class="text-danger" v-if="errors.permissions">{{ errors.permissions[0] }}</span>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="updateRole">Update</button>
                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="roleDeleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                    <button type="button" class="btn btn-info" @click="destroyRole">Delete</button>
                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import config from '../../config'
    import Multiselect from 'vue-multiselect'
    export default {
        name:'Role',
        components: {
            Multiselect
        },
        data(){
            return {        
                loader: false,         
                roles:{},
                permissions:[],
                editPermissions:[],
                form:{
                    name        : '',
                    permissions : [],
                    guard_name  : 'sanctum',
                },
                form_edit:'',
                errors:[],
                createModal:false,
                roleEditModal:false,
                roleDeleteModal:false,
                rider_id:'',
                key:'',
            }
        },
        created(){
            this.getRole();
            this.getPermission();
        },
        methods:{
            async getRole(){      
                this.loader = true           
                const response = await config.getData('roles')
                this.loader = false  
                if (response) {
                    this.roles = response
                } else {
                    this.roles = []
                }
            },
            getPermission(){            
                config.getData('permissions')
                .then((response) => {
                    this.permissions = response; 
                    this.permissions = response.map(item => {
                        return Object.assign({ id: item.id, name: item.name})
                    })  
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            showCreateModal(){
                this.createModal = true;
                document.body.classList.add("modal-open");
            },
            createRole(){
                config.postData('roles/store', this.form)
                .then((response) => {
                    if(response.status == 201){
                        this.createModal = false;            
                        this.$toast.success('Role created successfully') 
                        this.getRole()
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        this.$toast.error('Sorry, Inputted field missing') 
                    }
                });
            },
            cancelModal(){
                this.createModal = false;
                this.roleEditModal = false;
                this.roleDeleteModal = false;
                document.body.classList.remove("modal-open");
            },
            editModal(role){
                this.roleEditModal = true;
                this.form_edit = role;
                // this.editPermissions =  role.permissions.map(item => {
                //     return Object.assign({ id: item.id, name: item.name})
                // })  
                document.body.classList.add("modal-open");
            },
            updateRole(){
                config.postData('/roles/update', this.form_edit)
                .then((response) => {
                    if(response.status == 201){
                        this.$toast.success('Role updated successfully')      
                        this.roleEditModal = false;       
                    }else{
                        this.$toast.error('Sorry, something went wrong')  
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            deleteModal(key, rider_id){ 
                this.rider_id = rider_id;
                this.key = key;
                this.roleDeleteModal = true;
            },
            destroyRole(){
                config.getData('roles/destroy/'+ this.rider_id)
                .then(() => {
                    this.roles.splice(this.key, 1);
                    this.roleDeleteModal = false;
                    this.$toast.success('Role deleted successfully')
                })
                .catch((error) => {
                    this.$toast.error(error)  
                });
            },
            getPermissionName (data) {
                return data.map(item => {
                    return Object.assign(item.name)
                })
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>