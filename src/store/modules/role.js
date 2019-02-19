import * as mt from '../mutation-types'
import { postData, pageSize } from '../../libs/fetchData'

const namespace = '/api/v1/user/role'

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
  roleList: [],
  roleModel: {
    roleName: '',
    roleCode: '',
    roleDesc: ''
  },
  widget: {},
  permission: {}
}

const getters = {}

const actions = {
  async getListData ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/rolePage`, obj).catch(err => {
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
  },
  async addRole ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/addRole`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })
      switch (res.status) {
        case 200:
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
  async getRoleList ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/roleList`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })
      switch (res.status) {
        case 200:
          commit('SET_ROLE_LIST', res.data)
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
  async updateRole ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/updateRoleById`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })
      switch (res.status) {
        case 200:
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
  async read ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/roleDetail`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })
      console.log('res.datares.datares.data', res)
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
  async remove ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/deleteRole`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })
      switch (res.status) {
        case 200:
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
    console.log(payload)
    state.listData = payload.datas.records
    state.total = parseInt(payload.datas.total)
    // state.permission = payload.permission
  },
  [mt.SET_MODEL] (state, payload) {
    console.log('payload', payload)
    state.roleModel = payload.datas
    // state.widget.authList = payload.widget.authList
  },
  'SET_ROLE_LIST' (state, payload) {
    state.roleList = payload.datas
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
