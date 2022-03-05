<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Profile Details</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6"></div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">   
                        <b-overlay :show="loader">
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="edit_name">Company Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="edit_name" v-model="form_edit.name" class="form-control" placeholder="Enter Area Name">
                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                        <input type="hidden" name="id" v-model="form_edit.id" />
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="mobile_1">Mobile 1 <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="mobile_1" v-model="form_edit.mobile_1" class="form-control" placeholder="Enter Mobile 1" required>
                                        <span class="text-danger" v-if="errors.mobile_1">{{ errors.mobile_1[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="mobile_1">Mobile 2 </label>
                                        <input type="text" id="mobile_2" v-model="form_edit.mobile_2" class="form-control" placeholder="Enter Mobile 2">
                                        <span class="text-danger" v-if="errors.mobile_2">{{ errors.mobile_2[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="email_1">Email 1 <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="email_1" v-model="form_edit.email_1" class="form-control" placeholder="Enter Email 1" required>
                                        <span class="text-danger" v-if="errors.email_1">{{ errors.email_1[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="email_2">Email 2 </label>
                                        <input type="text" id="email_2" v-model="form_edit.email_2" class="form-control" placeholder="Enter Email 2">
                                        <span class="text-danger" v-if="errors.email_2">{{ errors.email_2[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <input type="text" id="address" v-model="form_edit.address" class="form-control" placeholder="Enter Address">
                                        <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address">SMS Service </label>
                                        <select class="form-control" v-model="form_edit.sms_service">
                                            <option :value="1">On</option>
                                            <option :value="2">Off</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <button type="button" class="btn btn-sm btn-info mr-2" @click.prevent="updateProfile">Update</button>
                                        <button type="button" class="btn btn-sm btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </b-overlay>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
  </div>
</template>
<script>
import config from '@/config'
export default {
    name:'Area',
    data(){
        return {
            loader: false,
            form_edit:'',
            errors:[]
        }
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){      
            this.loader = true      
            config.getData('/profile')
            .then((response) => {
                this.loader = false
                this.form_edit = response.data;   
            })
            .catch((error) => {
               console.log(error);
            });
        },
        async updateProfile(){
            this.loader = true
            const response = await config.postData('/profile/update', this.form_edit)
            this.loader = false
            if (response.status == 201) {
                this.$toast.success({
                    title: 'Success',
                    message: 'Profile Updated Successfully',
                    color: '#D6E09B'
                })
                this.editModal = false;   
                this.getProfile();    
            } else {
                this.$toast.error({
                    title: 'Error',
                    message: 'Email or password not match'
                })
            }
        }
    }
}
</script>