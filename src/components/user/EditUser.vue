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
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="edit_name">Name <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="edit_name" v-model="form_edit.name" class="form-control" placeholder="Enter Name">
                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                <input type="hidden" name="id" v-model="form_edit.id" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="email">Email <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="email" v-model="form_edit.email" class="form-control" placeholder="Email">
                                <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                <input type="text" id="address" v-model="form_edit.address" class="form-control" placeholder="Address">
                                <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="image">Current Image</label>
                                <img :src="$image_path + form_edit.image" style="width:80px;height:50px;" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="image">Update Image</label>
                                <input type="file" id="image" @change="onImageChange" class="form-control">
                                <span class="text-danger" v-if="errors.image">{{ errors.address[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="current_password">Current Password</label>
                                <input type="password" id="current_password" v-model="form_edit.current_password" class="form-control" placeholder="Current Password">
                                <span class="text-danger" v-if="errors.current_password">{{ errors.current_password[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label for="new_password">New Password</label>
                                <input type="password" id="new_password" v-model="form_edit.new_password" class="form-control" placeholder="New Password">
                                <span class="text-danger" v-if="errors.new_password">{{ errors.new_password[0] }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <button type="button" class="btn btn-sm btn-info mr-2" @click.prevent="updateUser">Update</button>
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
    name:'EditUser',
    data(){
        return {
            loader: false,
            form_edit:'',
            tmpImage: [],
            errors:[]
        }
    },
    created(){
        const tmp = this.$store.state.authUser
        const assignedData = Object.assign(tmp, { current_password: '', new_password: ''})
        this.form_edit = assignedData
    },
    methods:{
        onImageChange (e) {
            this.tmpImage = e.target.files[0]
        },
        async updateUser() {
            this.loader = true
            
            var formData = new FormData()
            Object.keys(this.form_edit).map(key => {
                if (key === 'image') {
                    formData.append(key, this.tmpImage)
                } else {
                    formData.append(key, this.form_edit[key])
                }
            })

            const response = await config.postData('/user/update-user', formData)

            this.loader = false
            if (response.status == 201) {
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
        }
    }
}
</script>