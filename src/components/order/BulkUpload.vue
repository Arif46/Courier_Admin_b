<template>
    <div class="modal-dialog modal-default" role="document">
        <div class="modal-content">
            <b-overlay :show="loading">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Upload Bulk Order</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="name">Merchant</label>
                            <select2 v-model="bulk_upload.merchant_id" placeholder="Select" :options="merchantList"></select2>
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
                    <button type="button" class="btn btn-danger btn-sm" @click="bulkModal.hide()">Cancel</button>
                </div>
            </b-overlay>
        </div>
    </div>
</template>
<script>
    import config from '../../config'
    import Select2 from 'v-select2-component'
    export default {
        name: 'BulkUpload',
        props: ['bulkModal','merchantList'],
        components: {
            'select2': Select2
        },
        data() {
            return {
                loading: false,
                bulk_upload: {
                    merchant_id: 0,
                    excel_file: ''
                },
                errors: []
            }
        },
        computed: {
            commonObj () {
                return this.$store.state.commonObj
            }
        },
        methods: {
            onFileChange(e){
                this.bulk_upload.excel_file = e.target.files[0];
            },
            async bulkUpload () {
                this.loading = true
                this.$store.dispatch('stateReload', true)
                let formData = new FormData();
                formData.append('merchant_id', this.bulk_upload.merchant_id);
                formData.append('excel_file', this.bulk_upload.excel_file);
                const response = await config.postData('/order/bulk-upload', formData)
                this.loading = false  
                if (response.status == 201) {
                    this.bulkModal.hide()
                    this.$toast.success({
                        title: 'Success',
                        message: 'Bulk order uploaded successfully',
                        color: '#D6E09B'
                    }) 
                    this.bulk_upload.merchant_id = 0
                    this.bulk_upload.excel_file = ''
                } else {
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sorry, something went wrong'
                    })
                }                  
                this.$store.dispatch('stateReload', false)
            }
        }
    }
</script>
