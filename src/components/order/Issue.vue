<template>
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <b-overlay :show="loading">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-center w-100">Issue Details</h5>
                    <button type="button" class="close" aria-label="Close" @click="issueModal.hide()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:keyup.enter="store" ref="form">
                        <div class="row">
                            <div class="col-12">
                                <label for="description">Selected Issue </label>
                                <div class="form-group">
                                    <ul class="issue-list">
                                        <li>
                                            <label>
                                                <input type="radio" v-model="issue.issue_id" :value="issue.issue_id" checked /> {{ issue.issue_title }}
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>             
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="description">Description </label>
                                    <textarea type="text" id="description" v-model="issue.issue_description" class="form-control" placeholder="Description Maximum 200 Character" readonly></textarea>
                                    <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="reply_message">Reply Message </label>
                                    <textarea type="text" id="reply_message" v-model="form.reply_message" class="form-control" placeholder="Reply Message Maximum 200 Character"></textarea>
                                    <span class="text-danger" v-if="errors.reply_message">{{ errors.reply_message[0] }}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click.prevent="store">Save</button>
                    <button type="button" class="btn btn-danger" @click="issueModal.hide()">Cancel</button>
                </div>
            </b-overlay>
        </div>
    </div>
</template>
<script>
    import config from '@/config'
    export default {
        name: 'Create',
        props: ['issueModal', 'issue'],
        data() {
            return {
                loading: false,
                selectedIssue: {},
                form:{
                    issue_id : 0,
                    description: '',
                    reply_message: ''
                },
                errors: []
            }
        },
        methods: {
            async store() {
                this.loading = true
                this.$store.dispatch('stateReload', true)
                const formData = Object.assign(this.form, { issue_id: this.issue.issue_id, issue_order_id: this.issue.issue_order_id })
                await config.postData('/order/issue-reply', formData)
                .then((response) => {
                    if (response.status == 201) {  
                        this.$toast.success('Issue Submitted') 
                    } else {
                        this.$toast.error('Sorry, something went wrong') 
                    }
                    this.$store.dispatch('stateReload', false)
                    this.$store.dispatch('removeIssueFromIssueList', this.issue.issue_id)
                    this.loading = false
                    this.issueModal.hide()
                })
                .catch ((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    ul.issue-list {
        list-style: none;
    }
    ul.issue-list label{
        font-weight: 500;
    }
    ul.issue-list li{
        font-size: 18px;
        margin: 8px 0px;
    }
</style>
