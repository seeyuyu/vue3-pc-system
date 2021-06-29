import { GetterTree } from 'vuex'
import { IRootState } from './index'

const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
  themeColor: state => state.settings.theme
}

export default getters
