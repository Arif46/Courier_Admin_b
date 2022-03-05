<template>
    <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">All Permission</h1>
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
                                            <th>Guard</th>
                                            <th style="text-align:center;">Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Guard</th>
                                            <th style="text-align:center;">Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr v-for="(permission,key) in permissions" :key="permission.id">
                                            <td>{{ permission.name }}</td>
                                            <td>{{ permission.guard_name }}</td>
                                            <td style="text-align:center;">                                                                       
                                                <button class="btn btn-warning btn-sm mr-1" @click="editModal(permission)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                <button class="btn btn-danger btn-sm" @click="deleteModal(key, permission.id)" title="Delete"><i class="fas fa-trash"></i></button>
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
                    <h5 class="modal-title text-center w-100">Add New Permission</h5>
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
                                <label class="control-label col-sm-3" for="permissions">Roles <span class="text-danger" title="Required">*</span></label>
                                <div class="col-sm-9">
                                    <multiselect v-model="form.roles" 
                                        :options="roles.map(role => role.id)" 
                                        :custom-label="opt => roles.find(x => x.id == opt).name" 
                                        :multiple="true" 
                                        :searchable="true" 
                                        :close-on-select="false" 
                                        :clear-on-select="false" 
                                        :show-labels="false" placeholder="Select ">
                                    </multiselect>          
                                </div>
                                <span class="text-danger" v-if="errors.roles">{{ errors.roles[0] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="createPermission">Save</button>
                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="permissionEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Edit Permission</h5>
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
                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="updatePermission">Update</button>
                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="permissionDeleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
    <!-- /.content -->
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
                value: [],
                roles:[],
                permissions:[],
                form:{                    
                    name        : '',
                    roles       : null,
                    guard_name  : 'sanctum',
                },
                form_edit:'',
                errors:[],
                createModal:false,
                permissionEditModal:false,
                permissionDeleteModal:false,
                rider_id:'',
                key:'',
            }
        },
        created(){
            this.getRole();
            this.getPermission();
        },
        methods:{
            getRole(){            
                config.getData('roles')
                .then((response) => {
                    this.roles =  response.map(item => {
                        return Object.assign({ id: item.id, name: item.name})
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            async getPermission(){  
                this.loader = true           
                const response = await config.getData('permissions')
                this.loader = false  
                if (response) {
                    this.permissions = response;
                } else {
                    this.permissions = []
                }
            },
            showCreateModal(){
                this.createModal = true;
                document.body.classList.add("modal-open");
            },
            createPermission(){
                config.postData('permissions/store', this.form)
                .then((response) => {
                    if(response.status == 201){
                        this.createModal = false;
                        this.permissions.push(response.data);             
                        this.$toast.success('Permission created successfully') 
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
                this.permissionEditModal = false;
                this.permissionDeleteModal = false;
                document.body.classList.remove("modal-open");
            },
            editModal(permission){
                this.permissionEditModal = true;
                this.form_edit = permission;
                document.body.classList.add("modal-open");
            },
            updatePermission(){
                config.postData('/permissions/update', this.form_edit)
                .then((response) => {
                    if(response.status == 201){
                        this.$toast.success('Role updated successfully')      
                        this.permissionEditModal = false;       
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
                this.permissionDeleteModal = true;
            },
            destroyRole(){
                config.deleteData('roles/destroy/'+ this.rider_id)
                .then(() => {
                    this.roles.splice(this.key, 1);
                    this.permissionDeleteModal = false;
                    this.$toast.success('Role deleted successfully')
                })
                .catch((error) => {
                    this.$toast.error(error)  
                });
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>