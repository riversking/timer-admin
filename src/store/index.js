import Vue from 'vue'
import Vuex from 'vuex'
import { instance } from '../libs/fetchData'
import getters from './getters'
import { getToken } from '../libs/auth'
import user from './modules/user'
import app from './modules/app'
import role from './modules/role'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules: {
    user,
    app,
    role,
    getters
  }
})

instance.interceptors.request.use(config => {
  console.log('我是拦截器', store.getters)
  if (store.getters.access_token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default store
