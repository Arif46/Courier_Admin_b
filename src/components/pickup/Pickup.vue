<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">{{ $t('globalTrans.allPickup') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <button class="btn btn-info float-right" @click="showCreateModal"><i class="fas fa-plus-circle"></i> {{ $t('globalTrans.addNew') }}</button>
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
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="title">{{ $t('globalTrans.merchant') }}</label>
                                            <select id="merchant_id" v-model="search.merchant_id" class="form-control">
                                                <option v-for="(merchant,index) in merchants" :value="merchant.id" :key="index">{{ merchant.business }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="title">{{ $t('globalTrans.hub') }}</label>
                                            <select id="hub_id" v-model="search.hub_id" class="form-control">
                                                <option :value="0">{{ $t('globalTrans.select') }}</option>
                                                <option v-for="(hub, index) in hubs" :value="hub.id" :key="index">{{ hub.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="title">Rider</label>
                                            <select id="rider_id" v-model="search.rider_id" class="form-control">
                                                <option :value="0">{{ $t('globalTrans.select') }}</option>
                                                <option v-for="(rider, index) in riders" :value="rider.id" :key="index">{{ rider.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">{{ $t('globalTrans.date') }}</label>
                                            <input type="date" id="date" v-model="search.date" class="form-control" />
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
                                                <th>{{ $t('globalTrans.merchant') }}</th>
                                                <th>{{ $t('globalTrans.hub') }}</th>
                                                <th>{{ $t('globalTrans.rider') }}</th>
                                                <th>{{ $t('globalTrans.date') }}</th>
                                                <th>{{ $t('globalTrans.status') }}</th>
                                                <th style="text-align:center;">{{ $t('globalTrans.action') }}</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>{{ $t('globalTrans.merchant') }}</th>
                                                <th>{{ $t('globalTrans.hub') }}</th>
                                                <th>{{ $t('globalTrans.rider') }}</th>
                                                <th>{{ $t('globalTrans.date') }}</th>
                                                <th>{{ $t('globalTrans.status') }}</th>
                                                <th style="text-align:center;">{{ $t('globalTrans.action') }}</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr v-for="(pickup,key) in listData" :key="key">
                                                <td>{{ pickup.merchant_business }}</td>
                                                <td>{{ pickup.hub_name }}</td>
                                                <td>{{ pickup.rider_name }}</td>
                                                <td>{{ pickup.date }}</td>
                                                <td>{{ getStatus(pickup.status) }}</td>
                                                <td style="text-align:center;">                                    
                                                    <button v-if="pickup.status == 1" class="btn btn-success btn-sm mr-1" @click="statusUpdate(2, key, pickup)" :title="$t('globalTrans.active')"><i class="fas fa-check"></i></button>
                                                    <button class="btn btn-warning btn-sm mr-1" @click="edit(pickup)" :title="$t('globalTrans.edit')"><i class="fas fa-pencil-alt"></i></button>
                                                    <button class="btn btn-danger btn-sm" @click="destroy(key, pickup.id)" :title="$t('globalTrans.delete')"><i class="fas fa-trash"></i></button>
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
                <form v-on:keyup.enter="createPickup">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">{{ $t('globalTrans.addNew') }} {{ $t('globalTrans.pickup') }}</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="merchant_id">{{ $t('globalTrans.merchant') }} <span class="text-danger" title="Required">*</span></label>
                                        <select id="merchant_id" v-model="form.merchant_id" class="form-control">
                                            <option :value="0">{{ $t('globalTrans.select') }}</option>
                                            <option v-for="(merchant,index) in merchants" :value="merchant.id" :key="index">{{ merchant.business }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="hub_id">{{ $t('globalTrans.hub') }} </label>
                                        <select id="hub_id" v-model="form.hub_id" class="form-control">
                                            <option :value="0">{{ $t('globalTrans.select') }}</option>
                                            <option v-for="(hub, index) in hubs" :value="hub.id" :key="index">{{ hub.name }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="rider_id">{{ $t('globalTrans.rider') }} <span class="text-danger" title="Required">*</span></label>
                                        <!-- <select2 v-model="form.rider_id" :options="riders"></select2> -->
                                        <select id="rider_id" v-model="form.rider_id" class="form-control">
                                            <option :value="0">{{ $t('globalTrans.select') }}</option>
                                            <option v-for="(rider, index) in riders" :value="rider.id" :key="index">{{ rider.name }}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.rider_id">{{ errors.rider_id[0] }}</span>
                                    </div>                        
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="date">{{ $t('globalTrans.date') }} <span class="text-danger" title="Required">*</span></label>
                                        <input type="date" id="date" v-model="form.date" class="form-control">
                                        <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="details">{{ $t('globalTrans.details') }} <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="details" v-model="form.details" class="form-control">
                                        <span class="text-danger" v-if="errors.details">{{ errors.details[0] }}</span>
                                    </div>                        
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="createPickup">{{ $t('globalTrans.submit') }}</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">{{ $t('globalTrans.cancel') }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <b-overlay :show="loader">
                    <form v-on:keyup.enter="updatePickup">
                        <div class="modal-content">
                            <div class="modal-header bg-info text-white">
                                <h5 class="modal-title text-center w-100">{{ $t('globalTrans.update') }} {{ $t('globalTrans.pickup') }}</h5>
                                <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="merchant_id">{{ $t('globalTrans.merchant') }} <span class="text-danger" title="Required">*</span></label>
                                            <select id="merchant_id" v-model="form_edit.merchant_id" class="form-control">
                                                <option v-for="(merchant,index) in merchants" :value="merchant.id" :key="index">{{ merchant.business }}</option>
                                            </select>
                                            <input type="hidden" name="id" v-model="form_edit.id" />
                                            <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                        </div>                        
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="hub_id">{{ $t('globalTrans.hub') }} </label>
                                            <select id="hub_id" v-model="form_edit.hub_id" class="form-control">
                                                <option :value="0">{{ $t('globalTrans.select') }}</option>
                                                <option v-for="(hub, index) in hubs" :value="hub.id" :key="index">{{ hub.name }}</option>
                                            </select>
                                            <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                        </div>                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="rider_id">{{ $t('globalTrans.rider') }} </label>
                                            <!-- <select2 v-model="form.rider_id" :options="riders"></select2> -->
                                            <select id="rider_id" v-model="form_edit.rider_id" class="form-control">
                                                <option :value="0">{{ $t('globalTrans.select') }}</option>
                                                <option v-for="(rider, index) in riders" :value="rider.id" :key="index">{{ rider.name }}</option>
                                            </select>
                                            <span class="text-danger" v-if="errors.rider_id">{{ errors.rider_id[0] }}</span>
                                        </div>                        
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="date">{{ $t('globalTrans.date') }} <span class="text-danger" title="Required">*</span></label>
                                            <input type="date" id="date" v-model="form_edit.date" class="form-control">
                                            <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                        </div>                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="details">Details <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="details" v-model="form_edit.details" class="form-control">
                                            <span class="text-danger" v-if="errors.details">{{ errors.details[0] }}</span>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" @click.prevent="updatePickup">{{ $t('globalTrans.submit') }}</button>
                                <button type="button" class="btn btn-danger" @click="cancelModal">{{ $t('globalTrans.cancel') }}</button>
                            </div>
                        </div>
                    </form>
                </b-overlay>
            </div>
        </div>
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">{{ $t('globalTrans.deleteConfirmation') }}</h5>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="del_id" />
                        <h3 class="text-center">{{ $t('globalTrans.areYouSureToDelete') }}</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click="destroyPickup">{{ $t('globalTrans.yes') }}</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">{{ $t('globalTrans.no') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->
    </div>
</template>
<script>
    import config from '@/config'
    export default {
        name:'Pickup',
        data(){
            return {   
                loader: true,             
                pickups:{
                    data: []
                },
                search: {
                    merchant_id: 0,
                    hub_id: 0,
                    rider_id: 0,
                    date: ''
                },
                form:{
                    merchant_id : 0,
                    hub_id : 0,
                    rider_id : 0,
                    date : '',
                    details : ''
                },
                form_edit:'',
                errors:[],
                createModal:false,
                editModal:false,
                deleteModal:false,
                pickup_id:'',
                key:'',
                merchants: '',
                hubs: '',
                riders: '',
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
            this.getMerchant();
            this.getHub();
            this.getRider();
        },
        watch: {
            '$route.query.id': function (newVal, oldVal) {
                if(newVal != oldVal) {
                    Object.assign(this.search, { id: this.$route.query.id })
                    this.loadData()
                }
            },
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
            getStatus (status) {
                if (status == 1) {
                    return 'Pending'
                } else if (status == 2) {
                    return 'Accept'
                } else if (status == 3) {
                    return 'Running'
                } else {
                    return 'History'
                }
            },
            searchData () {
                this.loadData()
            },
            async loadData(){     
                this.loader = true
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })              
                const response = await config.getData('/pickup', params)
                this.loader = false
                if (response.status == 200) {
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
            createPickup(){
                this.$store.dispatch('stateReload', true)
                config.postData('/pickup/store', this.form)
                .then((response) => {
                    if(response.status == 201){
                        this.createModal = false;
                        this.pickups.data.push(response.data);             
                        this.$toast.success('Pickup created successfully') 
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                    this.$store.dispatch('stateReload', false)
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            cancelModal(){
                this.createModal = false;
                this.editModal = false;
                this.deleteModal = false;
                document.body.classList.remove("modal-open");
            },
            edit(pickup){
                this.editModal = true;
                this.form_edit = pickup;
                document.body.classList.add("modal-open");
            },
            updatePickup(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                config.postData('/pickup/update', this.form_edit)
                .then((response) => {
                    if (response.status == '201') {
                        this.editModal = false;    
                        this.$store.dispatch('removeFromNavbarPickup', this.form_edit.id)
                        this.$toast.success('Pickup updated successfully')   
                    } else {
                        this.$toast.error('Sorry, something went wrong')  
                    }
                    this.loader = false
                    this.$store.dispatch('stateReload', false)
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else {
                        this.$toast.error(error)  
                    }
                });
            },
            destroy(key, pickup_id){ 
                this.pickup_id = pickup_id;
                this.key = key;
                this.deleteModal = true;
            },
            destroyPickup(){
                config.deleteData('/pickup/destroy/'+ this.pickup_id)
                .then(() => {
                    this.pickups.data.splice(this.key, 1);
                    this.deleteModal = false;
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            async statusUpdate(status, key, pickup){ 
                this.loader = true
                this.$store.dispatch('stateReload', true)
                const params = { id: pickup.id, status: status }
                const response = await config.postData('/pickup/status-update', params)                            
                this.loader = false
                    this.$store.dispatch('stateReload', false)
                    if (status == 2) {
                        this.$store.dispatch('removeFromNavbarPickup', pickup.id)
                    }
                if (response.status == 201) {
                    this.$toast.success('Status update successfully') 
                } else {
                    this.$toast.error('Sorry, something went wrong')
                }
            },
            getMerchant () {
                config.getData('/common/merchant-list')
                .then((response) => {
                    this.merchants = response
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            getHub () {
                config.getData('/common/hub-list')
                .then((response) => {
                    this.hubs = response
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            getRider () {
                config.getData('/common/rider-list')
                .then((response) => {
                    this.riders = response
                    // const riderList = response
                    // let tmpData = {}
                    // riderList.map(rider => {
                    //     tmpData = { id: rider.id, text: rider.name}
                    // })
                    // this.riders.push(tmpData)
                })
                .catch((error) => {
                    console.log(error);
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