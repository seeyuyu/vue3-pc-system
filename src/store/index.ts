import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import app, { IAppState } from '@/store/modules/app'
import tagsView, { ITagsViewState } from './modules/tagsView'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import settings, { ISettingsState } from './modules/settings'

// 声明全局状态类型，主要是定义的模块
export interface IRootState {
  app: IAppState,
  tagsView: ITagsViewState,
  settings: ISettingsState
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol()
// 这个key属于密钥，入口main.ts需要用到vue.use(store, key) 才能正常使用

export const persisteAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened']
})
export const persisteSettingsState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_setting',
  paths: ['setting.theme', 'setting.originalStyle']
})
export default createStore<IRootState>({
  plugins: [
    persisteAppState,
    persisteSettingsState
  ],
  getters,
  modules: {
    app,
    tagsView,
    settings
  }
})

export function useStore () {
  return baseUseStore(key)
}
