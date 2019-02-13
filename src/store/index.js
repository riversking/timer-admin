import Vue from 'vue'
import Vuex from 'vuex'
import { instance } from '../libs/fetchData'
import getters from './getters'
import { getToken } from '../libs/util'
import user from './modules/user'
import app from './modules/app'
import role from './modules/role'
import menu from './modules/menu'

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
    menu,
    getters
  }
})

instance.interceptors.request.use(config => {
  console.log('我是拦截器', store.getters)
  console.log('getToken()getToken()getToken()', getToken())
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default store
