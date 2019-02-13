import * as mt from '../mutation-types'
import {postData, pageSize} from '../../libs/fetchData'

const namespace = '/user/menu'

const state = {
  loading: true,
  total: 0,
  query: {
    page: 1,
    pageSize: pageSize,
    keywords: '',
    sortKey: 'id',
    sortOrder: 'desc'
  },
  listData: [],
  menuModel: [],
  widget: {},
  permission: {}
}

const getters = {}

const actions = {
  async getListData({commit}, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/getMenuTree`, obj).catch(err => {
        commit('GLOBAL_ERR', err, {root: true})
      })
      switch (res.status) {
        case 200:
          commit(mt.SET_LIST_DATA, res.data)
          break
        default:
          break
      }

      commit(mt.SET_LOADING, false)

      return res.data
    } catch (error) {
      console.log('error: ', error)
    }
  },
  async read({commit}, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/getMenuById`, obj).catch(err => {
        commit('GLOBAL_ERR', err, {root: true})
      })
      console.log("res.datares.datares.data", res)
      switch (res.status) {
        case 200:
          commit(mt.SET_MODEL, res.data)
          break
        default:
          break
      }
      commit(mt.SET_LOADING, false)
      return res.data
    } catch (error) {
      console.log('error: ', error)
    }
  },
}

const mutations = {
  [mt.SET_LOADING](state, bool) {
    state.loading = bool
  },
  [mt.SET_LIST_DATA](state, payload) {
    console.log(payload.rsp)
    state.listData = payload.rsp
    // state.permission = payload.permission
  },
  [mt.SET_MODEL](state, payload) {
    console.log("payload", payload)
    state.menuModel = payload.rsp
    // state.widget.authList = payload.widget.authList
  },
  ["SET_MENU_LIST"](state, payload) {
    state.listData = payload.rsp
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
