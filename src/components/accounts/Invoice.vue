<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <b-overlay :show="loader">
                    <div class="row">
                        <div class="col-md-12 text-center mt-5">
                            <button @click="print">Print <i class="fa fa-print"></i></button>
                        </div>
                    </div>
                    <div class="row" id="printSection">
                        <div class="col-md-8 offset-md-2 body-main">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-4"> <img class="img" alt="Invoce Template" :src="'./images/logo.png'"  style="width:100px"/> </div>
                                    <div class="col-md-8 text-right">
                                        <h4><strong>{{ paid.merchant_business }}</strong></h4>
                                        <p>{{ paid.address }}</p>
                                    </div>
                                </div> <br />
                                <div class="row">
                                    <div class="col-md-12 text-center">
                                        <h3 class="invoice">INVOICE</h3>
                                        <h5>#BHK-P-0000{{ paid.id }}</h5>
                                    </div>
                                </div> <br />
                                <div class="section-body">
                                    <div class="content-first">
                                        <p>Dear <strong>{{ paid.merchant_business }}</strong>,<br/> </p>
                                        <p> We have successfully paid of total: <strong>{{ paid.total_order }}</strong> pcs, parcel amount at <strong>{{ paid.payment_date | dateformat }}</strong> by {{ getPaymentBy(paid.payment_by) }}. Paid amount: <strong>{{ paid.final_amount }}Tk</strong>, TrnxID: {{ paid.tnxid }} <slot v-if="paid.adjustment != 0">, With adjustment amount: {{ paid.adjustment }} TK.</slot></p>                                    
                                        <p>Thanks for stay with us. Any query or complain please share with us frankly.</p>
                                        <p>Total Summary are in following: </p>
                                        <div class="row">
                                            <div class="col-md-6 offset-md-3">
                                                <table class="table table-bordered">
                                                    <tr>
                                                        <th>Total Parcel (Pcs)</th>
                                                        <th class="text-right">{{ paid.total_order }}</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Price</th>
                                                        <th class="text-right">{{ summary.total_price }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Collected</th>
                                                        <th class="text-right">{{ summary.total_collected }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Service Charge</th>
                                                        <th class="text-right">{{ summary.total_service_charge }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Weight Charge</th>
                                                        <th class="text-right">{{ summary.total_weight_charge }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Area Charge</th>
                                                        <th class="text-right">{{ summary.total_area_charge }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Total COD</th>
                                                        <th class="text-right">{{ summary.total_cod }}  Tk</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Final Amount</th>
                                                        <th class="text-right">{{ summary.total_amount }} Tk</th>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-second">
                                        <p><strong>Note: {{ paid.note != null ? paid.note : 'N/A' }}</strong></p>
                                    </div>
                                </div>
                                <div class="signature">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <p>Accounts</p>
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-3">
                                            <p class="text-right">Managing Director</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="row">
                                        <div class="col-md-6 offset-md-3 text-center">
                                            <p>Bahok Courier</p>
                                            <p>Address: {{ profile.address }}, Email: {{ profile.email }}, Mobile: {{ profile.mobile_1 }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </section>
    </div>
</template>
<script>
    import config from '@/config' 
    export default {
        name:'Invoice',
        data(){
            return {   
                loader: false,             
                profile:{},
                paid:{},
                summary:{},
                search: {
                    payment_id: '',
                }
            }
        },
        created(){
            this.getPaidOrderDetails()
        },
        methods:{
            async getPaidOrderDetails() {
                this.loader = true
                const params = { payment_id : this.$route.query.paymentId }
                await config.getData('/accounts/payment/invoice', params)
                .then((response) => {
                    this.loader = false
                    if (response.status == 200){
                        this.profile = response.profile
                        this.paid = response.data
                        this.summary = response.summary
                    } else {
                        this.paid = {}
                        this.profile = {}
                        this.summary = {}
                    } 
                });
            },
            getPaymentBy (paymentBy) {
                const payment_by = this.$store.state.paymentByList.find(pBy => pBy.id === paymentBy)
                return typeof payment_by !== 'undefined' ? payment_by.text : ''
            },
            print () {
                this.$htmlToPaper("printSection");
            }
        }
    }
</script>

<style scoped>
    .body-main {
        font-family: inherit;
        margin-top:20px;
        padding:10px;
        border: 2px solid #ddd;
    }
    h3.invoice {
        background: #000;
        color: #fff;
        letter-spacing: 5px;
    }
    .section-body {
        min-height: 350px;
    }
    .section-body p {
        font-size: 16px;
    }
    .content-second {
        margin-top: 20px;
        margin-bottom: 80px;
        border: 1px solid #ddd;
        padding: 5px 5px;
    }
    .signature p{
        font-weight: bold;
        font-size: 18px;
        border-top: 1px dashed #ca193a;
    }
    .footer {
        font-size: 16px;
        margin-top:20px;
        border-top: 1px solid #ca193a;
    }
</style>