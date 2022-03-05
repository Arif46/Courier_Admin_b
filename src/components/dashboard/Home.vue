<template>
    <div class="content-wrapper">
      <!-- <div v-if="loader" class="page_loader"></div> -->
      <!-- Content Header (Page header) -->
      <div class="content-header" style="font-size:16px;">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">{{ $t('globalTrans.dashboard') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">{{ $t('globalTrans.home') }}</a></li>
                <li class="breadcrumb-item active">{{ $t('globalTrans.dashboard') }}</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid dashboard-card">
          <div class="card">
            <div class="card-header">
              <div class="row">
                  <div class="col-xl-3 col-md-3 col-sm-6 col-xs-12">
                      <div class="form-group">
                          <label for="start_date">{{ $t('globalTrans.startDate') }} </label>
                          <input type="date" id="start_date" v-model="search.start_date" class="form-control" />
                      </div>
                  </div>
                  <div class="col-xl-3 col-md-3 col-sm-6 col-xs-12">
                      <div class="form-group">
                          <label for="end_date">{{ $t('globalTrans.endDate') }} </label>
                          <input type="date" id="end_date" v-model="search.end_date"  class="form-control" />
                      </div>
                  </div>
                  <div class="col-md-2">
                      <div class="form-group">
                          <button class="btn btn-info btn-sm" type="submit" @click.prevent="filterSummary" style="margin-top:30px;"><i class="fa fa-search"></i> Filter</button>
                      </div>
                  </div>
              </div>
            </div>
            <div class="card-body">
              <b-overlay :show="loader">
                <div class="row">
                  <div class="col-lg-12">
                    <h5>Today Summary : </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">                    
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=2&&start_date='+ today +'&end_date='+ today +'&date_type_id=1'">
                          <p>{{ today_order }}</p>                      
                          <p>Total Order</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <p>{{ today_assign }}</p>
                        <p>Total Assign</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <p>BDT {{ lastday_collection }}</p>
                        <p>Lastday Collection</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-lg-12">
                    <h5>Lastday Summary : </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=2&&start_date='+ yesterday +'&end_date='+ yesterday +'&date_type_id=2'">
                          <p>{{ lastday_order }}</p>
                          <p>Total Order</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=4&&start_date='+ yesterday +'&end_date='+ yesterday +'&date_type_id=2&status[]=6,10'">
                          <p>{{ lastday_successfull }}</p>
                          <p>Total Successfull</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <p>{{ lastday_on_way }}</p>
                        <p>Total On Way</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=4&&start_date='+ yesterday +'&end_date='+ yesterday +'&date_type_id=2&status[]=9'">
                          <p>{{ lastday_cancel }}</p>
                          <p>Total Cancel</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=4&&start_date='+ yesterday +'&end_date='+ yesterday +'&date_type_id=2&status[]=7'">
                          <p>{{ lastday_reschedule }}</p>
                          <p>Total Reschedule</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <router-link :to="'/order?date_parameter_id=4&&start_date='+ yesterday +'&end_date='+ yesterday +'&date_type_id=2&status[]=8'">
                          <p>{{ lastday_return }}</p>
                          <p>Total Return</p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-lg-12">
                    <h5>Total Summary : </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1'"> -->
                          <p>{{ total_order }}</p>
                          <p>Total Order</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-warning">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=1'"> -->
                          <p>{{ total_requesting }}</p>
                          <p>Total Requesting</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=3'"> -->
                          <p>{{ total_accepted }}</p>
                          <p>Total Accepted</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-danger">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=8'"> -->
                          <p>{{ total_return }}</p>
                          <p>Total Return</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-warning">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=7'"> -->
                          <p>{{ total_reschedule }}</p>
                          <p>Total Reschedule</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-danger">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=9'"> -->
                          <p>{{ total_cancel }}</p>
                          <p>Total Cancel</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-info">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=6'"> -->
                          <p>{{ total_complete }}</p>
                          <p>Total Complete</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <!-- <router-link :to="'/order?date_parameter_id=1&date_type_id=5&status[]=10'"> -->
                          <p>{{ total_partial_complete }}</p>
                          <p>Total Partial Complete</p>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <p>BDT {{ total_order_amount }}</p>
                        <p>Total Order Amount</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <p>BDT {{ total_collected_amount }}</p>
                        <p>Total Collected Amount</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <p>BDT {{ total_cod }}</p>
                        <p>Total COD</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <p>BDT {{ total_area_charge }}</p>
                        <p>Total Area Charge</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-xl-3 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <div class="small-box bg-success">
                      <div class="inner">
                        <p>BDT {{ total_weight_charge }}</p>
                        <p>Total Weight Charge</p>
                      </div>
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
  import moment from 'moment'
  export default {
    name:'Home',
    data() {
      return {
        yesterday: moment().subtract(1,'d').format('YYYY-MM-DD'),
        today: moment().format('YYYY-MM-DD'),
        loader: false,
        search : {
          start_date: '',
          end_date: ''
        },
        today_order: 0,
        today_assign: 0,
        lastday_order: 0,
        lastday_on_way: 0,
        lastday_successfull: 0,
        lastday_cancel: 0,
        lastday_reschedule: 0,
        lastday_return: 0,
        lastday_collection: 0,
        total_order: 0,
        total_requesting: 0,
        total_accepted: 0,
        total_on_way: 0,
        total_return: 0,
        total_cancel: 0,
        total_reschedule: 0,
        total_complete: 0,
        total_partial_complete: 0,
        total_order_amount: 0,
        total_collected_amount: 0,
        total_cod: 0,
        total_area_charge: 0,
        total_weight_charge: 0
      }
    },
    created () {
      this.getOrderSummary()
    },
    mounted () {
      window.Echo.channel('ChatChannel')
      .listen('Chat', (e) => {
        console.log('socket result = ', e);
      })
    },
    methods: {
      filterSummary () {
        this.getOrderSummary()
      },
      getOrderSummary () {
        this.loader = true
        const params = this.search
        config.getData('/dashboard', params)
        .then((response) => {
          this.loader = false
          this.today_order = response.data.today_order
          this.today_assign = response.data.today_assign
          this.lastday_order = response.data.lastday_order
          this.lastday_on_way = response.data.lastday_on_way
          this.lastday_successfull = response.data.lastday_successfull
          this.lastday_cancel = response.data.lastday_cancel
          this.lastday_reschedule = response.data.lastday_reschedule
          this.lastday_return = response.data.lastday_return
          this.lastday_collection = response.data.lastday_collection
          this.total_order = response.data.total_order
          this.total_requesting = response.data.total_requesting
          this.total_accepted = response.data.total_accepted
          this.total_on_way = response.data.total_on_way
          this.total_return = response.data.total_return
          this.total_cancel = response.data.total_cancel
          this.total_reschedule = response.data.total_reschedule
          this.total_complete = response.data.total_complete
          this.total_partial_complete = response.data.total_partial_complete
          this.total_order_amount = response.data.total_order_amount
          this.total_collected_amount = response.data.total_collected_amount
          this.total_cod = response.data.total_cod
          this.total_area_charge = response.data.total_area_charge
          this.total_weight_charge = response.data.total_weight_charge
        })
        .catch((error) => {
            console.log(error);
        });
      }
    }
  }
</script>