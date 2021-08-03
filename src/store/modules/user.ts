import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '@/store'
import { getUserInfo, getUsers, login, addUser, updateUser, removeUser } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

interface Role {
  id: number;
  name: string;
  description: string;
}
// 查询user参数类型
export interface IUserQuery {
  pageNum?: number;
  pageSize?: number;
  mobile?: string;
  status?: boolean;
  username?: string;
}

export interface Profile {
  avatar: string;
  email: string;
  id: number;
  isSuper: boolean;
  mobile: string;
  status: boolean;
  username: string;
  description: string;
  roles: Role[];
  roleIds?: number[]
}
export interface IUserState {
  token: string | null,
  userInfo: Profile | null,
  users: Profile[],
  count: number,
  roles: Role[]| null
}

export interface IUserInfo {
  username: string,
  password: string
}
// 用户编辑/添加查询类型
export type IProfileQuery = Profile & {
  pageNum?: number;
  pageSize?: number;
}

type IMutations = MutationTree<IUserState>

type IActions = ActionTree<IUserState, IRootState>

const state: IUserState = {
  token: '',
  userInfo: null,
  users: [],
  count: 0,
  roles: null
}

// 定义mutation
const mutations: IMutations = {
  SET_TOKEN (state, token: string) {
    state.token = token
  },
  SET_USER_INFO (state, data: Profile) {
    state.userInfo = data
  },
  SET_USERS (state, data: Profile[]) {
    state.users = data
  },
  SET_COUNT (state, data: number) {
    state.count = data
  },
  SET_ROLES (state, data: Role[]) {
    state.roles = data
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
  },
  getAllUsers ({ commit }, params: IUserQuery = {}) {
    return new Promise<void>((resolve, reject) => {
      getUsers(params).then(res => {
        const { data } = res
        commit('SET_USERS', data.users)
        commit('SET_COUNT', data.count)
        resolve()
      }).catch(reject)
    })
  },
  addUser ({ dispatch }, data: IProfileQuery) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, ...params } = data
      addUser(params).then(res => {
        if (res.code === 0) {
          dispatch('getAllUsers', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  },
  editUser ({ dispatch }, data: IProfileQuery) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, ...params } = data
      updateUser(params.id, params).then(res => {
        if (res.code === 0) {
          dispatch('getAllUsers', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  },
  removeUser ({ dispatch }, data: IProfileQuery) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, id } = data
      removeUser(id).then(res => {
        if (res.code === 0) {
          dispatch('getAllUsers', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  },

  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        const { roles, ...info } = data
        commit('SET_USER_INFO', info)
        commit('SET_ROLES', roles)
        resolve(roles)
      }).catch(reject)
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
