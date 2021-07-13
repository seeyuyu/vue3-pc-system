import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '@/store'
import variables from '@/styles/variables.scss'
export interface ISettingsState{
  theme: string,
  originalStyle: string
}
const state: ISettingsState = {
  theme: variables.theme,
  originalStyle: ''
}

type ValueOf<T> = T[keyof T]
interface ISettings {
  key: keyof ISettingsState;
  value: ValueOf<ISettingsState>;
}

const mutations: MutationTree<ISettingsState> = {
  CHANGE_SETTING (state, { key, value } :ISettings) {
    if (key in state) {
      (state[key] as ValueOf<ISettingsState>) = value
    }
  }
}

const actions: ActionTree<ISettingsState, IRootState> = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

const settings: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}
export default settings
// export default {
//   namespace: true,
//   state,
//   mutations,
//   actions
// }
