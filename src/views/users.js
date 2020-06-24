/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

// Vue.config.errorHandler = function(err, vm, info) {
//     console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
    el: '#app',
    data() {
        return {
            email: '',
            fullName: '',
            userId: '',
            emails: [],
            fullNames: [],
            resData: [],
            users: [],
        };
    },
    methods: {
        async addUser() {
            const res = await axios.post('/v1/users/', { email: `${this.email}`, fullName: `${this.fullName}` });
            return this.findAll();
        },
        async findAll() {
            const res = await axios.get('/v1/users/data', {});
            for (let i = 0; i <= res.data.length; i += 1) {
                this.emails.push(res.data[i].email);
                this.fullNames.push(res.data[i].fullName);
                this.users.push(res.data[i]);
            }
        },
        async updateUser() {
            const res = await axios.post('/v1/users?_method=PUT', { fullName: `${this.fullName}` });
            return this.findAll();
        },
        async deleteUser() {
            const res = await axios.post('/v1/users?_method=DELETE', { userId: `${this.userId}` });
            return this.findAll();
        },
    },
    async mounted() {
        const res = await axios.get('/v1/users/data', {});
        // console.log(res.data);
        for (let i = 0; i <= res.data.length; i += 1) {
            this.emails.push(res.data[i].email);
            this.fullNames.push(res.data[i].fullName);
            this.users.push(res.data[i]);
            // console.log(this.users);
            // console.log(res.data[3].email);
            // console.log(this.emails);
        }
    },
});
