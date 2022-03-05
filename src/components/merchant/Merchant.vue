<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">All Merchant</h1>
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
                                <form v-on:keyup.enter="searchData">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="name">Name</label>
                                                <input type="text" id="name" v-model="search.name" placeholder="Enter Name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="business">Business Name</label>
                                                <input type="text" id="business" v-model="search.business" placeholder="Enter Business Name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="mobile">Mobile No</label>
                                                <input type="text" id="mobile" v-model="search.mobile" placeholder="Enter Mobile No" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="status">Status</label>
                                                <select type="text" id="status" v-model="search.status" class="form-control">
                                                    <option :value="0">Select</option>
                                                    <option :value="1">Pending</option>
                                                    <option :value="2">Approved</option>
                                                    <option :value="3">Incomplete</option>
                                                    <option :value="4">Reject</option>
                                                </select>
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
                                                    <th>Business Name</th>
                                                    <th>Mobile</th>
                                                    <th>Image</th>
                                                    <th>Facebook Page</th>
                                                    <th>Status</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Business Name</th>
                                                    <th>Mobile</th>
                                                    <th>Image</th>
                                                    <th>Facebook Page</th>
                                                    <th>Status</th>
                                                    <th style="text-align:center;">Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr v-for="(merchant,key) in listData" :key="merchant.id">
                                                    <td>{{ merchant.business }}</td>
                                                    <td>{{ merchant.mobile }}</td>
                                                    <td><img :src="$image_path+merchant.image" alt="Merchant Image" style="width:80px;height:50px;"/></td>                    
                                                    <td>{{ merchant.fb_page_link }}</td>
                                                    <td>{{ getStatus(merchant.status) }}</td>
                                                    <td style="text-align:center;">                                    
                                                        <button v-if="merchant.status == 1 || merchant.status == 4" class="btn btn-success btn-sm mr-1" @click="statusUpdate(2, merchant.id, key)" title="Approve"><i class="fas fa-check"></i></button>
                                                        <button v-if="merchant.status == 2" class="btn btn-danger btn-sm mr-1" @click="statusUpdate(4, merchant.id)" title="Reject"><i class="fas fa-user-slash"></i></button>
                                                        <button class="btn btn-info btn-sm mr-1" @click="editCharge(merchant.id)" title="Charge"><i class="fas fa-dollar-sign"></i></button>
                                                        <button class="btn btn-warning btn-sm mr-1" @click="editMerchant(merchant)" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn btn-danger btn-sm"  @click="deleteMerchant(key, merchant.id)" title="Delete"><i class="fas fa-trash"></i></button>
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
            <div class="modal-dialog modal-lg" role="document">
                <b-overlay :show="loader">
                    <form autocomplete="off" v-on:keyup.enter="createMerchant">
                        <div class="modal-content">
                            <b-overlay :show="loader">
                                <div class="modal-header bg-info text-white">
                                    <h5 class="modal-title text-center w-100">Add New Merchant</h5>
                                    <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="fullname">Name </label>
                                                <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name">
                                                <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="business">Business Name <span class="text-danger" title="Required">*</span></label>
                                                <input type="text" id="business" v-model="form.business" class="form-control" placeholder="Business Name">
                                                <span class="text-danger" v-if="errors.business">{{ errors.business[0] }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="nid">NID </label>
                                                <input type="text" id="nid" v-model="form.nid" class="form-control" placeholder="NID" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                                <span class="text-danger" v-if="errors.nid">{{ errors.nid[0] }}</span>
                                            </div>
                                        </div>        
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                                <input type="text" id="mobile" v-model="form.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                                <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                            </div>                        
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="email">Email </label>
                                                <input type="text" id="email" v-model="form.email" class="form-control" placeholder="Email">
                                                <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                                            </div>                      
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="account_type">Account Type <span class="text-danger" title="Required">*</span></label>
                                                <select id="account_type" class="form-control" v-model="form.account_type">
                                                    <option :value="1">Bank</option>
                                                    <option :value="2">Bkash</option>
                                                    <option :value="3">Rocket</option>
                                                    <option :value="4">Nagad</option>
                                                    <option :value="5">Cash</option>
                                                    <option :value="6">Check</option>
                                                </select>
                                                <span class="text-danger" v-if="errors.account_type">{{ errors.account_type[0] }}</span>
                                            </div>                     
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="account_type">Bank</label>
                                                <select2 v-model="form.bank_id" placeholder="Select" :options="commonObj.bankList"></select2>                         
                                                <span class="text-danger" v-if="errors.bank_id">{{ errors.bank_id[0] }}</span>
                                            </div>                      
                                        </div>                    
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="branch">Branch </label>
                                                <input type="text" id="branch" v-model="form.branch" class="form-control" placeholder="Branch">                               
                                                <span class="text-danger" v-if="errors.branch">{{ errors.branch[0] }}</span>
                                            </div>
                                        </div>                       
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="account_name">Account Name </label>
                                                <input type="text" id="account_name" v-model="form.account_name" class="form-control" placeholder="Account Name">
                                                <span class="text-danger" v-if="errors.account_name">{{ errors.account_name[0] }}</span>
                                            </div>
                                        </div>           
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="account_number">Account Number </label>
                                                <input type="text" id="account_number" v-model="form.account_number" class="form-control" placeholder="Account Number">
                                                <span class="text-danger" v-if="errors.account_number">{{ errors.account_number[0] }}</span>
                                            </div>                      
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="cod">COD (%)<span class="text-danger" title="Required">*</span></label>
                                                <input type="text" id="cod" v-model="form.cod" class="form-control" placeholder="COD">
                                                <span class="text-danger" v-if="errors.cod">{{ errors.cod[0] }}</span>
                                            </div>                      
                                        </div> 
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="image">Image</label>
                                                <input type="file" id="image" @change="onImageChange" class="form-control">
                                            </div>
                                        </div>         
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" v-for="area in form.areas" :key="area.id">
                                            <div class="form-group">
                                                <label>{{ area.title }} <span class="text-danger" title="Required">*</span></label>
                                                <input type="text" v-model="area.amount" class="form-control">                               
                                                <input type="hidden" v-model="area.id" />
                                            </div>
                                        </div>         
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                                <input type="text" id="address" v-model="form.address" class="form-control" placeholder="Address">
                                                <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="hub_id">Hub <span class="text-danger" title="Required">*</span></label>
                                                <select2 v-model="form.hub_id" placeholder="Select" :options="commonObj.hubList"></select2>
                                                <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                            </div>                      
                                        </div>                         
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="password">Password <span class="text-danger" title="Required">*</span></label>
                                                <input type="password" id="password" v-model="form.password" class="form-control" placeholder="Password">
                                                <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label for="confirm_password">Confirm Password <span class="text-danger" title="Required">*</span></label>
                                                <input type="password" id="confirm_password" v-model="form.confirm_password" class="form-control" placeholder="Confirm Password">
                                                <span class="text-danger" v-if="errors.confirm_password">{{ errors.confirm_password[0] }}</span>
                                            </div>                     
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" @click.prevent="createMerchant">Save</button>
                                    <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                                </div>
                            </b-overlay>
                        </div>
                    </form>
                </b-overlay>
            </div>
        </div>
        <div v-if="editModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <b-overlay :show="loader">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title text-center w-100">Edit Merchant</h5>
                            <button type="button" class="close" aria-label="Close" @click="cancelModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:keyup.enter="updateMerchant">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="fullname">Name </label>
                                            <input type="text" id="name" v-model="form_edit.name" class="form-control" placeholder="Name">
                                            <input type="hidden" id="name" v-model="form_edit.id">
                                            <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="business">Business Name <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="business" v-model="form_edit.business" class="form-control" placeholder="Business Name">
                                            <span class="text-danger" v-if="errors.business">{{ errors.business[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="nid">NID </label>
                                            <input type="text" id="nid" v-model="form_edit.nid" class="form-control" placeholder="NID" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.nid">{{ errors.nid[0] }}</span>
                                        </div>
                                    </div>          
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="mobile">Mobile <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="mobile" v-model="form_edit.mobile" class="form-control" placeholder="Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            <span class="text-danger" v-if="errors.mobile">{{ errors.mobile[0] }}</span>
                                        </div>                        
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="email">Email </label>
                                            <input type="text" id="email" v-model="form_edit.email" class="form-control" placeholder="Email">
                                            <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                                        </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="account_type">Account Type <span class="text-danger" title="Required">*</span></label>
                                            <select id="account_type" class="form-control" v-model="form_edit.account_type">
                                                <option :value="1">Bank</option>
                                                <option :value="2">Bkash</option>
                                                <option :value="3">Rocket</option>
                                                <option :value="4">Nagad</option>
                                                <option :value="5">Cash</option>
                                                <option :value="6">Check</option>
                                            </select>
                                            <span class="text-danger" v-if="errors.account_type">{{ errors.account_type[0] }}</span>
                                        </div>                     
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="account_type">Bank</label>
                                            <select2 v-model="form_edit.bank_id" placeholder="Select" :options="commonObj.bankList"></select2>                        
                                            <span class="text-danger" v-if="errors.bank_id">{{ errors.bank_id[0] }}</span>
                                        </div>                      
                                    </div>                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="branch">Branch </label>
                                            <input type="text" id="branch" v-model="form_edit.branch" class="form-control" placeholder="Branch">                               
                                            <span class="text-danger" v-if="errors.branch">{{ errors.branch[0] }}</span>
                                        </div>
                                    </div>                       
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="account_name">Account Name </label>
                                            <input type="text" id="account_name" v-model="form_edit.account_name" class="form-control" placeholder="Account Name">
                                            <span class="text-danger" v-if="errors.account_name">{{ errors.account_name[0] }}</span>
                                        </div>
                                    </div>         
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="account_number">Account Number </label>
                                            <input type="text" id="account_number" v-model="form_edit.account_number" class="form-control" placeholder="Account Number">
                                            <span class="text-danger" v-if="errors.account_number">{{ errors.account_number[0] }}</span>
                                        </div>                      
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="cod">COD (%)<span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="cod" v-model="form_edit.cod" class="form-control" placeholder="COD">
                                            <span class="text-danger" v-if="errors.cod">{{ errors.cod[0] }}</span>
                                        </div>                      
                                    </div> 
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="image">Image</label>
                                            <input type="file" id="image" @change="onImageChange" class="form-control">
                                        </div>
                                    </div>         
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="address">Address <span class="text-danger" title="Required">*</span></label>
                                            <input type="text" id="address" v-model="form_edit.address" class="form-control" placeholder="Address">
                                            <span class="text-danger" v-if="errors.address">{{ errors.address[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="hub_id">Hub <span class="text-danger" title="Required">*</span></label>
                                            <select2 v-model="form_edit.hub_id" placeholder="Select" :options="commonObj.hubList"></select2> 
                                            <span class="text-danger" v-if="errors.hub_id">{{ errors.hub_id[0] }}</span>
                                        </div>                      
                                    </div>     
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label for="password">Password </label>
                                            <input type="password" v-model="form_edit.new_password" class="form-control" />
                                            <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                                        </div>                      
                                    </div>     
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" @click.prevent="updateMerchant">Update</button>
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
                            <button type="button" class="btn btn-info" @click="destroyMerchant">Delete</button>
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
        <div v-if="showChargeModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Update Charges</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <b-overlay :show="loader">
                            <table class="table table-bordered">
                                <tr>
                                    <th>Name</th>
                                    <th>Base Charge</th>
                                    <th>Area Charge</th>
                                </tr>
                                <tr v-for="charge in charges" :key="charge.id">
                                    <td>
                                        <div class="form-group form-check">
                                            <input type="checkbox" class="mr-1" v-model="charge.id" :id="charge.id" :value="charge.id" />
                                            <label class="form-check-label" :for="charge.id">{{charge.zone_name}}</label>
                                            <input type="hidden" class="w-35 mr-2" v-model="charge.zone_id" />
                                        </div>
                                    <td><input type="text" class="w-35 mr-2" v-model.number="charge.base_charge" /></td>
                                    <td><input type="text" class="w-35 mr-2" v-model.number="charge.area_charge" /></td>
                                </tr>
                            </table>
                        </b-overlay>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="updateCharge">Submit</button>
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
        name:'Merchant',
        components:{
            'select2': Select2
        },
        data(){
            return { 
                loader: false,   
                hubs:{},
                merchants:{
                    data:[]
                },
                charges:{},
                banks:{},
                search: {
                    name: '',
                    business: '',
                    mobile: '',
                    status: 0
                },
                form:{
                    name : '',
                    mobile : '',
                    email : '',
                    business : '',
                    nid : '',
                    account_type : 5,
                    bank_id : 0,
                    branch : '',
                    account_name : '',
                    account_number : '',
                    status : 1,
                    hub_id : 0,
                    address : '',
                    image : '',
                    password : '',
                    confirm_password : '',
                    cod: 0,
                    areas: {
                        id: [],
                        title: [],
                        amount: [],
                    }
                },
                upload_image:[],
                form_edit:'',
                errors:[],
                createModal:false,
                showChargeModal:false,
                editModal:false,
                deleteModal:false,
                merchant_id:'',
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
            this.getArea()
            this.loadData()
        },
        watch: {
            '$route.query.id': function (newVal, oldVal) {
                if(newVal != oldVal) {
                    Object.assign(this.search, { id: this.$route.query.id })
                    this.loadData()
                }
            },
            stateReload: function (newVal, oldVal) {
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
            },
            commonObj () {
                return this.$store.state.commonObj
            }
        },
        methods:{
            onImageChange(e){
                this.upload_image = e.target.files[0];
            },
            getArea(){            
                config.getData('/common/area-list')
                .then((response) => {
                    this.form.areas = response;   
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
                const response = await config.getData('/merchant', params)
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
            async createMerchant(){
                this.loader = true
                this.$store.dispatch('stateReload', true)

                var formData = new FormData();
                Object.keys(this.form).map(key => {
                    if (key === 'image') {
                        formData.append(key, this.upload_image)
                    } else {
                        formData.append(key, this.form[key])
                    }
                })

                const response = await config.postData('/merchant/store', formData)

                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.createModal = false;
                    this.form = ''           
                    this.$toast.success({
                        title: 'Success',
                        message: 'Merchant created successfully',
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
                this.showChargeModal = false;
                document.body.classList.remove("modal-open");
            },
            editMerchant(merchant){
                this.editModal = true;
                this.form_edit = Object.assign(merchant, { new_password: ''});
                document.body.classList.add("modal-open");
            },
            async updateMerchant(){
                this.loader = true
                this.$store.dispatch('stateReload', true)

                var formData = new FormData();
                Object.keys(this.form_edit).map(key => {
                    if (key === 'image') {
                        formData.append(key, this.upload_image)
                    } else {
                        formData.append(key, this.form_edit[key])
                    }
                })

                const response = await config.postData('/merchant/update', formData)
                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.editModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'Merchant updated successfully',
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
            deleteMerchant(key, merchant_id){
                this.merchant_id = merchant_id;
                this.key = key;
                this.deleteModal = true;
            },
            async destroyMerchant(){
                this.loader = true
                this.$store.dispatch('stateReload', true)
                await config.getData('/merchant/destroy/'+ this.merchant_id)
                this.loader = false           
                this.deleteModal = false
                this.$toast.success({
                    title: 'Success',
                    message: 'Merchant deleted successfully',
                    color: '#D6E09B'
                }) 
                this.$store.dispatch('stateReload', false)
            },
            async statusUpdate(status, merchant_id){ 
                this.loader = true
                this.$store.dispatch('stateReload', true)

                var status_update = {
                    merchant_id : merchant_id,
                    status      : status,
                }

                const response = await config.postData('/merchant/status/update', status_update)
                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.editModal = false         
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
            },
            async editCharge(merchant_id) {    
                this.loader = true
                this.merchant_id = merchant_id            
                await config.getData('/merchant/get-charges/'+ merchant_id)
                .then((response) => {
                    this.charges = response.data;  
                    this.showChargeModal = true; 
                    document.body.classList.add("modal-open");
                })
                this.loader = false          
            },
            async updateCharge(){    
                this.loader = true
                this.$store.dispatch('stateReload', true)

                const chargeList = this.charges.map(item => {
                    const merchant_idd = { merchant_id: this.merchant_id }
                    return Object.assign({}, item, merchant_idd)
                })
                this.charges = chargeList
                const response = await config.postData('/merchant/update-charges', this.charges )
                this.loader = false
                if (response.status == 201) {
                    this.$store.dispatch('commonObjLoad', true)
                    this.showChargeModal = false         
                    this.$toast.success({
                        title: 'Success',
                        message: 'Area Charges updated successfully',
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
            getStatus (status) {
                if (status == 1) {
                    return 'Pending'
                } else if (status == 2) {
                    return 'Approved'
                } else if (status == 3) {
                    return 'Incomplete'
                } else {
                    return 'Reject'
                }
            },
        }
    }
</script>
<style>
    .w-35{
        width:35px;
    }
</style>