import * as mt from '../mutation-types'
import {postData, pageSize} from '../../libs/fetchData'

const namespace = '/user/role'

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
  model: {},
  widget: {},
  permission: {}
}

const getters = {}

const actions = {
  async getListData({commit}, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/roleList`, obj).catch(err => {
        commit('GLOBAL_ERR', err, {root: true})
      })
      console.log("res.datares.datares.data", res)
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
  }
}

const mutations = {
  [mt.SET_LOADING](state, bool) {
    state.loading = bool
  },
  [mt.SET_LIST_DATA](state, payload) {
    console.log("payload", payload)
    state.listData = payload.rsp.records
    state.total = parseInt(payload.total)
    // state.permission = payload.permission
  }
  // [mt.SET_MODEL](state, payload) {
  //   state.model = payload
  //   // state.widget.authList = payload.widget.authList
  // },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
