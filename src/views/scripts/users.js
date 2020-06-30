/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
// Vue.config.errorHandler = function(err, vm, info) {
//     console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
    el: '#app',
    data() {
        return {
            userComponentKey: 1,
            counter: 0,
            email: '',
            fullName: '',
            userId: '',
            index: '',
            emails: [],
            fullNames: [],
            resData: [],
            users: [],
            dataMessage: '',
        };
    },
    methods: {
        async findAll() {
            const res = await axios.get('/v1/users/data', {});
            for (let i = 0; i <= res.data.length; i += 1) {
                this.emails.push(res.data[i].email);
                this.fullNames.push(res.data[i].fullName);
                this.users.push(res.data[i]);
            }
        },
        async addUser() {
            const res = await axios.post('/v1/users/', { email: `${this.email}`, fullName: `${this.fullName}` });
            if (res.status === 200) {
                this.dataMessage = 'user added successfully';
                this.users = [];
                this.fullName = '';
                this.email = '';
                this.findAll();
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else {
                this.dataMessage = res.data.message[0].message;
            }

        },
        async updateUser() {
            const res = await axios.post('/v1/users?_method=PUT', { id: `${this.userId}`, fullName: `${this.fullName}` });
            if (res.status === 200) {
                this.users = [];
                this.fullName = '';
                this.userId = '';
                this.findAll();
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else { this.dataMessage = res.data.message[0].message; }
        },
        async deleteUser() {
            const res = await axios.post('/v1/users?_method=DELETE', { id: `${this.userId}` });
            if (res.status === 200) {
                this.users = [];
                this.findAll();
                this.userId = '';
                this.fullName = '';
                this.dataMessage = res.data.message;
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else {
                this.dataMessage = res.data.message[0].message;
            }
        },
    },
    async mounted() {
        const res = await axios.get('/v1/users/data', {});
        for (let i = 0; i <= res.data.length; i += 1) {
            this.emails.push(res.data[i].email);
            this.fullNames.push(res.data[i].fullName);
            this.users.push(res.data[i]);
        }
        this.$forceUpdate();
    },
});
