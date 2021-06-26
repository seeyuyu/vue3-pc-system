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
  // 清空可显示列表
  DEL_ALL_VISITED_VIEWS (state) {
    const affixTags = state.visitedViews.filter(tag =>
      tag.meta.affix
    )
    state.visitedViews = affixTags
  },
  // 添加缓存
  ADD_CACHED_VIEW (state, view) {
    // debugger
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_ALL_CACHED_VIEWS (state) {
    state.cachedViews = []
  },
  // 删除指定的view缓存
  DEL_CACHED_VIEW (state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_OTHERS_VISITED_VIEWS (state, view) {
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix || (tag.path === view.path))
  },
  DEL_OTHERS_CACHED_VIEWS (state, view) {
    state.cachedViews = state.cachedViews.filter(item => item === view.name)
    console.log('state.cachedViews is', state.cachedViews)
  }
}

const actions: ActionTree<ITagsViewState, IRootState> = {
  addView ({ dispatch }, view: RouteRecordRaw) {
    // console.log('view is', view)
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
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
  // 清空可显示列表和缓存列表
  delAllView ({ dispatch }) {
    return new Promise(resolve => {
      dispatch('delAllVisitedView')
      dispatch('delAllCachedViews')
      resolve(null)
    })
  },

  delVisitedView ({ commit }, view: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', view)
  },

  // 添加缓存列表
  addCachedView ({ commit }, view: RouteRecordRaw) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 删除
  delCachedView ({ commit }, view:RouteRecordRaw) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve(null)
    })
  },

  // 清空可显示列表
  delAllVisitedView ({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
  },
  // 清空缓存列表
  delAllCachedViews ({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  },
  // 关闭其他tag
  delOthersViews ({ dispatch }, view: RouteRecordRaw) {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
  },
  delOthersVisitedViews ({ commit }, view: RouteRecordRaw) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
  },
  delOthersCachedViews ({ commit }, view: RouteRecordRaw) {
    commit('DEL_OTHERS_CACHED_VIEWS', view)
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
