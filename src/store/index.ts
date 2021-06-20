import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import app, { IAppState } from '@/store/modules/app'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
// 声明全局状态类型，主要是定义的模块
export interface IRootState {
  app: IAppState
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol()
// 这个key属于密钥，入口main.ts需要用到vue.use(store, key) 才能正常使用

export const persisteAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened']
})

export default createStore<IRootState>({
  plugins: [
    persisteAppState
  ],
  getters,
  modules: {
    app
  }
})

export function useStore () {
  return baseUseStore(key)
}
