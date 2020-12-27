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
            console.log(error);
            const originalRequest = error.config;

            if (error.response.status === 401 && originalRequest._retry) {
                return router.push({ name: "login" })
            }

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return axios.post('/user/token/',
                    {
                        "refresh": store.getters.getRefresh
                    })
                    .then(res => {
                        if (res.status === 200) {
                            // 1) put token to LocalStorage
                            store.dispatch('set_access_token', res.data.access);

                            // 2) Change Authorization header
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.getAccess;

                            // 3) return originalRequest object with Axios.
                            return axios(originalRequest);
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
}