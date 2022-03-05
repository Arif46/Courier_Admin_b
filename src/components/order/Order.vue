<template>
    <div class="content-wrapper">
        <!-- <div v-if="loader" class="page_loader"></div> -->
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-4">
                        <h1 class="m-0 text-dark">All Order</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-8">
                        <button class="btn btn-info btn-sm float-right" @click="createModal.show()"><i class="fas fa-plus-circle"></i> Create</button>
                        <button class="btn btn-warning btn-sm float-right mr-2">                                            
                            <export-excel
                                :data="dataCustomize"
                                :fields= "json_fields"
                                >
                                Excel <i class="fa fa-download"></i>
                            </export-excel>
                        </button>
                        <button class="btn btn-warning float-right btn-sm mr-2" @click="showActionPanelModal"> Action Panel</button>
                        <button class="btn btn-success float-right btn-sm mr-2" @click="bulkModal.show()"><i class="fas fa-upload"></i> Bulk Upload</button>
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
                                <form v-on:keyup.enter="searchOrder">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="contact">Contact</label>
                                                <input type="text" id="contact" v-model="search.contact" placeholder="Name, Mobile, Address" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="form-group">                                            
                                                <label for="sku">Order ID</label>
                                                <input type="text" id="sku" v-model="search.sku" placeholder="Order ID" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="form-group">                                            
                                                <label for="reference_id">Ref. ID</label>
                                                <input type="text" id="reference_id" v-model="search.reference_id" placeholder="Reference ID" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="logistic_partner_id">Logistic Partner</label>
                                                <select2 v-model="search.logistic_partner_id" placeholder="Select" :options="commonObj.logisticPartnerList"></select2>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="rider_id">Rider</label>
                                                <select2 v-model="search.rider_id" placeholder="Select" :options="commonObj.riderList"></select2>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="zone_id">Zone</label>
                                                <select2 v-model="search.zone_id" placeholder="Select" :options="commonObj.zoneList"></select2>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="merchant_id">Merchant</label>
                                                <select2 v-model="search.merchant_id" placeholder="Select" :options="commonObj.merchantList"></select2>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="date_parameter_id">Date Parameter</label>
                                                <select2 v-model="search.date_parameter_id" placeholder="Select" :options="customState.dateParameterList"></select2>                                                
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="date_type_id">Date</label>
                                                <select2 v-model="search.date_type_id" @change="dateTypeChange" placeholder="Select" :options="customState.dateTypeList"></select2>                                                
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="start_date">Start Date</label>
                                                <input type="date" id="start_date" v-model="search.start_date" class="form-control">                                                
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="end_date">End Date</label>
                                                <input type="date" id="end_date" v-model="search.end_date" class="form-control">                                                
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="payment_status">Payment Status</label>
                                                <select id="payment_status" v-model="search.payment_status" class="form-control">                                            
                                                    <option :value="0">Select</option>
                                                    <option :value="1">Due</option>
                                                    <option :value="2">In Progress</option>
                                                    <option :value="3">Paid </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="status">Status</label>
                                                <multiselect v-model="commonStatus" 
                                                    :options="customStatus" 
                                                    :multiple="true" 
                                                    group-values="libs" 
                                                    group-label="statusHead" 
                                                    :group-select="true" 
                                                    placeholder="Type to search" 
                                                    track-by="id" 
                                                    label="text"
                                                >
                                                </multiselect>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group" style="margin-bottom:0px;">
                                            <button class="btn btn-info btn-sm mr-10" type="submit" @click.prevent="showCheckbox">
                                                <i class="fa fa-check"></i> Show / Hide 
                                            </button>
                                            <label>
                                                <input type="checkbox" @click="selectAll" v-model="allSelected">
                                                <p style="display: inline-block; margin-left: 4px; font-size: 15px;">Select All | Selected Order ({{ totalSelected }} / {{ totalOrder }}) </p>
                                            </label>
                                            <button class="btn btn-info btn-sm ml-2 mr-2" type="submit" @click="showActionPanelModal"><i class="fa fa-check"></i> Take Action</button>
                                            <button class="btn btn-info btn-sm mr-2" type="submit" @click.prevent="searchOrder"><i class="fa fa-search"></i> Filter</button>                                        
                                            <button class="btn btn-warning btn-sm" @click.prevent="reload"><i class="fa fa-sync-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-12 summary">
                                        <p class="mr-10">Order : <b>{{ summary.total_order }}</b>(Completed: <b>{{ summary.completed }}</b> Incompleted: <b>{{ summary.incompleted }}</b> )</p>
                                        <p class="mr-10">Amount : <b>{{ summary.total_amount }}</b></p>
                                        <p class="mr-10">Collected : <b>{{ summary.total_collected_amount }}</b></p>
                                        <p class="mr-10">Service Charge : <b>{{ summary.total_service_charge }}</b></p>
                                        <p class="mr-10">COD Charge : <b>{{ summary.total_cod }}</b></p>
                                        <p class="mr-10">Area Charge : <b>{{ summary.total_area_charge }}</b></p>                                        
                                        <p class="mr-10">Weight Charge : <b>{{ summary.total_weight_charge }}</b></p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table id="orderTable" class="table table-bordered table-sm">
                                    <thead style="width:100%">
                                        <tr>
                                            <th style="width:10%">Order ID</th>
                                            <th style="width:10%">From</th>
                                            <th style="width:10%">To</th>
                                            <th style="width:15%">Address</th>
                                            <th style="width:8%">Date</th>
                                            <th style="width:10%">Instruction</th>
                                            <th style="width:7%">Amount</th>
                                            <th style="width:10%">Rider</th>
                                            <th style="width:9%">Status</th>     
                                            <th style="width:6%">Payment</th>     
                                            <th style="width:5%">Action</th>                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(order,key) in orders" :key="key">
                                            <td style="width:10%">
                                                <label>
                                                    <input v-if="isSelected" v-model="ordersData" @click="select(order)" :value="order" type="checkbox" class="order-checkbox" />
                                                    <p>{{ order.sku }}</p>
                                                </label>
                                            </td>
                                            <td style="width:10%" @click="editModal(key, order)">{{ order.merchant_name }}</td>
                                            <td style="width:10%">{{ order.contact_name }} <br/> {{ order.contact_mobile }}</td>
                                            <td style="width:15%">{{ order.delivery_address }}</td>
                                            <td style="width:8%">{{ order.date }}</td>
                                            <td style="width:10%">{{ order.delivery_instruction }}</td>
                                            <td style="width:7%">{{ order.price }}</td>
                                            <td style="width:10%">{{ order.rider_name }} <br> {{ order.rider_phone }}</td>
                                            <td style="width:9%"><span :class="'status-'+order.status">{{ getStatus(order.status) }}</span></td>                                         
                                            <td style="width:6%"><span :class="'payment-status-'+order.payment_status">{{ getPaymentStatus(order.payment_status) }}</span></td>                                         
                                            <td style="width:5%" class="text-center">
                                                <button class="btn btn-danger btn-sm mr-1" v-if="$can('Order Delete')"  @click="deleteOrder(key, order.id)" title="Delete"><i class="fas fa-trash"></i></button>
                                                <button v-if="order.issue_order_id != null && order.issue_reply == 1" class="btn btn-warning btn-sm" @click="showIssue(order)" title="Issue"><i class="fas fa-question"></i></button>
                                            </td>
                                        </tr>
                                        <infineLoading v-if="spinner" @distance="1" @infinite="loadData"></infineLoading>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <div ref="orderCreateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <CreateOrder :createModal="createModal"></CreateOrder>
        </div>
        <div ref="bulkUploadModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <BulkUpload :bulkModal="bulkModal" :merchantList="commonObj.merchantList"></BulkUpload>
        </div>

        <div ref="orderIssueModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <Issue :issueModal="issueModal" :issue="issue"></Issue>
        </div>

        <div v-if="orderEditModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Order</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="heading1" style="padding:0px">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse1" aria-controls="collapseOne">
                                            Edit
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="delivery_type">Delivery Type <span class="text-danger" title="Required">*</span></label>
                                                    <select id="delivery_type" v-model="form_edit.delivery_type" class="form-control select2" required>
                                                        <option :value="1">Express Delivery(24hr)</option>
                                                        <option :value="2">Bullet Delivery(6hr)</option>
                                                        <option :value="3">Special Offer</option>
                                                    </select>
                                                    <span class="text-danger" v-if="errors.delivery_type">{{ errors.delivery_type[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="service_charge">Service Charge <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="service_charge" v-model.number="form_edit.service_charge" class="form-control" placeholder="Service Charge" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                                                    <span class="text-danger" v-if="errors.service_charge">{{ errors.service_charge[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="weight_charge">Weight Charge <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="weight_charge" v-model.number="form_edit.weight_charge" class="form-control" value="1" required>
                                                    <span class="text-danger" v-if="errors.cod">{{ errors.cod[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="area_charge">Area Charge <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="area_charge" v-model="form_edit.area_charge" class="form-control" required>
                                                    <span class="text-danger" v-if="errors.area_charge">{{ errors.area_charge[0] }}</span>
                                                </div>
                                            </div> 
                                        </div> 
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Status</label>
                                                    <select id="status" v-model="form_edit.status" @change="statusChange($event)" class="form-control">                                            
                                                        <option v-for="(status,index) in customState.statusList" :key="index" :value="status.id">{{ status.text }}</option>
                                                    </select>
                                                    <span class="text-danger" v-if="errors.status">{{ errors.status[0] }}</span>
                                                </div>
                                            </div> 
                                            <div class="col-4" v-if="isRescheduleDate">
                                                <div class="form-group">
                                                    <label for="reschedule_date">Reschedule Date</label>        
                                                    <input type="date" v-model="form_edit.reschedule_date" class="form-control" />
                                                    <span class="text-danger" v-if="errors.reschedule_date">{{ errors.reschedule_date[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-4" v-if="isReason">
                                                <div class="form-group">
                                                    <label for="reason">Reason</label>        
                                                    <input type="text" v-model="form_edit.reason" class="form-control"/>
                                                    <span class="text-danger" v-if="errors.reason">{{ errors.reason[0] }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="name">Merchant</label>
                                                    <select2 v-model="form_edit.merchant_id" :options="commonObj.merchantList"></select2>
                                                    <input type="hidden" v-model="form_edit.id" />
                                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="area_id">Area <span class="text-danger" title="Required">*</span></label>
                                                    <select id="area_id" class="form-control select2" required>                                        
                                                        <option v-for="area in commonObj.areaList" :key="area.id" :value="area.id">{{ area.text }}</option>
                                                    </select>
                                                    <span class="text-danger" v-if="errors.zone_id">{{ errors.zone_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="zone_id">Zone <span class="text-danger" title="Required">*</span></label>
                                                    <select2 ref="zone_id" v-model="form_edit.zone_id" :options="commonObj.zoneList"></select2>
                                                    <span class="text-danger" v-if="errors.zone_id">{{ errors.zone_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="weight">Weight(kg) </label>
                                                    <select2 v-model="form_edit.weight"  @change="changeWeight($event)" :options="commonObj.weightChargeList"></select2>
                                                    <span class="text-danger" v-if="errors.weight">{{ errors.weight[0] }}</span>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="row">  
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="contact_name">Contact Name <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="contact_name" v-model="form_edit.contact_name" class="form-control" placeholder="Contact Name" required>
                                                    <span class="text-danger" v-if="errors.contact_name">{{ errors.contact_name[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label for="contact_mobile">Contact Mobile <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="contact_mobile" v-model="form_edit.contact_mobile" class="form-control" placeholder="Contact Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                                                    <span class="text-danger" v-if="errors.contact_mobile">{{ errors.contact_mobile[0] }}</span>
                                                </div>
                                            </div>          
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="delivery_address">Delivery Address <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="delivery_address" v-model="form_edit.delivery_address" class="form-control" placeholder="Delivery Address" required>
                                                    <span class="text-danger" v-if="errors.delivery_address">{{ errors.delivery_address[0] }}</span>
                                                </div>
                                            </div>   
                                        </div>
                                        <div class="row">                      
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label for="price">Price <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="price" v-model.number="form_edit.price" class="form-control" placeholder="Price" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>                                
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label for="collected_amount">Collected <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="collected_amount" v-model.number="form_edit.collected_amount" class="form-control" placeholder="Collected Amount" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>                                
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="delivery_instruction">Delivery Instruction </label>
                                                    <input type="text" id="delivery_instruction" v-model="form_edit.delivery_instruction" class="form-control" placeholder="Delivery Instruction">
                                                    <span class="text-danger" v-if="errors.delivery_instruction">{{ errors.delivery_instruction[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label for="reference_id">Reference ID </label>
                                                    <input type="text" id="reference_id" v-model="form_edit.reference_id" class="form-control" placeholder="Ex: XYZ1000">
                                                    <span class="text-danger" v-if="errors.reference_id">{{ errors.reference_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                                    <input type="date" id="date" v-model="form_edit.date" class="form-control" required>
                                                    <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                                </div>
                                            </div>
                                        </div>  
                                        <div class="row">
                                            <div class="col-9">
                                                <div class="form-group">
                                                    <label for="description">Product Description </label>
                                                    <textarea type="text" id="description" v-model="form_edit.description" class="form-control" placeholder="Description Maximum 200 Character"></textarea>
                                                    <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="category_id">Category <span class="text-danger" title="Required">*</span></label>
                                                    <select2 v-model="form_edit.category_id" :options="customState.categoryList"></select2>
                                                    <span class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <button type="button" class="btn btn-info btn-sm" @click.prevent="updateOrder">Update</button>
                                            </div>
                                        </div>                                      
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="heading2" style="padding:0px">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapseOne">
                                            Others
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapse2" class="collapse show" aria-labelledby="heading2" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Zone</label>
                                                    <select2 v-model="form_edit.zone_id" placeholder="Select" :options="commonObj.zoneList" @change="singleAction(form_edit.id, $event, 1)"></select2>
                                                    <input type="hidden" v-model="form_edit.id" />
                                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Payment Status</label>
                                                    <select id="payment_status" v-model="form_edit.payment_status" @change="singleAction(form_edit.id, $event, 2)" class="form-control">
                                                        <option :value="1">Due</option>
                                                        <option :value="2">Processing</option>
                                                        <option :value="3">Paid</option>
                                                    </select>
                                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Status</label>
                                                    <select id="status" v-model="form_edit.status"  @change="singleAction(form_edit.id, $event, 3)" class="form-control">                                            
                                                        <option :value="0">Select</option>
                                                        <option :value="1">Requesting</option>
                                                        <option :value="2">Picked Up</option>
                                                        <option :value="3">Accepted </option>
                                                        <option :value="4">Assign</option>
                                                        <option :value="5">On Way </option>
                                                        <option :value="6">Done</option>
                                                        <option :value="11">Exchange</option>
                                                        <option :value="12">Hold</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Rider</label>
                                                    <select2 v-model="form_edit.rider_id" placeholder="Select" :options="commonObj.riderList" @change="singleAction(form_edit.id, $event, 4)"></select2>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="logistic_partner_id">Logistic Partner</label>
                                                    <select2 v-model="form_edit.logistic_partner_id" placeholder="Select" :options="commonObj.logisticPartnerList" @change="singleAction(form_edit.id, $event, 5)"></select2>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group mt-4">
                                                    <button class="btn btn-success btn-sm mr-2" @click="printPos">
                                                        POS <i class="fa fa-print"></i>
                                                    </button>
                                                    <button class="btn btn-warning btn-sm mr-2" @click="actionPanelOrderToPdf"> 
                                                        A4 <i class="fa fa-print"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="name">Order Activity</label>
                                                    <table class="table table-bordered table-sm">
                                                        <tr>
                                                            <th>Action By</th>
                                                            <th>Action</th>
                                                            <th>Date & Time</th>
                                                        </tr>
                                                        <tr v-for="(log, index) in order_logs" :key="index">
                                                            <td>{{ log.user_name }}</td>
                                                            <td>{{ log.operation }}</td>
                                                            <td>{{ log.date | dateformat }} at {{ log.date | timeformat }}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="name">Payment Details</label>
                                                    <table class="table table-bordered table-sm">
                                                        <tr>
                                                            <th>Amount</th>
                                                            <td>{{ form_edit.price }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Collected </th>
                                                            <td>{{ form_edit.collected_amount }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Service Charge</th>
                                                            <td>{{ form_edit.service_charge }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Area Charge</th>
                                                            <td>{{ form_edit.area_charge }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Weight Charge</th>
                                                            <td>{{ form_edit.weight_charge }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>COD Charge</th>
                                                            <td>{{ form_edit.status > 5 ? form_edit.cod : 0 }}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="name">Order Information</label>
                                                    <table class="table table-bordered table-sm">
                                                        <tr>
                                                            <th>Order ID : {{ form_edit.sku }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Reference ID : {{ form_edit.reference_id }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Name : {{ form_edit.contact_name }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Mobile : {{ form_edit.contact_mobile }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Address : {{ form_edit.delivery_address }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Instruction : {{ form_edit.delivery_instruction }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Deadline : {{ form_edit.date }}</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Amount : {{ form_edit.price }}</th>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>

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
                        <button type="button" class="btn btn-info" @click="destroyOrder">Delete</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="actionPanelModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Rapid Action on Order</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">                        
                            <input type="text" class="form-control" v-model="barcode.sku" @keyup.enter="keepOrder" placeholder="Scan barcode or type order id and press enter"/>
                        </div>
                        <div class="form-group"> 
                            <span v-for="(order, index) in orderList" :key="index" class="btn btn-sm btn-warning mb-1 mr-1">
                                {{ order }}<i class="ml-1 fas fa-times" @click="removeRow(index)"></i> 
                            </span>
                        </div>
                        <div class="form-group">   
                            <h6> 
                                Total : <b>{{ orderList.length != 0 ? orderList.length : this.totalSelected }}</b>                            
                                <button class="ml-1 btn btn-default btn-sm" @click="scanDone" v-if="isScan">Scan/Select Done <i class="fa fa-check"></i></button>
                                <slot v-if="loading">
                                    <div class="ml-1 spinner-border spinner-border-sm text-success" role="status"></div>
                                </slot>
                                <slot v-else>
                                    <button class="ml-1 btn btn-warning btn-sm" @click="printPos">POS <i class="fa fa-print"></i></button>
                                    <button class="ml-1 btn btn-success btn-sm" @click="actionPanelOrderToPdf">PDF <i class="fa fa-download"></i></button>
                                    <button class="ml-1 btn btn-success btn-sm">
                                        <export-excel
                                            :data="dataCustomize"
                                            :fields= "json_fields"
                                            >
                                            Excel <i class="fa fa-download"></i>
                                        </export-excel>
                                    </button>
                                    <button class="ml-1 btn btn-info btn-sm" @click="bulkAction">Submit</button>
                                    <button class="ml-1 btn btn-danger btn-sm" @click="cancelModal">Cancel</button>
                                </slot>
                            </h6>                        
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Rider Assign</label>
                                    <select2 v-model="bulk.rider_id" placeholder="Select" :options="commonObj.riderList"></select2>
                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                </div>   
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="status">Status </label>                        
                                    <select class="form-control" v-model="bulk.status">
                                        <option v-for="(status, index) in customState.statusList" :key="index" :value="status.id">{{ status.text }}</option>
                                    </select>
                                    <input type="hidden" v-model="status.key">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="status">Merchant</label>   
                                    <select2 v-model="bulk.merchant_id" :options="commonObj.merchantList"></select2> 
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="status">Logistic Partner</label>   
                                    <select2 v-model="bulk.logistic_partner_id" :options="commonObj.logisticPartnerList"></select2> 
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="status">Hub</label>   
                                    <select2 v-model="bulk.hub_id" :options="commonObj.hubList"></select2> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->

        <div style="display:none">
            <table id="exportPdfTableHeader" class="table table-bordered">
                <thead>
                    <tr>
                        <td>
                            <span>Email: support@bahokcourier.com</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Statement: {{ this.search.start_date | dateformat }} - {{ this.search.end_date | dateformat }}; Date Parameter: {{ getDateParameter(this.search.date_parameter_id) }}; {{ this.search.merchant_id != 0 ? 'Merchant : ' + getMerchantName(this.search.merchant_id) : '' }} {{ this.search.rider_id != 0 ? 'Rider : ' + getRiderName(this.search.rider_id) : '' }}</td>
                        <td style="text-align:right">Total Order: {{ totalSelected }}</td>
                    </tr>
                </thead>
            </table>
            <table id="exportPdfTable" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Order Info</th>
                        <th>Merchant</th>
                        <th>Contact Name & Number</th>
                        <th>Contact Address</th>
                        <th>Area</th>
                        <th>Amount</th>
                        <th>Collected</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Instruction/Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order,key) in printorders" :key="key">
                        <td>
                            <img :src="generateBarcode(order.id)" />
                        </td>
                        <td>
                            ID: {{ order.sku }} <br/>
                            Date: {{ order.date }}
                            Ref: {{ order.reference_id }}
                        </td>
                        <td>
                            {{ order.merchant_name }}<br/>
                            {{ order.merchant_mobile }}
                        </td>
                        <td>
                            {{ order.contact_name }} <br/>
                            {{ order.contact_mobile }}
                        </td>
                        <td>{{ order.delivery_address }}</td>
                        <td>
                            {{ order.rider_name }}<br/>
                            {{ order.zone_name }}<br/>
                            {{ order.rider_phone }}
                        </td>
                        <td>{{ order.price }}</td>               
                        <td>{{ order.collected_amount }}</td> 
                        <td>{{ order.status }}</td>
                        <td>{{ order.payment_status }}</td>
                        <td>{{ order.delivery_instruction }} {{ order.reason != null ? '/' + order.reason : '' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="printSection" style="display:none">
            <div id="invoicePOS">
                <table class="table" v-for="(printorder,index) in printorders" :key="index" style="margin-left:-10px; width:160px; height:250px;font-family: sans-serif;font-size:10px;page-break-after:always;">
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <div class="login-logo"><img style="width: 50px;height:30px" :src="'./images/logo.png'"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;"><b>Bahok.com</b></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;"><b>Order Description</b></td>
                    </tr>
                    <tr>
                        <th style="float:left">Date: </th><td>{{ printorder.date }}</td>
                    </tr>
                    <tr>
                        <th style="float:left">Ref: </th><td>{{ printorder.reference_id }}</td>
                    </tr>
                    <tr>
                        <th style="float:left">Order ID: </th><td>{{ printorder.sku }}</td>
                    </tr>
                    <tr>
                        <th style="float:left">Area: </th><td>{{ printorder.zone_name }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center; border-bottom: 1px dashed; border-top: 1px dashed; padding:3px 0px;">
                            <img :src="generateBarcode(printorder.id)" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><b>Customer Details:</b></td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ printorder.contact_name }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ printorder.contact_mobile }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ printorder.delivery_address }}</td>
                    </tr>
                    <tr style="margin-top:5px;">
                        <td colspan="2" style="border-top:1px solid"><b>Delivery Instruction:</b></td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ printorder.delivery_instruction }}</td>
                    </tr>
                    <tr style="margin-top:5px;">
                        <td colspan="2" style="border-top:1px solid"><b>Merchant Details:</b></td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ printorder.merchant_name }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border-bottom:1px solid">{{ printorder.merchant_mobile }}</td>
                    </tr>
                    <tr>
                        <th style="float:left">Total</th><td>{{ printorder.price }} BDT</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center; border-top:1px solid">This is an auto generated report of</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">Bahok.com</td>
                    </tr>
                </table>
            </div>
            <!--End Invoice-->
        </div>
    </div>
</template>
<script>
    import infineLoading from 'vue-infinite-loading'
    import Multiselect from 'vue-multiselect'
    import config from '@/config'
    import jsPDF from 'jspdf'
    import JsBarcode from 'jsbarcode'    
    import moment from 'moment'
    import 'jspdf-autotable'
    // import VueBarcode from 'vue-barcode'
    import Select2 from 'v-select2-component'
    import { Modal } from 'bootstrap'
    import CreateOrder from './Create.vue'
    import BulkUpload from './BulkUpload.vue'
    import Issue from './Issue.vue'
    const excelColumn = {
        'Order ID': 'order_id',
        'SKU': 'order_sku',
        'Merchant': 'order_merchant_name',
        'Reference ID': 'order_reference_id',
        'Contact Name': 'order_contact_name',
        'Contact Number': 'order_contact_number',
        'Address': 'order_address',
        'Date': 'order_date',
        'Assign Date': 'order_assign_date',
        'Amount': 'order_amount',
        'Collected Amount': 'order_collected_amount',
        'Rider': 'order_rider_name',
        'Status': 'order_status'
    }
    export default {
        name:'Order',
        components: {
            // 'barcode': VueBarcode,
            'select2': Select2,
            infineLoading: infineLoading,
            Multiselect: Multiselect,
            CreateOrder: CreateOrder,
            BulkUpload: BulkUpload,
            Issue: Issue
        },
        data(){
            return {
                commonStatus: [],
                customStatus: [
                    {
                        statusHead: 'Complete',
                        libs: [
                            { text: 'Done', id: 6 },
                            { text: 'Return', id: 8 },
                            { text: 'Cancel', id: 9 },
                            { text: 'Partial', id: 10 },
                            { text: 'Exchange', id: 11 }
                        ]
                    },
                    {
                        statusHead: 'Incomplete',
                        libs: [
                            { text: 'Requesting', id: 1 },
                            { text: 'Picked Up', id: 2 },
                            { text: 'Accepted', id: 3 },
                            { text: 'Assign', id: 4 },
                            { text: 'On Way', id: 5 },
                            { text: 'Reschedule', id: 7 },
                            { text: 'Hold', id: 12 }
                        ]
                    }
                ],
                spinner: true,
                loader: true, 
                loading: false,
                isScan: false,
                isSelected: true,
                selected: [],
                allSelected: false,
                ordersData: [],
                summary: '',
                order_logs: '',
                zones:[],
                orders:[],
                totalOrder: 0,
                order_id: '',
                printorders:[],
                barcode:{
                    sku: ''
                },
                orderList: [],
                page: 1,
                search:{
                    isSearch    : 0,
                    contact     : '',
                    sku         : '',
                    reference_id: '',
                    merchant_id : 0,
                    rider_id    : 0,
                    logistic_partner_id : 0,
                    zone_id        : 0,
                    payment_status : 0,
                    status         : '',
                    date_parameter_id  : 2,
                    date_type_id  : 3,
                    start_date    : moment().subtract(31,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD')
                },
                form_edit:'',
                errors:[],
                createModal: 0,
                bulkModal: 0,
                issueModal: 0,
                issue: '',
                orderEditModal:false,
                deleteModal:false,
                actionPanelModal:false,
                zone_id:'',
                rider_id: 0,
                bulk:{
                    order_ids: [],
                    status: 0,
                    merchant_id: 0,
                    rider_id: 0,
                    logistic_partner_id: 0,
                    hub_id: 0
                },
                status:{
                    key: '',
                    sku: '',
                    status: '',
                    collected_amount: 0,
                    reason:' ',
                    reason_id: 0,
                },
                isRescheduleDate: false,
                isReason: false,
                selected_rows: [],
                totalSelected: 0,
                takeAction: true,
                key:''
            }
        },
        watch: {
            stateReload: function (newVal) {
                if (newVal) {
                    this.searchOrder()
                }
            },
            'form_edit.zone_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getServiceCharge()
                }
            },
            'form_edit.area_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getZones()
                }
            }
        },
        created(){
            if (this.$route.query) {
                Object.assign(this.search, this.$route.query)
            }
            this.loadData();
        },
        mounted() {
            this.createModal = new Modal(this.$refs.orderCreateModal)
            this.bulkModal = new Modal(this.$refs.bulkUploadModal)
            this.issueModal = new Modal(this.$refs.orderIssueModal)
        },
        computed : {
            stateReload () {
                return this.$store.state.stateReload
            },
            customState () {
                return this.$store.state
            },
            commonObj () {
                return this.$store.state.commonObj
            },
            json_fields: function () {
                return excelColumn
            },
            dataCustomize () {
                if (this.printorders.length > 0) {
                    this.printorders.map(item => {
                        item.order_id = item.id
                        item.order_sku = item.sku,
                        item.order_merchant_name= item.merchant_name,
                        item.order_reference_id= item.reference_id,
                        item.order_contact_name= item.contact_name,
                        item.order_contact_number= item.contact_mobile,
                        item.order_address= item.delivery_address,
                        item.order_date= item.date,
                        item.order_assign_date= item.assign_date,
                        item.order_amount= item.price,
                        item.order_collected_amount= item.collected_amount,
                        item.order_rider_name= item.rider_name,
                        item.order_status= this.getStatus(item.status)

                        return Object.assign({}, item)
                    })
                    return this.printorders
                } else if (this.orders.length > 0) {
                    this.orders.map(item => {
                        item.order_id = item.id
                        item.order_sku = item.sku,
                        item.order_merchant_name= item.merchant_name,
                        item.order_reference_id= item.reference_id,
                        item.order_contact_name= item.contact_name,
                        item.order_contact_number= item.contact_mobile,
                        item.order_address= item.delivery_address,
                        item.order_date= item.date,
                        item.order_assign_date= item.assign_date,
                        item.order_amount= item.price,
                        item.order_collected_amount= item.collected_amount,
                        item.order_rider_name= item.rider_name,
                        item.order_status= this.getStatus(item.status)

                        return Object.assign({}, item)
                    })
                    return this.orders
                } else {
                    return []
                }
            }
        },
        methods:{
            dateTypeChange () {
                const dateTypeId = this.search.date_type_id
                if (dateTypeId == 1) {
                    this.search.start_date = this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 2) {
                    this.search.start_date = this.search.end_date = moment().subtract(1,'d').format('YYYY-MM-DD')
                } else if (dateTypeId == 3) {
                    this.search.start_date = moment().subtract(31,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 4) {
                    this.search.start_date = moment().subtract(180,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 5) {
                    this.search.start_date = moment().subtract(365,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                }
            },
            reload () {
                this.commonStatus = []
                this.search = Object.assign({}, {
                    isSearch    : 0,
                    contact     : '',
                    sku         : '',
                    reference_id: '',
                    merchant_id : 0,
                    rider_id    : 0,
                    logistic_partner_id : 0,
                    zone_id     : 0,
                    payment_status : 0,
                    status      : [],
                    date_parameter_id  : 2,
                    date_type_id  : 3,
                    start_date : moment().subtract(31,'d').format('YYYY-MM-DD'),
                    end_date : moment().format('YYYY-MM-DD')
                })
                this.orderList = this.ordersData = this.printorders = []
                this.totalSelected = 0
            },
            showCheckbox () {
                this.isSelected = !this.isSelected;
            },
            selectAll: function() {   
                this.takeAction = false                
                this.ordersData = [];
                this.orderList = [];
                if (!this.allSelected) {
                    for (var order in this.orders) {
                        this.ordersData.push(this.orders[order])
                        this.orderList.push(this.orders[order].id);
                    }
                    this.totalSelected = this.orderList.length
                } else {
                    this.totalSelected = 0
                }
            },
            select(order) {
                this.takeAction = false
                if (!this.orderList.includes(order.id)) {
                    this.orderList.push(order.id)
                } else {
                    this.orderList.splice(this.orderList.indexOf(order.id), 1)
                }     
                this.totalSelected = this.orderList.length          
                this.allSelected = false;                
            },
            generateBarcode (orderNo) {
                let canvas = document.createElement('canvas');
                JsBarcode(canvas, orderNo, { 
                    format: 'CODE39',
                    displayValue: false,
                    height: 15,
                    width: 1,
                    padding: 0,
                    margin: 0
                });
                return canvas.toDataURL('image/jpeg');
            },
            actionPanelOrderToPdf() {
                var logo = "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"
                var doc = new jsPDF('l');
                doc.page = 1;
                var totalPagesExp = "{total_pages_count_string}";
                // var pageNo = doc.internal.getNumberOfPages();
                var header = function (data) {
                    doc.addImage(logo, 'JPEG', data.settings.margin.left, 0, 30, 30);
                };
                
                var footer = function (data) {
                    var str = "Page " + data.pageCount;
                    if (typeof doc.putTotalPages === 'function') {
                        str = str + " of " + totalPagesExp;
                    }
                    doc.setFontSize(7)
                    doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
                };

                doc.autoTable({
                    html: '#exportPdfTableHeader', 
                    tableWidth: 'auto',
                    theme: 'plain',
                    cellWidth: 'wrap',
                    tableLineColor: 200,
                    headStyles: {
                        fontSize: 11
                    },
                    startY: 35, //margin top value only for the first page
                    styles: {
                        cellWidth: 'wrap',
                        fontSize: 7,
                        fontStyle: 'normal',
                        textColor: 'black'
                    },
                    didDrawPage: header
                });

                doc.autoTable({
                    html: '#exportPdfTable', 
                    tableWidth: 'auto',
                    theme: 'grid',
                    cellWidth: 'wrap',
                    tableLineColor: 200,
                    headStyles: {
                        fillColor: [216, 216, 216],
                        fontSize: 8
                    },
                    columnStyles: {
                        0: {cellWidth: 44},
                        1: {cellWidth: 27},
                        2: {cellWidth: 25},
                        3: {cellWidth: 28},
                        4: {cellWidth: 40},
                        5: {cellWidth: 25},
                        6: {cellWidth: 13},
                        7: {cellWidth: 16},
                        8: {cellWidth: 16},
                        9: {cellWidth: 16},
                        10: {cellWidth: 28}
                    },
                    startY: 52, //margin top value only for the first page
                    styles: {
                        overflow: 'linebreak',
                        cellWidth: 'wrap',
                        fontSize: 7,
                        fontStyle: 'normal',
                        overflowColumns: 'linebreak',
                        border: 1,
                        valign : 'middle',
                        cellPadding : 1.7,
                        textColor: 'black'
                    },
                    bodyStyles: {minCellHeight: 6}, 
                    showHead: 'firstPage',
                    didDrawCell: function(data) {                                           
                        if (data.column.index === 0 && data.cell.section === 'body') {
                            var td  = data.cell.raw;
                            var img = td.getElementsByTagName('img')[0];
                            const xAxis = parseInt(data.cell.x + 2)
                            const yAxis = parseInt(data.cell.y + 3.5)
                            doc.addImage(img.src, xAxis, yAxis, 40, 6);
                        }
                    },
                    didParseCell: function(cell) {
                        var status = cell.row.raw[8].content
                        if (status == 1) {
                            cell.row.cells[8].text[0] = 'Requesting'
                            cell.row.cells[8].styles.textColor = [211,211,211]
                        } else if (status == 2) {
                            cell.row.cells[8].text[0] = 'Picked Up'
                            cell.row.cells[8].styles.textColor = [255,165,0]
                        } else if (status == 3) {
                            cell.row.cells[8].text[0] = 'Accepted'
                            cell.row.cells[8].styles.textColor = [255,0,255]
                        } else if (status == 4) {
                            cell.row.cells[8].text[0] = 'Assign'
                            cell.row.cells[8].styles.textColor = [89, 165, 216 ]
                        } else if (status == 5) {
                            cell.row.cells[8].text[0] = 'On Way'
                            cell.row.cells[8].styles.textColor = [243,198,77]
                        } else if (status == 6) {
                            cell.row.cells[8].text[0] = 'Successfull'
                            cell.row.cells[8].styles.textColor = [0,128,0]
                        } else if (status == 7) {
                            cell.row.cells[8].text[0] = 'Reschedule'
                            cell.row.cells[8].styles.textColor = [51,51,255]
                        } else if (status == 8) {
                            cell.row.cells[8].text[0] = 'Return'
                            cell.row.cells[8].styles.textColor = [128,0,128]
                        } else if (status == 9) {
                            cell.row.cells[8].text[0] = 'Cancel'
                            cell.row.cells[8].styles.textColor = [255,0,0]
                        } else if (status == 10) {
                            cell.row.cells[8].text[0] = 'Partial Complete'
                            cell.row.cells[8].styles.textColor = [0,255,128]
                        } else if (status == 11) {
                            cell.row.cells[8].text[0] = 'Exchange'
                            cell.row.cells[8].styles.textColor = [65,94,82]
                        } else if (status == 12) {
                            cell.row.cells[8].text[0] = 'Hold'
                            cell.row.cells[8].styles.textColor = [0,0,0]
                        }

                        var paymentStatus = cell.row.raw[9].content
                        if (paymentStatus == 1) {
                            cell.row.cells[9].text[0] = 'Due'
                            cell.row.cells[9].styles.textColor = [211,211,211]
                        } else if (paymentStatus == 2) {
                            cell.row.cells[9].text[0] = 'In Progress'
                            cell.row.cells[9].styles.textColor = [0,255,128]
                        } else if (paymentStatus == 3) {
                            cell.row.cells[9].text[0] = 'Paid'
                            cell.row.cells[9].styles.textColor = [0,128,0]
                        }
                    },
                    didDrawPage: footer
                });

                if (typeof doc.putTotalPages === 'function') {
                    doc.putTotalPages(totalPagesExp);
                }

                doc.save("Order.pdf");
            },
            getStatus (status) {
                const tmpStatus = this.customState.statusList.find(tmp => tmp.id == status)
                return tmpStatus.text
            },
            getPaymentStatus (paymentStatus) {
                if (paymentStatus === 1) {
                    return 'Due'
                } else if (paymentStatus === 2) {
                    return 'In Progress'
                } else if (paymentStatus === 3) {
                    return 'Paid'
                }
            },
            searchOrder() {
                this.search.isSearch = 1
                this.totalOrder = 0
                this.orders = []
                this.page = 1
                if (this.commonStatus.length > 0) {
                    const tmpStatusList = []
                    this.commonStatus.map(item => {
                        tmpStatusList.push(item.id)
                    })
                    Object.assign(this.search, { status: tmpStatusList })
                } else {
                    Object.assign(this.search, { status: [] })
                }
                this.loadData()
            },
            loadData($state) {
                this.loader = false
                let vm = this;
                const params = Object.assign({}, this.search, { page: this.page })
                config.getData('order', params)
                .then(res => {
                    return res
                }).then(response => {
                    this.summary = response.summary 
                    this.totalOrder += response.data.data.length
                    response.data.data.map(item => {
                        vm.orders.push(item)
                    })
                    if (this.summary.total_order != this.orders.length) {
                        this.spinner = true
                        $state.loaded()
                    } else {
                        this.spinner = false
                    }
                });
 
                this.page = this.page + 1;
            },
            changeWeight(weightChargeId){
                const tmpCharge = this.commonObj.weightChargeList.find(charge => charge.id == weightChargeId)
                this.form_edit.weight_charge = tmpCharge.charge
            },
            editModal (index, order){
                document.body.classList.add("modal-open");
                this.printorders = []
                this.printorders.push(order)
                this.isRescheduleDate = order.reschedule_date != null ? true : false
                this.isReason = order.reason != null ? true : false
                this.form_edit = order
                this.key = index
                this.orderEditModal = true   
                this.order_logs = ''                         
                this.orderLog(order)
            },
            updateOrder () {
                this.$store.dispatch('stateReload', true)
                config.postData('/order/update', this.form_edit)
                .then((response) => {
                    if(response.status == 201){                    
                        this.isReason = this.isRescheduleDate = false
                        this.orderEditModal = false
                        this.$toast.success('Order Updated') 
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
                this.orderEditModal = this.deleteModal = this.actionPanelModal = false;
                this.isReason = this.isRescheduleDate = this.isScan = false;
                this.allSelected = false
                this.barcode.sku = ''
                this.totalSelected = 0
                this.printorders = []
                this.ordersData = []
                this.orderList = []   
                this.bulk.rider_id = this.bulk.status = this.bulk.merchant_id = this.bulk.logistic_partner_id = this.bulk.hub_id = 0
            },
            deleteOrder(key, order_id){
                this.order_id = order_id;
                this.key = key;
                this.deleteModal = true;
            },
            destroyOrder(){
                config.deleteData('/order/destroy/'+ this.order_id)
                .then(() => {
                    this.orders.splice(this.key, 1);
                    this.deleteModal = false;
                    this.$toast.success('Order deleted successfully')   
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            bulkAction(){  
                if (this.orderList.length > 0) {
                    const orderIdList = this.orderList.filter(val => (val !== undefined) && (val !== null));                     
                    this.bulk.order_ids = []         
                    this.bulk.order_ids = orderIdList
                }
                const skuList = this.barcode.sku.split(" ")
                if (!this.isScan && skuList.length > 0) {
                    skuList.forEach((value) => {
                        const orderId = value.split("-")[2]
                        this.bulk.order_ids.push(orderId)
                    })
                }
                this.loader = true
                config.postData('/order/bulk-action', this.bulk)
                .then((response) => { 
                    if(response.status == 201){   
                        this.$toast.success('Success') 
                        this.orders = response.data 
                        this.bulk.status = this.bulk.merchant_id = this.bulk.rider_id =  this.bulk.logistic_partner_id =  this.bulk.hub_id = 0,
                        this.pages.push(1);
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                    this.loader = false
                })
                .catch((error) => {
                    this.loader = false
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            showActionPanelModal () {
                this.isScan = true
                this.actionPanelModal = true;
            },
            keepOrder() { 
                let skuList = this.barcode.sku.split(" ")
                if(skuList.length > 1) {
                    skuList.map(item => {
                        this.orderList.push(item);
                    })
                } else {
                    this.orderList.push(this.barcode.sku); 
                }
                this.isScan = true  
                this.barcode.sku = ''
            },
            async scanDone () {
                this.loading = true
                const response = await config.postData('/order/scaned-order', { 'order_ids': this.orderList })                              
                this.loading = false                                          
                this.isScan = false                                          
                if (response.status === 200) {                                           
                    this.printorders = response.data;
                } else {
                    this.$toast.error('Order not found') 
                }
            },
            removeRow(index){
                this.isScan = true
                this.orderList.splice(index, 1)
            },
            printPos() {
                this.$htmlToPaper("printSection");
            },
            orderLog (order) {
                config.getData('/order/order-log/'+ order.id)
                .then((response) => {
                    this.order_logs = response.data;   
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            statusChange (event) {
                var status = event.target.value
                if (status == 7) {
                    this.isRescheduleDate = true;
                    this.isReason = true;
                } else if (status >= 8) {
                    this.isReason = true;
                    this.isRescheduleDate = false
                }
            },
            async singleAction (orderId, event, actionType) {
                this.loader = true
                var actionId = 0
                if (actionType == 1 || actionType == 4 || actionType == 5) {
                    actionId = event
                } else if (actionType == 2) {
                    actionId = event.target.value
                } else if (actionType == 3) {
                    actionId = event.target.value
                }
                const formData = Object.assign({
                    order_id: parseInt(orderId),
                    action_id: parseInt(actionId),
                    action_type: parseInt(actionType)
                })
                await config.postData('/order/single-action', formData)
                .then((response) => {         
                    this.loader = false           
                    if (response.status == 200) {
                        this.form_edit = response.data
                        this.order_logs = response.logs
                        this.$toast.success({
                            title: 'Success',
                            message: 'Action submitted successfully',
                            color: '#D6E09B'
                        })
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                });
            },
            getDateParameter (dateParameterId) {
                const dateParameter = this.customState.dateParameterList.find(param => param.id == dateParameterId)
                return dateParameter.text
            },
            getRiderName (riderId) {
                const rider = this.commonObj.riderList.find(rider => rider.id == riderId)
                return rider.text
            },
            getMerchantName (merchantId) {
                const merchant = this.commonObj.merchantList.find(merchant => merchant.id == merchantId)
                return merchant.text
            },
            getServiceCharge () {
                const merchantId = this.form_edit.merchant_id
                const zoneId = this.form_edit.zone_id
                const charge = this.$store.state.commonObj.serviceChargeList.find(charge => ((charge.merchant_id == merchantId) && (charge.zone_id == zoneId)))
                this.form_edit.service_charge = charge.base_charge
                this.form_edit.area_charge = charge.area_charge
            },
            getZones () {
                const areaId = this.form_edit.area_id
                const tmpZones = this.$store.state.commonObj.zoneList.find(tmp => tmp.area_id == areaId)
                this.zones = tmpZones
            },
            showIssue (tmpIssue) {
                const tmp = this.commonObj.issueList.find(iss => iss.id == tmpIssue.issue_id)
                this.issue = Object.assign(tmpIssue, { issue_title: tmp.text })
                this.issueModal.show()
            }
        }
    }
</script>
<style scoped>
    @media print{
        body {
            margin-left:-10px;
        }
    }
</style>