import { Module, ActionTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'

export interface RouteLocationWithFullPath extends RouteRecordNormalized {
  fullPath?: string;
}
export interface ITagsViewState {
  // 存放当前显示的集合
  // visitedViews: RouteRecordRaw[]
  visitedViews: RouteLocationWithFullPath[],
  // 根据路由name缓存
  cachedViews: RouteRecordRaw[]
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
  },
  // 添加缓存
  ADD_CACHED_VIEW (state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (view.meta.cache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_ALL_CACHED_VIEWS (state) {
    state.cachedViews = []
  }
}

const actions: ActionTree<ITagsViewState, IRootState> = {
  addView ({ dispatch }, view: RouteRecordRaw) {
    // console.log('view is', view)
    dispatch('addVisitedView', view)
  },
  addVisitedView ({ commit }, view: RouteRecordRaw) {
    commit('ADD_VISITED_VIEW', view)
  },
  delView ({ dispatch }, view: RouteRecordRaw) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve(null)
    })
  },
  delVisitedView ({ commit }, view: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', view)
  },
  addCachedView ({ commit }, view: RouteRecordRaw) {
    commit('ADD_CACHED_VIEW', view)
  }
}

const tagsView: Module<ITagsViewState, IRootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations,
  actions
}
export default tagsView
