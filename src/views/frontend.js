/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

// Vue.config.errorHandler = function(err, vm, info) {
//     console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            weather: [],
            daysName: [],
            dates: [],
            city: '',
            descriptions: [],
            temps: [],
            humuditys: [],
            winds: [],
            errorMessage: '',
        };
    },
    methods: {
        async getWeather() {
            const res = await axios.post('/weather', { city: `${this.city}` });
            console.log(res.data);
            if (!res.data.error) {
                this.errorMessage = '';
                this.weather = res.data.image;
                this.daysName = Object.keys(res.data.date);
                this.dates = res.data.date;
                this.descriptions = res.data.description;
                this.temps = res.data.temp;
                this.humuditys = res.data.humudity;
                this.winds = res.data.wind;
            } else {
                this.errorMessage = res.data.error;
                this.weather = [];
                this.daysName = [];
                this.dates = [];
                this.descriptions = [];
                this.temps = [];
                this.humuditys = [];
                this.winds = [];
            }
        },
    },
});
