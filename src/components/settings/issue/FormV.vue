<template>
    <b-container fluid>
        <b-row>
            <b-col lg="12" sm="12">
                <template v-slot:body>
                    <b-row>
                        <b-col lg="12" sm="12">
                            <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                                <b-form  @submit.prevent="handleSubmit(saveUpdate)" @reset.prevent="reset" >
                                    <b-row>
                                        <b-col xs="12" sm="12" md="12" lg="12" xl="12">
                                            <ValidationProvider name="Title" vid="title" rules="required|title">
                                                <b-form-group
                                                    class="row"
                                                    label-cols-sm="4"
                                                    label-for="title"
                                                    slot-scope="{ valid, errors }"
                                                >
                                                <template v-slot:label>
                                                    Issue Tittle
                                                </template>
                                                    <b-form-textarea
                                                        id="title"
                                                        v-model="form.title"
                                                        rows="1"
                                                        max-rows="2"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                    ></b-form-textarea>
                                                    <div class="invalid-feedback">
                                                        {{ errors[0] }}
                                                    </div>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-right">
                                            <b-button type="submit" class="success mr-2">{{ saveBtnName }}</b-button>
                                            &nbsp;
                                            <b-button class="danger" @click="$bvModal.hide('modal-4')">{{ $t('globalTrans.cancel') }}</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </ValidationObserver>
                        </b-col>
                    </b-row>
                </template>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import config from '@/config'
    import { ValidationObserver, ValidationProvider } from 'vee-validate'
    export default {
        name: 'Form',
        props: ['id'],
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {    
                loading: false,
                saveBtnName: this.id != 0 ? 'Update' : 'Create',      
                form: {
                    title : '',
                },      
                errors: []
            }
        },
        created () {
            if (this.id !== 0) {
                this.form = this.getEditingData()
            }
        },
        methods: {
            getEditingData () {
                const tmpData = this.$store.state.list.find(item => item.id === this.id)
                return JSON.parse(JSON.stringify(tmpData))
            },
            async saveUpdate () {
                this.$store.dispatch('stateReload', true)
                let result = null
                if (this.id !== 0) {
                    result = await config.putData(`/issue/update/${this.id}`, this.form)
                } else {
                    result = await config.postData('/issue/store', this.form)
                } 

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
