import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '@/store'
import { login } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export interface IUserState {
  token: string,
}

export interface IUserInfo {
  username: string,
  password: string
}

type IMutations = MutationTree<IUserState>

type IActions = ActionTree<IUserState, IRootState>

const state: IUserState = {
  token: ''
}

// 定义mutation
const mutations: IMutations = {
  SET_TOKEN (state, token: string) {
    state.token = token
  }
}
const actions: IActions = {
  login ({ commit }, userInfo: IUserInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(response => {
        const { data } = response
        console.log('data', data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit, dispatch }) {
    return new Promise<void>(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },
  resetToken ({ commit }) {
    return new Promise<void>(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}
const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user