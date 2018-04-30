const CUSTOMER_ID_QUERY_PARAM = 'customerId';
const NOTE_PREFIX_STORAGE = 'LENote';

Vue.component('customerDetailsItem', {
    template: '#customer-details-item-template',
    props: ['item'],
    data: {},
    methods: {},
    computed: {
       param() {
           return this.item[0];
       },
        paramValue() {
           return this.item[1];
       }
    },
});

Vue.component('customerDetails', {
    template: '#customer-details-template',
    props: {
        details: {
            type: Array,
            default: () => [],
        },
    },
    data: {},
    methods: {},
});


new Vue({
    el: '#my-custom-widget',
    data() {
        return {
            details: this.getDetails(),
            //note: this.getNote(),
            note: '',
            visitorId: ''
        }
    },
    methods: {
        _onVisitorIdFetchSuccess(data) {
            if(data.newValue || (data.newValue instanceof Array && data.newValue.length)) {
                this.visitorId = data.newValue;
                console.log(`visitorId: ${this.visitorId}`);
                this.note = this.getNote();
            }
        },
        _onVisitorIdFetchError(err) {
            console.error(`error getting visitorInfo.visitorId. err: ${err}`);
        },
        getDetails() {
            const paramsString = location.search;
            const searchParams = new URLSearchParams(paramsString);
            const result =  [...searchParams];
            return result;
        },
        getCustomerId() { //from query param
            const details = this.getDetails();
            const customerIdData = details.find((row) => {
                return row.some((item) => {
                    return item === CUSTOMER_ID_QUERY_PARAM;
                });
            });
            return customerIdData.length === 2 ? customerIdData[1] : '';
        },
        getNote() {
            //const customerId = this.getCustomerId();
            const noteStore = `${NOTE_PREFIX_STORAGE}${this.visitorId}`;
            const note = localStorage.getItem(noteStore) || '';
            return note;
        },
        saveNote(note) {
            //const customerId = this.getCustomerId();
            const noteStore = `${NOTE_PREFIX_STORAGE}${this.visitorId}`;
            localStorage.setItem(noteStore, note);
        }
    },
    created() {
        lpTag.agentSDK.init({});
        lpTag.agentSDK.bind('visitorInfo.visitorId', this._onVisitorIdFetchSuccess, this._onVisitorIdFetchError);
    },
});

