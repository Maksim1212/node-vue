/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            weather: [],
            daysName: [],
            dates: [],
            city: '',
            cityName: '',
            descriptions: [],
            temps: [],
            humuditys: [],
            winds: [],
        };
    },
    methods: {
        async getWeather() {
            const res = await axios.post('/weather', { city: `${this.city}` });
            this.weather = res.data.image;
            this.daysName = Object.keys(res.data.date);
            this.dates = res.data.date;
            this.descriptions = res.data.description;
            this.temps = res.data.temp;
            this.humuditys = res.data.humudity;
            this.winds = res.data.wind;
            console.log(res.data);
            // this.cityName += this.city;
            // console.log(this.city);
        },
    },
});
