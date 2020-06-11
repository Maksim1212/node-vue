/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            weather: [],
            days: [],
            city: '',
            cityName: '',
        };
    },
    methods: {
        async getWeather() {
            const res = await axios.post('/weather', { city: `${this.city}` });
            this.weather = res.data;
            this.days = Object.keys(res.data);
            this.cityName += `Weather in the city ${this.city}`;
            // console.log(this.city);
        },
    },
});
