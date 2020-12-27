import axios from 'axios'

const state = {
    task: {},
    tasks: {},
}

const getters = {
    getTask: state => state.task,
    getTasks: state => state.tasks,
}

const actions = {
    async get_tasks({ commit }, obj) {
        let url = `task/user-tasks/?page=${obj.page}`
        if (obj.complated !== undefined) url += `&complated=${obj.complated}`
        const response = await axios.get(url)
        commit("SET_TASKS", response.data.data)
        commit("SET_PAGINATION", response.data.pagination)
    },
    async add_task({ commit }, task) {
        let url = `task/create/`
        const response = await axios.post(url, task)
        console.log(response);
        if(response.status === "200")
            commit("ADD_TASK", response.data)
    }
}

const mutations = {
    SET_TASKS: (state, data) => state.tasks = data,
    ADD_TASK: (state, task) => state.task = task
}

export default {
    state,
    getters,
    actions,
    mutations
}