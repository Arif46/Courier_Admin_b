<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Issue</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <button class="btn btn-info float-right" @click="createEdit.show()"><i class="fas fa-plus-circle"></i> Create</button>
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
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="title">Title</label>
                                            <input type="text" id="title" v-model="search.title" placeholder="Enter Name" class="form-control" />
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
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Title</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="issue in listData" :key="issue.id">
                                                    <td>{{ issue.title }}</td>
                                                    <td style="text-align:center;">
                                                        <button class="btn btn-warning btn-sm mr-1" @click="edit(issue)"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm mr-1" @click="deleteFraud(issue)"><i class="fas fa-trash"></i></button>
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
        <div ref="formModal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <Form :createEdit="createEdit" :id="editId"></Form>
        </div>
        <!-- <b-modal id="modal-4" size="lg" :title="formTitle">
            <Form :id="editId" :key="editId"/>
        </b-modal> -->
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" id="deleteFraudModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-info" @click="destroyFraud">Delete</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->
    </div>
</template>
<script>
import config from '@/config'
import { Modal } from 'bootstrap'
import Form from './Form.vue'
export default {
    name:'Issue',
    components:{
        Form: Form
    },
    data(){
        return {
            createEdit: 0,
            editId: 0,
            formTitle: this.editId === 0 ? 'Create Issue' : 'Update Issue',
            loader: false,
            issues:{
                data: []
            },
            search: {
                title: ''
            },
            deleteModal:false,
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
    mounted() {
        this.createEdit = new Modal(this.$refs.formModal)
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
        async loadData(){ 
            this.loader = true  
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })       
            await config.getData('/issue', params)
            .then((response) => {
                this.loader = false
                if (response.status == 200) {
                    this.$store.dispatch('setList', response.data.data)
                    this.paginationData(response.data)
                } else {
                    this.$store.dispatch('setList', [])
                }
            });
        },
        paginationData (data) {
            this.pagination.currentPage = data.current_page
            this.pagination.totalRows = data.total
            this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
        },
        cancelModal(){
            this.deleteModal = false;
        },
        create (){
            this.editId = 0 
            this.createEdit.show()
        },
        edit(issue){
            this.editId = issue.id  
            if (this.editId != 0) {
                this.createEdit.show()
            }
        },
        deleteFraud(key, fraud_id){
            this.fraud_id = fraud_id;
            this.key = key;
            this.deleteModal = true;
        },
        destroyFraud(){
            config.deleteData(`/fraud/destroy/${this.fraud_id}`)
            .then(() => {
                this.frauds.data.splice(this.key, 1);
                this.deleteModal = false;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>