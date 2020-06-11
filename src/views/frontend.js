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
            console.log(this.city);
        },
    },
    // mounted() {
    //     // axios
    //     //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //     //     .then((response) => (this.info = response));
    //     axios({
    //         method: 'post',
    //         url: '/weather',
    //         data: {
    //             city: 'Kiev',
    //         }.then((response) => {
    //             console.log(response.data);
    //         }),
    //     });
    //     console.log('89898');
    // },
    // mounted: function() {
    //     // axios
    //     //     .post("/weather", {
    //     //         city: "Kiev"
    //     //     })
    //     //     .then((response) => {
    //     //         console.log(response.data)
    //     //     }).catch((error) => {
    //     //         console.log(error);
    //     //     });
    // },
    // template: `

    //     <div>

    //     <button v-on:click="search()">xxx</button>
    //     </div>`,
    //
});
