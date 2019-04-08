import * as mt from '../mutation-types'
import { postData, pageSize } from '../../libs/fetchData'

const namespace = '/api/v1/user/dept'

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
  async getListData ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/getDeptTree`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
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
  }
}

const mutations = {
  [mt.SET_LOADING] (state, bool) {
    state.loading = bool
  },
  [mt.SET_LIST_DATA] (state, payload) {
    console.log(payload.rsp)
    state.listData = payload.datas
    // state.permission = payload.permission
  },
  [mt.SET_MODEL] (state, payload) {
    console.log('payload', payload)
    state.menuModel = payload.datas
    // state.widget.authList = payload.widget.authList
  },
  ['SET_MENU_LIST'] (state, payload) {
    state.listData = payload.datas
  },
  ['MENU_BY_ROLE_ID'] (state, payload) {

  },
  ['MENU_BY_USER_ID'] (state, payload) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
