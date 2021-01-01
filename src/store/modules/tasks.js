import axios from 'axios'
import api from '@/core/api'

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
        const response = await api.post(url, task)
        if(response.status === "200")
            commit("ADD_TASK", response.data)
        return response.status
    },
    async complate_task({ commit }, task_id) {
        let url = `task/complate-task/${task_id}/`
        const response = await axios.put(url)
        commit("SET_TASK", response.data)
    }
}

const mutations = {
    SET_TASKS: (state, data) => state.tasks = data,
    ADD_TASK: (state, task) => state.task = task,
    SET_TASK: (state, task) => {
        const index = state.tasks.findIndex(todo => todo.id === task.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, task);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}