<template>
    <div class="content-wrapper">
        <div v-if="loader" class="page_loader"></div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-4">
                        <h1 class="m-0 text-dark">All Order</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-8">
                        <button class="btn btn-info btn-sm float-right" @click="showCreateModal"><i class="fas fa-plus-circle"></i> Create</button>
                        <button class="btn btn-warning btn-sm float-right mr-2">                                            
                            <export-excel
                                :data="dataCustomize"
                                :fields= "json_fields"
                                >
                                Excel <i class="fa fa-download"></i>
                            </export-excel>
                        </button>
                        <!--<button class="btn btn-success btn-sm mr-2 float-right" @click="pdfDownload">
                            PDF <i class="fa fa-download"></i>
                        </button>-->
                        <button class="btn btn-warning float-right btn-sm mr-2" @click="showActionPanelModal"> Action Panel</button>
                        <button class="btn btn-success float-right btn-sm mr-2" @click="showBulkUploadModal"><i class="fas fa-upload"></i> Bulk Upload</button>
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
                                                    <option :value="2">Processing Up</option>
                                                    <option :value="3">Paid </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="status">Status</label>
                                                <multiselect v-model="search.status" 
                                                    :options="customState.statusList.map(permission => permission.id)" 
                                                    :custom-label="opt => customState.statusList.find(x => x.id == opt).text" 
                                                    :multiple="true" 
                                                    :searchable="true" 
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :show-labels="false" placeholder="Select ">
                                                </multiselect> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="row">
                                    <div class="col-md-4 checkbox-area">
                                        <div class="form-group" style="margin-bottom:0px;">
                                            <button class="btn btn-info btn-sm mr-10" type="submit" @click.prevent="showCheckbox"><i class="fa fa-check"></i> Show / Hide </button>
                                            <label >
                                                <input type="checkbox" @click="selectAll" v-model="allSelected">
                                                <p>Select All</p>
                                            </label>
                                            <button class="btn btn-info btn-sm" type="submit" @click="showActionPanelModal"><i class="fa fa-check"></i> Take Action</button>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button class="btn btn-info btn-sm" type="submit" @click.prevent="searchOrder"><i class="fa fa-search"></i> Filter</button>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button class="btn btn-warning btn-sm" @click.prevent="reload"><i class="fa fa-sync-alt"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label >
                                                <p>Selected Order ({{ totalSelected }} / {{ totalOrder }}) </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-12 summary">
                                        <p class="mr-10">Total Order : <b>{{ summary.total_order }}</b></p>
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
                                            <th style="width:15%">Status</th>     
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
                                                <img :src="generateBarcode(order.id)" style="display:none" />
                                            </td>
                                            <td style="width:10%" @click="editModal(key, order)">{{ order.merchant_name }}</td>
                                            <td style="width:10%" @click="editModal(key, order)">{{ order.contact_name }} <br/> {{ order.contact_mobile }}</td>
                                            <td style="width:15%" @click="editModal(key, order)">{{ order.delivery_address }}</td>
                                            <td style="width:8%" @click="editModal(key, order)">{{ order.date }}</td>
                                            <td style="width:10%" @click="editModal(key, order)">{{ order.delivery_instruction }}</td>
                                            <td style="width:7%" @click="editModal(key, order)">{{ order.price }}</td>
                                            <td style="width:10%" @click="editModal(key, order)">{{ order.rider_name }}</td>
                                            <td style="width:15%" @click="editModal(key, order)"><span class="label p-1" :class="'status-'+order.status">{{ getStatus(order.status) }}</span></td>                                         
                                            <td style="width:5%" class="text-center">
                                                <button class="btn btn-danger btn-sm" v-if="$can('Order Delete')"  @click="deleteOrder(key, order.id)" title="Delete"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        <infineLoading @distance="1" @infinite="getOrder"></infineLoading>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <div v-if="createModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title text-center w-100">Create New Order</h5>
                        <button type="button" class="close" aria-label="Close" @click="cancelModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <h6 class="mb-2 ml-1 text-dark text-bold">Order Information</h6>
                        </div>
                        <form v-on:keyup.enter="createOrder" ref="form">
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="delivery_type">Delivery Type <span class="text-danger" title="Required">*</span></label>
                                        <select id="delivery_type" v-model="form.delivery_type" class="form-control select2" required>
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
                                        <input type="text" id="service_charge" v-model.number="form.service_charge" class="form-control" placeholder="Service Charge" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" readonly required>
                                        <span class="text-danger" v-if="errors.service_charge">{{ errors.service_charge[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="weight_charge">Weight Charge <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="weight_charge" v-model.number="form.weight_charge" class="form-control" value="1" required readonly>
                                        <span class="text-danger" v-if="errors.cod">{{ errors.cod[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="area_charge">Area Charge <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="area_charge" v-model="form.area_charge" class="form-control" readonly required>
                                        <span class="text-danger" v-if="errors.area_charge">{{ errors.area_charge[0] }}</span>
                                    </div>
                                </div>  
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="name">Merchant</label>
                                        <select2 v-model="form.merchant_id" :options="commonObj.merchantList"></select2>
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
                                        <select2 ref="zone_id" v-model="form.zone_id" :options="commonObj.zoneList"></select2>
                                        <span class="text-danger" v-if="errors.zone_id">{{ errors.zone_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="weight">Weight(kg) </label>
                                        <select2 v-model="form.weight"  @change="changeWeight($event)" :options="commonObj.weightChargeList"></select2>
                                        <span class="text-danger" v-if="errors.weight">{{ errors.weight[0] }}</span>
                                    </div>
                                </div>                             
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="price">Price <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="price" v-model.number="form.price" class="form-control" placeholder="Price" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>                                
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="contact_name">Contact Name <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="contact_name" v-model="form.contact_name" class="form-control" placeholder="Contact Name" required>
                                        <span class="text-danger" v-if="errors.contact_name">{{ errors.contact_name[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="contact_mobile">Contact Mobile <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="contact_mobile" v-model="form.contact_mobile" class="form-control" placeholder="Contact Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                                        <span class="text-danger" v-if="errors.contact_mobile">{{ errors.contact_mobile[0] }}</span>
                                    </div>
                                </div>                   
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="delivery_address">Delivery Address <span class="text-danger" title="Required">*</span></label>
                                        <input type="text" id="delivery_address" v-model="form.delivery_address" class="form-control" placeholder="Delivery Address" required>
                                        <span class="text-danger" v-if="errors.delivery_address">{{ errors.delivery_address[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="delivery_instruction">Delivery Instruction </label>
                                        <input type="text" id="delivery_instruction" v-model="form.delivery_instruction" class="form-control" placeholder="Delivery Instruction">
                                        <span class="text-danger" v-if="errors.delivery_instruction">{{ errors.delivery_instruction[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_id">Reference ID </label>
                                        <input type="text" id="reference_id" v-model="form.reference_id" class="form-control" placeholder="Ex: XYZ1000">
                                        <span class="text-danger" v-if="errors.reference_id">{{ errors.reference_id[0] }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                        <input type="date" id="date" v-model="form.date" class="form-control" required>
                                        <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click.prevent="createOrder">Save</button>
                        <button type="button" class="btn btn-danger" @click="cancelModal">Cancel</button>
                    </div>
                </div>
            </div>
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
                                                        <option :value="0">Select</option>
                                                        <option :value="1">Requesting</option>
                                                        <option :value="2">Picked Up</option>
                                                        <option :value="3">Accepted </option>
                                                        <option :value="4">On Way </option>
                                                        <option :value="5">Done</option>
                                                        <option :value="6">Reschedule</option>
                                                        <option :value="7">Return</option>
                                                        <option :value="8">Cancel</option>
                                                        <option :value="9">Partial Complete</option>
                                                        <option :value="10">Exchange</option>
                                                        <option :value="11">Hold</option>
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
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="contact_name">Contact Name <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="contact_name" v-model="form_edit.contact_name" class="form-control" placeholder="Contact Name" required>
                                                    <span class="text-danger" v-if="errors.contact_name">{{ errors.contact_name[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="contact_mobile">Contact Mobile <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="contact_mobile" v-model="form_edit.contact_mobile" class="form-control" placeholder="Contact Mobile" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                                                    <span class="text-danger" v-if="errors.contact_mobile">{{ errors.contact_mobile[0] }}</span>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="row">                 
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="delivery_address">Delivery Address <span class="text-danger" title="Required">*</span></label>
                                                    <input type="text" id="delivery_address" v-model="form_edit.delivery_address" class="form-control" placeholder="Delivery Address" required>
                                                    <span class="text-danger" v-if="errors.delivery_address">{{ errors.delivery_address[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="delivery_instruction">Delivery Instruction </label>
                                                    <input type="text" id="delivery_instruction" v-model="form_edit.delivery_instruction" class="form-control" placeholder="Delivery Instruction">
                                                    <span class="text-danger" v-if="errors.delivery_instruction">{{ errors.delivery_instruction[0] }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="reference_id">Reference ID </label>
                                                    <input type="text" id="reference_id" v-model="form_edit.reference_id" class="form-control" placeholder="Ex: XYZ1000">
                                                    <span class="text-danger" v-if="errors.reference_id">{{ errors.reference_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="date">Date <span class="text-danger" title="Required">*</span></label>
                                                    <input type="date" id="date" v-model="form_edit.date" class="form-control" required>
                                                    <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
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
                                                    <select2 v-model="form_edit.zone_id" placeholder="Select" :options="commonObj.zoneList" @change="singleZoneChange(form_edit.id, $event)"></select2>
                                                    <input type="hidden" v-model="form_edit.id" />
                                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Payment Status</label>
                                                    <select id="payment_status" v-model="form_edit.payment_status" @change="singlePaymentStatusChange(form_edit.id, $event)" class="form-control">
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
                                                    <select id="status" v-model="form_edit.status"  @change="singleStatusChange(form_edit.id, $event)" class="form-control">                                            
                                                        <option :value="0">Select</option>
                                                        <option :value="1">Requesting</option>
                                                        <option :value="2">Picked Up</option>
                                                        <option :value="3">Accepted </option>
                                                        <option :value="4">On Way </option>
                                                        <option :value="5">Done</option>
                                                        <option :value="10">Exchange</option>
                                                        <option :value="11">Hold</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="name">Rider</label>
                                                    <select2 v-model="form_edit.rider_id" placeholder="Select" :options="commonObj.riderList" @change="singleRiderAssign(form_edit.id, $event)"></select2>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="logistic_partner_id">Logistic Partner</label>
                                                    <select2 v-model="form_edit.logistic_partner_id" placeholder="Select" :options="commonObj.logisticPartnerList" @change="singleLogisticPartnerAssign(form_edit.id, $event)"></select2>
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
                                                            <td>{{ form_edit.collected_amount * (form_edit.cod / 100 ) }}</td>
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

        <div v-if="bulkUploadModal" class="modal fade show" style="display:block" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-default" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Upload Bulk Order</h5>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="name">Merchant</label>
                                <select2 v-model="bulk_upload.merchant_id" placeholder="Select" :options="commonObj.merchantList"></select2>
                                <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label for="file">Upload File</label>
                                <input type="file" @change="onFileChange" class="form-control" accept="xlsx/*" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <a :href="this.$image_path+'uploads/excel_file/bulk_upload_format.xlsx'" class="btn btn-info btn-sm" download>Download Sample Format</a>
                        <button type="button" class="btn btn-success btn-sm" @click="bulkUpload">Upload</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="cancelModal">Cancel</button>
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
                                Total Order: <b>{{ orderList.length != 0 ? orderList.length : this.totalSelected }}</b>                            
                                <button class="ml-1 btn btn-default btn-sm" @click="scanDone" v-if="isScan">Scan/Select Done <i class="fa fa-check"></i></button>
                                <button class="ml-1 btn btn-warning btn-sm" @click="printPos">POS <i class="fa fa-print"></i></button>
                                <button class="ml-1 btn btn-success btn-sm" @click="actionPanelOrderToPdf">PDF <i class="fa fa-download"></i></button>
                                <button class="ml-1 btn btn-info btn-sm" @click="bulkAction">Submit</button>
                                <button class="ml-1 btn btn-danger btn-sm" @click="cancelModal">Cancel</button>
                            </h6>                        
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Rider Assign</label>
                                    <select2 v-model="bulk.rider_id" placeholder="Select" :options="riderList"></select2>
                                    <span class="text-danger" v-if="errors.merchant_id">{{ errors.merchant_id[0] }}</span>
                                </div>   
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="status">Status </label>                        
                                    <select class="form-control" v-model="bulk.status">
                                        <option :value="0">Select</option>
                                        <option :value="1">Requesting</option>
                                        <option :value="2">Picked Up</option>
                                        <option :value="3">Accepted </option>
                                        <option :value="4">On Way </option>
                                        <option :value="5">Done</option>
                                        <option :value="6">Reschedule</option>
                                        <option :value="8">Cancel</option>
                                        <option :value="7">Return</option>
                                        <option :value="11">Hold</option>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->

        <div style="display:none">
            <table id="exportPdfTable" class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <td colspan="10">
                            <span>Bahok.com, H-7, R-4, Senpara, Parbota, Mirpur-10; Email: bahokdelivery@gmail.com</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9">Statement: {{ this.search.start_date | dateformat }} - {{ this.search.end_date | dateformat }}; Date Parameter: {{ getDateParameter(this.search.date_parameter_id) }}; {{ this.search.merchant_id != 0 ? 'Merchant : ' + getMerchantName(this.search.merchant_id) : '' }} {{ this.search.rider_id != 0 ? 'Rider : ' + getRiderName(this.search.rider_id) : '' }}</td>
                        <td colspan="1">Total Order: {{ totalSelected }}</td>
                    </tr>
                </thead>
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
                        <th>Instruction / Reason</th>
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
                        <td><span class="label p-1" :class="'status-'+order.status">{{ getStatus(order.status) }}</span></td>
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
    import config from '../../config'
    import jsPDF from 'jspdf'
    import JsBarcode from 'jsbarcode'    
    import moment from 'moment'
    import 'jspdf-autotable'
    // import VueBarcode from 'vue-barcode'
    import Select2 from 'v-select2-component'
    import DropdownMixin from '@/mixins/dropdown'
    const excelColumn = {
        'Order ID': 'order_id',
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
        mixins: [DropdownMixin],
        components: {
            // 'barcode': VueBarcode,
            'select2': Select2,
            infineLoading: infineLoading,
            Multiselect: Multiselect
        },
        data(){
            return {
                bulk_upload: {
                    merchant_id: 0,
                    excel_file: ''
                },
                loader: true, 
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
                    status         : [],
                    date_parameter_id  : 2,
                    date_type_id  : 5,
                    start_date    : moment().subtract(31,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD')
                },
                form:{
                    merchant_id : 0,
                    logistic_partner_id : '',
                    delivery_type : 1,
                    service_charge : '',
                    zone_id : 0,
                    weight : 1,
                    weight_charge : 0,
                    area_charge : 0,
                    price : '',
                    contact_name : '',
                    contact_mobile : '',
                    delivery_address : '',
                    delivery_instruction : '',
                    date : '',
                    reference_id : '',
                },
                form_edit:'',
                errors:[],
                createModal:false,
                orderEditModal:false,
                deleteModal:false,
                statusChangeModal:false,
                actionPanelModal:false,
                bulkUploadModal:false,
                zone_id:'',
                rider_id: 0,
                bulk:{
                    order_ids: [],
                    status: 0,
                    merchant_id: 0,
                    rider_id: 0,
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
            loadingState: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.dateTypeChange()
                }
            },
            'form.zone_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getServiceCharge(1)
                }
            },
            'form.area_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getZones(1)
                }
            },
            'form_edit.zone_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getServiceCharge(2)
                }
            },
            'form_edit.area_id': function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getZones(2)
                }
            }
        },
        created(){
            this.getOrder();
        },
        computed : {
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
                const orderList = this.orders
                if (orderList) {
                    orderList.map(item => {
                        item.order_date = item.date
                        item.order_id = item.sku,
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
                    return orderList
                } else {
                    return []
                }
            }
        },
        methods:{
            dateTypeChange () {
                const dateTypeId = this.search.date_type_id
                if (dateTypeId == 1) {
                    this.search.start_date = moment().format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 2) {
                    this.search.start_date = moment().subtract(1,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 3) {
                    this.search.start_date = moment().subtract(7,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 4) {
                    this.search.start_date = moment().subtract(15,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                } else if (dateTypeId == 5) {
                    this.search.start_date = moment().subtract(31,'d').format('YYYY-MM-DD')
                    this.search.end_date = moment().format('YYYY-MM-DD')
                }
            },
            reload () {
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
                    date_type_id  : 5,
                    start_date : moment().subtract(31,'d').format('YYYY-MM-DD'),
                    end_date : moment().format('YYYY-MM-DD')
                })
                this.orderList = this.ordersData = this.printorders = []
                this.totalSelected = 0
            },
            showBulkUploadModal() {
                this.bulkUploadModal = true
            },
            onFileChange(e){
                this.bulk_upload.excel_file = e.target.files[0];
            },
            bulkUpload () {
                let formData = new FormData();
                formData.append('merchant_id', this.bulk_upload.merchant_id);
                formData.append('excel_file', this.bulk_upload.excel_file);
                config.postData('/order/bulk-upload', formData)
                .then((response) => {
                    if (response.status == 201) {
                        this.bulkUploadModal = false
                        this.$toast.success('Bulk order uploaded') 
                        this.getResults()
                    }else{
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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
            pdfDownload() {
                // var headerImgData = "data:image/png;base64,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"
                var doc = new jsPDF('l');
                var header = function (data) {
                    doc.setFontSize(10);
                    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 10, 50, 160);
                    doc.text("Bahok.com, H-7, R-4, Senpara, Parbota, Mirpur-10", data.settings.margin.left+100, 10);
                    doc.text("Email: bahokdelivery@gmail.com", data.settings.margin.left+115, 15);
                };
                doc.setFontSize(30);
                doc.autoTable({
                    html: '#orderTable', 
                    tableWidth: 'auto',
                    theme: 'grid',
                    cellWidth: 'wrap',
                    showHead: 'firstPage',
                    tableLineColor: 200,
                    columnStyles: {
                        0: {cellWidth: 50},
                        1: {cellWidth: 20},
                        2: {cellWidth: 30},
                        3: {cellWidth: 40},
                        4: {cellWidth: 20},
                        5: {cellWidth: 20},
                        6: {cellWidth: 20},
                        7: {cellWidth: 20},
                    },
                    margin: { top: 25 },
                    styles: {
                        overflow: 'linebreak',
                        cellWidth: 'wrap',
                        overflowColumns: 'linebreak',
                        border: 1,
                        valign : 'middle',
                        cellPadding : 3,
                        textColor: 'black'
                    },
                    bodyStyles: {minCellHeight: 6},                 
                    didDrawPage: header,
                    didDrawCell: function(data) {                                                
                        if (data.column.index === 0 && data.cell.section === 'body') {
                            var td  = data.cell.raw;
                            var img = td.getElementsByTagName('img')[0];
                            doc.addImage(img.src, data.cell.x, data.cell.y, 18, 8);
                        }
                    }
                });
                doc.save("table.pdf");
            },
            actionPanelOrderToPdf() {
                //var headerImgData = "data:image/png;base64,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"
                var doc = new jsPDF('l');
                // var header = function (data) {
                //     doc.setFontSize(10);
                //     //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 10, 50, 160);
                //     doc.text("Bahok.com, H-7, R-4, Senpara, Parbota, Mirpur-10", data.settings.margin.left, 30);
                //     doc.text("Email: bahokdelivery@gmail.com", data.settings.margin.left+0, 35);
                //     doc.text("Total Order: " + 0, data.settings.margin.left+245, 35);
                // };
                doc.autoTable({
                    html: '#exportPdfTable', 
                    tableWidth: 'auto',
                    theme: 'grid',
                    cellWidth: 'wrap',
                    tableLineColor: 200,
                    columnStyles: {
                        0: {cellWidth: 44},
                        1: {cellWidth: 27},
                        2: {cellWidth: 25},
                        3: {cellWidth: 28},
                        4: {cellWidth: 40},
                        5: {cellWidth: 25},
                        6: {cellWidth: 20},
                        7: {cellWidth: 20},
                        8: {cellWidth: 19},
                        9: {cellWidth: 30}
                    },
                    startY: 30, //margin top value only for the first page
                    styles: {
                        overflow: 'linebreak',
                        cellWidth: 'wrap',
                        fontSize: 7,
                        fontStyle: 'normal',
                        overflowColumns: 'linebreak',
                        border: 1,
                        valign : 'middle',
                        cellPadding : 2,
                        textColor: 'black'
                    },
                    bodyStyles: {minCellHeight: 6},                 
                    // didDrawPage: header,
                    showHead: 'firstPage',
                    didDrawCell: function(data) {                                             
                        if (data.column.index === 0 && data.cell.section === 'body') {
                            var td  = data.cell.raw;
                            var img = td.getElementsByTagName('img')[0];
                            const xAxis = parseInt(data.cell.x + 2)
                            const yAxis = parseInt(data.cell.y + 4)
                            doc.addImage(img.src, xAxis, yAxis, 40, 6);
                        }
                    }
                });
                doc.save("table.pdf");
            },
            getStatus (status) {
                if (status == 1) {
                    return 'Requesting'
                } else if (status == 2) {
                    return 'Picked Up'
                } else if (status == 3) {
                    return 'Accepted'
                } else if (status == 4) {
                    return 'On Way'
                } else if (status == 5) {
                    return 'Successfull'
                } else if (status == 6) {
                    return 'Reschedule'
                } else if (status == 7) {
                    return 'Return'
                } else if (status == 8) {
                    return 'Cancel'
                } else if (status == 9) {
                    return 'Partial Complete'
                } else if (status == 10) {
                    return 'Exchange'
                } else if (status == 11) {
                    return 'Hold'
                }
            },
            searchOrder() {
                this.search.isSearch = 1
                this.totalOrder = 0
                this.orders = []
                this.page = 1
                this.getOrder()
            },
            getOrder($state) {
                this.loader = false
                let vm = this;
                const params = Object.assign({}, this.search, { page: this.page })
                config.getData('order', params)
                .then(res => {
                    return res
                }).then(response => {
                    this.summary = response.summary 
                    const lists = response.data.data
                    if (lists) {
                        this.totalOrder += lists.length
                        lists.map(item => {
                            vm.orders.push(item)
                        })
                    }
                    $state.loaded();
                });
 
                this.page = this.page + 1;
            },
            changeWeight(weightChargeId){
                const weightCharges = this.$store.state.commonObj.weightChargeList;
                const tmpCharge = weightCharges.find(charge => charge.id == weightChargeId)
                if (!this.form_edit) {
                    this.form.weight_charge = tmpCharge.charge
                } else {
                    this.form_edit.weight_charge = tmpCharge.charge
                }
            },
            showCreateModal(){
                this.createModal = true;
                document.body.classList.add("modal-open");
            },
            createOrder(){
                config.postData('/order/store', this.form)
                .then((response) => {
                    if(response.status == 201){                 
                        this.form.contact_name = this.form.contact_mobile = this.form.reference_id = this.form.price = this.form.service_charge = this.form.delivery_address = '';
                        this.form.weight_charge = this.form.area_charge = this.form.zone_id = 0
                        this.$toast.success('Order created') 
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
            editModal (index, order){
                document.body.classList.add("modal-open");
                this.printorders = []
                this.printorders.push(order)
                this.isRescheduleDate = order.reschedule_date != null ? true : false
                this.isReason = order.reason != null ? true : false
                this.form_edit = order
                this.key = index
                this.orderEditModal = true                             
                this.orderLog(order)
            },
            updateOrder () {
                config.postData('/order/update', this.form_edit)
                .then((response) => {
                    if(response.status == 201){                    
                        this.orders.splice(this.key, 1, response.data)
                        this.isReason = this.isRescheduleDate = false
                        this.orderEditModal = false
                        this.$toast.success('Order Updated') 
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
            cancelModal(){                
                this.createModal = this.orderEditModal = this.deleteModal = this.actionPanelModal = false;
                this.bulkUploadModal = this.isReason = this.isRescheduleDate = this.isScan = false;
                this.allSelected = false
                this.barcode.sku = ''
                this.totalSelected = 0
                this.printorders = []
                this.ordersData = []
                this.orderList = []                
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
                        this.bulk.status = this.bulk.merchant_id = this.bulk.rider_id = 0,
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
                this.isScan = true  
                this.orderList.push(this.barcode.sku); 
                this.barcode.sku = ''
            },
            scanDone () {
                config.postData('/order/scaned-order', { 'order_ids': this.orderList })
                .then((response) => {               
                    if (response.status === 200) {                                           
                        this.printorders = response.data;
                        this.isScan = false                                          
                    } else {
                        this.$toast.error('Order not found') 
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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
                if (status == 6) {
                    this.isRescheduleDate = true;
                    this.isReason = true;
                } else if (status >= 7) {
                    this.isReason = true;
                    this.isRescheduleDate = false
                }
            },
            singleStatusChange (order_id, event) {
                var status = event.target.value
                if (status >= 6) {
                    this.isRescheduleDate = true;
                    this.isReason = true;
                } else {
                    this.isReason = false;
                    this.isRescheduleDate = false
                }
                config.getData('/order/single-status-update/'+ order_id + '/'+ status)
                .then((response) => {                    
                    if (response.status == 200) {
                        this.$toast.success('Status change successfully') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log('error => ', error) 
                });
            },
            singlePaymentStatusChange (order_id, event) {
                config.getData('/order/single-payment-status-update/'+ order_id + '/'+ event.target.value)
                .then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Payment status change successfully') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log('error => ', error) 
                });
            },
            singleZoneChange (order_id, zone_id) {
                config.getData('/order/single-zone-change/'+ order_id + '/'+ zone_id)
                .then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Zone change successfully') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log('error => ', error) 
                });
            },
            singleRiderAssign (order_id, rider_id) {
                config.getData('/order/single-rider-change/'+ order_id + '/'+ rider_id)
                .then((response) => {
                    if (response.status == 200) {
                        this.orders.splice(this.status.key, 1, response.data)
                        this.$toast.success('Rider assigned successfully') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log('error => ', error) 
                });
            },
            singleLogisticPartnerAssign (order_id, event) {
                config.getData('/order/single-logistic-partner-assign/'+ order_id + '/'+ event.target.value)
                .then((response) => {
                    if (response.status == 200) {
                        this.$toast.success('Order assigned to logistic partner successfully') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                })
                .catch((error) => {
                    console.log('error => ', error) 
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
            getServiceCharge (type) {
                const form = type == 1 ? this.form : this.form_edit
                const merchantId = form.merchant_id
                const zoneId = form.zone_id
                const charge = this.$store.state.commonObj.serviceChargeList.find(charge => ((charge.merchant_id == merchantId) && (charge.zone_id == zoneId)))
                form.service_charge = charge.base_charge
                form.area_charge = charge.area_charge
            },
            getZones (type) {
                const areaId = type == 1 ? this.form.area_id : this.form_edit.area_id
                const tmpZones = this.$store.state.commonObj.zoneList.find(tmp => tmp.area_id == areaId)
                this.zones = tmpZones
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