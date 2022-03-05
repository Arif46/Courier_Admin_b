<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All collection</h1>
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
                                            <label for="rider_id">Rider</label>
                                            <select2 v-model="search.rider_id" placeholder="Select" :options="riderList"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="assign_date">Assign Date</label>
                                            <input type="date" id="assign_date" v-model="search.assign_date" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="activity_date">Activity Date</label>
                                            <input type="date" id="activity_date" v-model="search.activity_date" class="form-control" />
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
                                        <table id="collectionTable" class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <td colspan="3">
                                                        <label>
                                                            <input type="checkbox" @click="selectAll" v-model="allSelected">
                                                            <p>Select All</p>
                                                        </label>
                                                    </td>
                                                    <td colspan="2">
                                                        <label><p>Total Order : {{ this.totalOrder }}</p></label>
                                                    </td>
                                                    <td colspan="2">
                                                        <label><p>Total Collectable Amount : {{ this.totalAmount }}</p></label>
                                                        <button class="btn btn-success float-right btn-sm mr-2" @click="receive"> Receive</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Merchant</th>
                                                    <th>Rider</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Collected Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Merchant</th>
                                                    <th>Rider</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Collected Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(collection,key) in collections" :key="key">
                                                    <td>
                                                        <label>
                                                            <input v-model="form.orderIds" @click="select(collection.id)" :value="collection.id" type="checkbox" class="order-checkbox" />
                                                            <p>{{ collection.sku }}</p>
                                                        </label>
                                                    </td>
                                                    <td>{{ collection.merchant_business }}</td>
                                                    <td>{{ collection.rider_name }}</td>
                                                    <td>{{ collection.date }}</td>
                                                    <td>{{ collection.price }}</td>
                                                    <td>{{ collection.collected_amount }}</td>
                                                    <td><span class="label p-1" :class="'status-'+collection.status">{{ getStatus(collection.status) }}</span></td>
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
        <div v-if="deleteModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-info" @click="destroycollection">Delete</button>
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
    import Select2 from 'v-select2-component'
    export default {
        name:'Collection',
        components:{
            'select2': Select2
        },
        data(){
            return {   
                loader: true,             
                loading: false,             
                collections:{
                    data: []
                },
                search: {
                    rider_id: '',
                    amount: '',
                    assign_date: '',
                    activity_date: '',
                    is_search: 1
                },
                form:{
                    rider_id : '',
                    date : '',
                    orderIds: []
                },
                errors:[],
                deleteModal:false,
                collection_id:'',
                key:'',
                allSelected: false,
                totalAmount: 0,
                totalOrder: 0
            }
        },
        created(){
            this.getCollection();
        },
        computed : {
            riderList: function () {
                return this.$store.state.commonObj.riderList
            }
        },
        methods:{
            selectAll () {
                this.loader = true
                this.form.orderIds = [];
                if (!this.allSelected) {
                    const orders = this.collections
                    for (var order in orders) {
                        this.totalAmount += parseFloat(orders[order].collected_amount)
                        this.form.orderIds.push(orders[order].id);
                    }
                    this.totalOrder = this.form.orderIds.length
                } else {
                    this.totalOrder = 0
                    this.totalAmount = 0
                }
                this.loader = false
            },
            select(orderId) {
                this.form.orderIds.push(orderId)
                const orders = this.collections
                const tmpOrder = orders.find(order => order.id == orderId)
                this.totalAmount += parseFloat(tmpOrder.collected_amount)
                this.allSelected = false;
            },
            receive () {
                this.form.rider_id = this.search.rider_id;
                this.form.date = this.search.date;
                config.postData('/accounts/collection/receive', this.form)
                .then((response) => {
                    if (response.status == 201) {
                        this.allSelected = false
                        this.totalOrder = this.totalAmount = 0
                        this.getCollection()
                        this.$toast.success({
                            title: 'Success',
                            message: 'Payment Received',
                            color: '#D6E09B'
                        }) 
                    }else{
                        this.$toast.error({
                            title: 'Error',
                            message: 'Sorry, something went wrong'
                        }) 
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            searchData () {
                this.getCollection()
            },
            async getCollection(){     
                this.loader = true
                const params = Object.assign({}, this.search)        
                const response = await config.getData('/accounts/collection/list', params)
                this.loader = false
                if (response.status == 200){
                    this.collections = response.data
                } else {
                    this.collections = []
                } 
            },
            cancelModal(){
                this.createModal = false;
                this.editModal = false;
                this.deleteModal = false;
                document.body.classList.remove("modal-open");
            },
            destroy(key, collection_id){ 
                this.collection_id = collection_id;
                this.key = key;
                this.deleteModal = true;
            },
            async destroycollection(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.deleteData('/accounts/collection/destroy/'+ this.collection_id)
                this.loader = false           
                this.deleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'Hub deleted successfully',
                    color: '#D6E09B'
                }) 
            },
            getStatus (status) {
                if (status == 1) {
                    return 'Requesting'
                } else if (status == 2) {
                    return 'Picked Up'
                } else if (status == 3) {
                    return 'Accepted'
                } else if (status == 4) {
                    return 'Assign'
                } else if (status == 5) {
                    return 'On Way'
                } else if (status == 6) {
                    return 'Successfull'
                } else if (status == 7) {
                    return 'Reschedule'
                } else if (status == 8) {
                    return 'Return'
                } else if (status == 9) {
                    return 'Cancel'
                } else if (status == 10) {
                    return 'Partial Complete'
                } else if (status == 11) {
                    return 'Exchange'
                } else if (status == 12) {
                    return 'Hold'
                }
            }
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>