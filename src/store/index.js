import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import tasks from './modules/tasks'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users, tasks, common
  }
})
