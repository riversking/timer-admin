import * as mt from '../mutation-types'
import { postData, pageSize } from '../../libs/fetchData'

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
  model: {
  },
  widget: {},
  permission: {}
}

const getters = {

}

const actions = {
  async getListData ({ commit }, obj) {
    try {
      commit(mt.SET_LOADING, true)
      let res = await postData(`${namespace}/roleList`, obj).catch(err => {
        commit('GLOBAL_ERR', err, { root: true })
      })

      switch (res.status) {
        case 0:
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
  // async getEditData({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await getData(`${namespace}/${obj.id}`).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //
  //     switch (res.status) {
  //       case 200:
  //         console.log("model",res.data)
  //         commit(mt.SET_MODEL, res.data)
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async read({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await getData(`${namespace}/read`, obj).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //
  //     switch (res.data.code) {
  //       case 0:
  //         commit(mt.SET_MODEL, res.data)
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async add({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await postData(`${namespace}/`, obj).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async edit({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await putData(`${namespace}/`, obj).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async deptRoleList({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await getData(`${namespace}/roleList/${obj.id}`).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async updatePermession({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await postData(`${namespace}/roleMenuUpd`,obj).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async fetchRoleTree({ commit }, obj) {
  //   try {
  //     commit(mt.SET_LOADING, true)
  //     let res = await getData(`admin/menu/roleTree/${obj.roleCode}`).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //     console.log("测试", res)
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     commit(mt.SET_LOADING, false)
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // },
  // async remove({ commit }, obj) {
  //   try {
  //     let res = await delData(`${namespace}/${obj.id}`).catch(err => {
  //       commit('GLOBAL_ERR', err, { root: true })
  //     })
  //
  //     switch (res.data.code) {
  //       case 0:
  //         break
  //       default:
  //         break
  //     }
  //
  //     return res.data
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // }
}

const mutations = {
  [mt.SET_LOADING] (state, bool) {
    state.loading = bool
  },
  [mt.SET_LIST_DATA] (state, payload) {
    state.listData = payload.records
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
