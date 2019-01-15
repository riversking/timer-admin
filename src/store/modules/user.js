import { postData } from '../../libs/fetchData'
import { setToken, getToken } from '../../libs/util'
import { setStore } from '../../libs/store'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  actions: {
    // 登录
    async userLogin ({ commit }, obj) {
      try {
        let res = await postData(`/user/login`, obj).catch(err => {
          commit('GLOBAL_ERR', err, { root: true })
        })
        console.log('res', res.data.rsp.accessToken)
        switch (res.status) {
          case 200:
            setToken(res.data.rsp.accessToken)
            commit('SET_ACCESS_TOKEN', res.data.rsp.accessToken)
            commit('SET_REFRESH_TOKEN', res.data.refresh_token)
            // commit('SET_PERMISSIONS', resUserInfo.data.data.permissions)
            break
          default:
            break
        }

        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    // 退出登录
    // handleLogOut ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('setToken', '')
    //       commit('setAccess', [])
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //     // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
    //     // commit('setToken', '')
    //     // commit('setAccess', [])
    //     // resolve()
    //   })
    // },
    // 获取用户相关信息
    getUserInfo ({ state, commit }, token) {
      return 'success'
    }
  },
  mutations: {
    ['SET_ACCESS_TOKEN'] (state, access_token) {
      console.log('access_token', access_token)
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    ['SET_REFRESH_TOKEN'] (state, rfToken) {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    }
  }
}
