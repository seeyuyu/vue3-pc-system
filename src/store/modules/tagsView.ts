import { Module, ActionTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { RouteRecordRaw } from 'vue-router'

export interface ITagsViewState {
  // 存放当前显示的集合
  visitedViews: RouteRecordRaw[]
}

const mutations: MutationTree<ITagsViewState> = {
  ADD_VISITED_VIEW (state, view) {
    // 去重
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'tag-name'
    }))
  },
  DEL_VISITED_VIEW (state, view) {
    const i = state.visitedViews.indexOf(view)
    if (i > -1) {
      state.visitedViews.splice(i, 1)
    }
  }
}

const actions: ActionTree<ITagsViewState, IRootState> = {
  addView ({ dispatch }, view: RouteRecordRaw) {
    console.log('view is', view)
    dispatch('addVisitedView', view)
  },
  addVisitedView ({ commit }, view: RouteRecordRaw) {
    commit('ADD_VISITED_VIEW', view)
  },
  delView ({ dispatch }, view: RouteRecordRaw) {
    dispatch('delVisitedView', view)
  },
  delVisitedVIew ({ commit }, view: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', view)
  }
}

const tagsView: Module<ITagsViewState, IRootState> = {
  namespaced: true,
  state: {
    visitedViews: []
  },
  mutations,
  actions
}
export default tagsView
