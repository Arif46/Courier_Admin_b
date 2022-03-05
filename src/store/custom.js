
const statusList = [
    { id:1, text: 'Requesting'},
    { id:2, text: 'Picked Up'},
    { id:3, text: 'Accepted'},
    { id:4, text: 'Assign'},
    { id:5, text: 'On Way'},
    { id:6, text: 'Done'},
    { id:7, text: 'Reschedule'},
    { id:8, text: 'Return'},
    { id:9, text: 'Cancel'},
    { id:10, text: 'Complete Partial'},
    { id:11, text: 'Exchange'},
    { id:12, text: 'Hold'}
]

const dateParameterList = [
    {
        id: 1,
        text: 'No Date'
    },
    {
        id: 2,
        text: 'Deadline'
    },
    {
        id: 3,
        text: 'Assign Date'
    },
    {
        id: 4,
        text: 'Activity Date'
    },
    {
        id: 5,
        text: 'Last Action'
    }
]

const dateTypeList = [
    {
        id: 1,
        text: 'Today'
    },
    {
        id: 2,
        text: 'Yesterday'
    },
    {
        id: 3,
        text: 'Last 31 days'
    },
    {
        id: 4,
        text: 'Last 6 Month'
    },
    {
        id: 5,
        text: 'Last 1 Year'
    }
]

const paymentByList = [
    {
        id: 1,
        text: 'Bkash'
    },
    {
        id: 2,
        text: 'Rocket'
    },
    {
        id: 3,
        text: 'Nagad'
    },
    {
        id: 4,
        text: 'Bank'
    },
    {
        id: 5,
        text: 'Cash'
    },
    {
        id: 6,
        text: 'Cheque'
    }
]

const categoryList = [
    {
        id: 1,
        text: 'General'
    },
    {
        id: 2,
        text: 'Fragile'
    },
    {
        id: 3,
        text: 'Liquid'
    },
    {
        id: 4,
        text: 'Document'
    },
]

export default {
    statusList,
    dateParameterList,
    dateTypeList,
    paymentByList,
    categoryList
}