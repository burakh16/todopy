import axios from 'axios'

const state = {
    user: {},
    access: "" || localStorage.getItem('access'),
    refresh: "" || localStorage.getItem('refresh'),
}


const getters = {
    isAuthenticated: state => !!state.access,
    getAccess: state => state.access,
    getRefresh: state => state.refresh,
    getUser: state => state.user,
};

const actions = {
    async login({ commit }, user) {
        const res = await axios.post(`user/login/`, user);
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        commit("SET_ACCESS", res.data.access)
        commit("SET_REFRESH", res.data.refresh)
    },
    async get_user({ commit }) {
        const res = await axios.get(`/user/`);
        commit("SET_USER", res.data)
    },
    async set_access_token({ commit }, token) {
        localStorage.setItem('access', token);
        commit("SET_ACCESS", token)
    },
    async register({ commit }, user) {
        try {
            const res = await axios.post('user/register/', user)
            commit('SET_USER', res.data.user);
            commit("SET_ACCESS", res.data.access);
            commit("SET_REFRESH", res.data.refresh);
            return true
        } catch (error) {
            return false
        }
    },
    async logout({ commit }) {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        commit("LOGOUT")

    }
};

const mutations = {
    SET_USER: (state, user) => state.user = user,
    SET_ACCESS: (state, token) => state.access = token,
    SET_REFRESH: (state, token) => state.refresh = token,
    LOGOUT: (state) => {
        state.access = "";
        state.refresh = "";
        state.user = {}
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
