<template>
  <div class="tags-view-container">
    <scroll-panel>
      <div class="tags-view-wrapper">
        <router-link
          class="tags-view-item"
          :class="{ active: isActive(tag) }"
          v-for="(tag, index) in visitedTags"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          :key="index"
          tag="span"
        >
          {{ tag.meta.title || "haha" }}
          <span
            class="el-icon-close"
            v-if="!isAffix(tag)"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
          </span>
        </router-link>
      </div>
    </scroll-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { RouteLocationWithFullPath } from '@/store/modules/tagsView'
import path from 'path'
import { routes } from '@/router'
import ScrollPanel from './ScrollPanel.vue'
export default defineComponent({
  name: 'TagsView',
  components: {
    ScrollPanel
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const visitedTags = computed(() => store.state.tagsView.visitedViews)
    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
    }
    watch(
      () => route.path,
      () => {
        addTags()
      }
    )
    onMounted(() => {
      initTags()
      addTags()
    })

    const isActive = (tag: RouteLocationWithFullPath) =>
      tag.path === route.path

    const closeSelectedTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delView', view).then(() => {
        if (isActive(view)) {
          toLastView(visitedTags.value, view)
        }
      })
    }

    const fillterAffixTags = (
      routes: Array<RouteLocationWithFullPath | RouteRecordRaw>,
      bashPath = '/'
    ) => {
      let tags: RouteLocationWithFullPath[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(bashPath, route.path)
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: {
              ...route.meta
            }
          } as RouteLocationWithFullPath)
        }

        if (route.children) {
          const childTags = fillterAffixTags(route.children, route.path)
          if (childTags.length) {
            tags = [...tags, ...childTags]
          }
        }
      })
      return tags
    }
    const initTags = () => {
      const affixTags = fillterAffixTags(routes)
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    }
    // 拿到栈顶的元素
    const toLastView = (
      visitedViews: RouteLocationWithFullPath[],
      view: RouteLocationWithFullPath
    ) => {
      const lastView = visitedViews[visitedViews.length - 1]
      // console.log('router is ', router)
      // console.log('route is ', route)

      if (lastView) {
        router.push(lastView.fullPath as string)
      } else {
        if (view.name === 'Dashboard') {
          router.replace({ path: ('/redirect' + view.fullPath) as string })
        } else {
          router.push('/')
        }
      }
    }
    const isAffix = (tag: RouteLocationWithFullPath) => {
      return tag.meta && tag.meta.affix
    }
    return {
      visitedTags,
      isActive,
      closeSelectedTag,
      isAffix
    }
  }
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  // width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba($color: #000000, $alpha: 0.12),
  //   0 0 3px 0 rgba($color: #000000, $alpha: 0.4);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  .tags-view-wrapper {
    height: 34px;
    display: flex;
    align-items: center;
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #dbdce5;
      background: #fff;
      color: #494949;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-right: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .el-icon-close {
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.1s cubic-bezier(0.645, 045, 0.355, 1);
    transform-origin: 100% 50%;
    &::before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
