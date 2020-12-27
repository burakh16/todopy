const state = {
    pagination: {},
    loading: false
}

const getters = {
    getPagination: state => state.pagination,
    getLoading: state => state.loading

}

const actions = {
    set_loading({ commit }, status) {
        commit("SET_LOADING", status)
    }
}

const mutations = {
    SET_PAGINATION: (state, data) => state.pagination = data,
    SET_LOADING: (state, status) => state.loading = status
}

export default {
    state,
    getters,
    actions,
    mutations
}