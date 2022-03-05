<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">All Banner</h1>
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
                            <table class="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Image</th>
                                        <th style="text-align:center;">Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Image</th>
                                        <th style="text-align:center;">Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr v-for="(banner,key) in listData" :key="banner.id">
                                        <td>{{ banner.title }}</td>
                                        <td>{{ getType(banner.type) }}</td>
                                        <td>
                                            <img :src="$image_path+banner.image" style="width:60px;height:35px;"/>
                                        </td>
                                        <td style="text-align:center;">
                                            <button class="btn btn-warning btn-sm mr-1" @click="editBanner(banner)"><i class="fas fa-pencil-alt"></i></button>
                                            <button class="btn btn-danger btn-sm" @click="deleteBanner(key, banner.id)"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mt-3">
                                <b-pagination
                                    v-model="pagination.currentPage"
                                    :per-page="pagination.perPage"
                                    :total-rows="pagination.totalRows"
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
                        <h5 class="modal-title text-center w-100">Create New Banner</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">Title <span class="text-danger" title="Required">*</span></label>
                            <input type="text" id="title" v-model="form.title" class="form-control" placeholder="Enter Title">
                            <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="details">Details <span class="text-danger" title="Required">*</span></label>
                            <textarea id="details" v-model="form.details" class="form-control" placeholder="Enter Details"></textarea>
                            <span class="text-danger" v-if="errors.details">{{ errors.details[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" id="link" v-model="form.link" class="form-control" placeholder="Enter Link">
                            <span class="text-danger" v-if="errors.link">{{ errors.link[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="type">Type <span class="text-danger" title="Required">*</span></label>
                            <select id="type" v-model="form.type" class="form-control">
                                <option v-for="(type, index) in types" :key="index" :value="type.value">{{ type.text }}</option>
                            </select>
                            <span class="text-danger" v-if="errors.type">{{ errors.type[0] }}</span>
                        </div> 
                        <div class="form-group">
                            <label for="image">Image <span class="text-danger" title="Required">*</span></label>
                            <input type="file" id="image" @change="onImageChange" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="createBanner">Save</button>
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
                        <h5 class="modal-title text-center w-100">Edit Area</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="edit_title">Title <span class="text-danger" title="Required">*</span></label>
                            <input type="text" id="edit_title" v-model="form_edit.title" class="form-control" placeholder="Enter Area Name">
                            <input type="hidden" name="id" v-model="form_edit.id" />
                        </div>
                        <div class="form-group">
                            <label for="details">Details <span class="text-danger" title="Required">*</span></label>
                            <textarea id="details" v-model="form_edit.details" class="form-control" placeholder="Enter Details"></textarea>
                            <span class="text-danger" v-if="errors.details">{{ errors.details[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" id="link" v-model="form_edit.link" class="form-control" placeholder="Enter Link">
                            <span class="text-danger" v-if="errors.link">{{ errors.link[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="type">Type <span class="text-danger" title="Required">*</span></label>
                            <select id="type" v-model="form_edit.type" class="form-control">
                                <option v-for="(type, index) in types" :key="index" :value="type.value">{{ type.text }}</option>
                            </select>
                            <span class="text-danger" v-if="errors.type">{{ errors.type[0] }}</span>
                        </div> 
                        <div class="form-group">
                            <label for="image">Update Image <span class="text-danger" title="Required">*</span></label>
                            <input type="file" id="image" @change="onImageChange" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="image">Curent Image <span class="text-danger" title="Required">*</span></label>
                            <img :src="$image_path + form_edit.image" style="width:60px;height:35px;" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="updateBanner">Update</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </b-overlay>
            </div>
        </div>
    </div>
    <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-info" @click="destroyBanner">Delete</button>
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
    name:'Area',
    data(){
        return {
            loader: false,
            banners:[],
            form:{
                title  : '',
                details : '',
                image : '',
                link : '',
                type : 1
            },
            tmpImage: [],
            types : [
                { value: 1, text:'Merchant App' },
                { value: 2, text:'Rider App' },
                { value: 3, text:'Web' }
            ],
            form_edit:'',
            errors:[],
            createModal:false,
            editModal:false,
            deleteModal:false,
            banner_id:'',
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
        searchData () {
            this.loadData()
        },
        onImageChange(e){
            this.tmpImage = e.target.files[0];
        },
        async loadData(){     
            this.loader = true          
            const response = await config.getData('/banner')
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
        async createBanner(){
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
            const response = await config.postData('/banner/store', formData)
            this.loader = false
            if (response.status == 201) {
                this.createModal = false;        
                this.$toast.success({
                    title: 'Success',
                    message: 'Banner created successfully',
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
        editBanner(banner){
            this.editModal = true;
            this.form_edit = banner;
        },
        async updateBanner(){
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
            const response = await config.postData('/banner/update', formData)
            this.loader = false
            if (response.status == 201) {
                this.editModal = false;        
                this.$toast.success({
                    title: 'Success',
                    message: 'Banner updated successfully',
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
        deleteBanner(key, banner_id){
            this.banner_id = banner_id;
            this.key = key;
            this.deleteModal = true;
        },
        async destroyBanner(){
            this.loader = true
            this.$store.dispatch('stateReload', true)
            await config.deleteData('/banner/destroy/'+ this.banner_id)
            this.loader = true
            this.deleteModal = false
            this.$toast.success({
                title: 'Success',
                message: 'Banner deleted successfully',
                color: '#D6E09B'
            }) 
            this.$store.dispatch('stateReload', false)
        },
        getType (type) {
            if (type == 1) {
                return 'Merchant App'
            } else if (type == 2) {
                return 'Rider App'
            } else if (type == 2) {
                return 'Web'
            }
        }
    }
}
</script>