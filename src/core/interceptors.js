import Vue from 'vue'
import axios from 'axios';
import store from '../store/index'
import router from '../router'

export default function setup() {
    axios.interceptors.request.use(config => {
        const token = store.getters.getAccess;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.baseURL = 'http://localhost:8000/api'
        return config;
    }, err => {
        return Promise.reject(err);
    });

    axios.interceptors.response.use((response) => {
        return response
    },
        function (error) {
            const originalRequest = error.config;

            if (error.response.status === 400) {
                let message = "";
                for (var err in error.response.data) {
                    message += err + ": "; // alerts key
                    message += error.response.data[err] //alerts key's value
                    message += "\n"
                }
                Vue.$toast.error(message);
            }
            if (error.response.status === 401 && error.config.url === '/user/token/') {
                store.dispatch('logout')
                router.push({ name: "Login" })
            }
            else if (error.response.status === 401) {
                return axios.post('/user/token/',
                    {
                        "refresh": store.getters.getRefresh
                    })
                    .then(res => {
                        if (res.status === 200) {
                            store.dispatch('set_access_token', res.data.access).then(() => {
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.getAccess;
                                return axios(originalRequest);
                            });
                        }
                    })
            }
            
            return new Promise((resolve, reject) => {
                reject(error);
            });
        })
}