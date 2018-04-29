Vue.component('customerDetailsItem', {
    template: '#customer-details-item-template',
    props: ['details', 'item'],
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
    mounted() {
        let x = this.details;
    },
});


new Vue({
    el: '#my-custom-widget',
    data: {

    },
    computed: {
        getDetails() {
            const paramsString = location.search;
            const searchParams = new URLSearchParams(paramsString);
            const result =  [...searchParams];
            return result;
        }
    }
});

