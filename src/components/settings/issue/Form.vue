<template>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <b-overlay :show="loader">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">{{ formTitle }} Issue</h5>
                    <button type="button" class="close" aria-label="Close" @click="createEdit.hide()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="title">Issue Title <span class="text-danger" title="Required">*</span></label>
                                <textarea id="title" v-model="form.title" class="form-control" placeholder="Enter Title"></textarea>
                                <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>
                            </div>
                        </div>                          
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="createUpdate">{{ formTitle }}</button>
                    <button type="button" class="btn btn-danger" @click="createEdit.hide()">Cancel</button>
                </div>
            </b-overlay>
        </div>
    </div>
</template>
<script>
    import config from '@/config'
    export default {
        name: 'Form',
        props: ['createEdit', 'id'],
        data() {
            return {    
                loader: false,      
                form: {
                    title : '',
                },      
                formTitle: this.id !== 0 ? 'Update' : 'Create',
                errors: []
            }
        },
        created () {
            console.log('this.id = ', this.id)
            if (this.id !== 0) {
                this.form = this.getEditingData()
            }
        },
        computed : {
            listData () {
                return this.$store.state.list
            }
        },
        methods: {
            getEditingData () {
                const tmpData = this.listData.find(item => item.id === this.id)
                return JSON.parse(JSON.stringify(tmpData))
            },
            async createUpdate () {
                this.loader = true
                this.$store.dispatch('stateReload', true)
                let result = null
                if (this.id !== 0) {
                    result = await config.putData(`/issue/update/${this.id}`, this.form)
                } else {
                    result = await config.postData('/issue/store', this.form)
                } 
                this.loader = false
                if (result.status === 201) {   
                    this.$toast.success(this.id !== 0 ? 'Issue title updated' : 'Title created') 
                } else {
                    this.$toast.error('Sorry, something went wrong') 
                }
                this.form.title = ''
                this.createEdit.hide()
                this.$store.dispatch('stateReload', false)
            }
        }
    }
</script>
