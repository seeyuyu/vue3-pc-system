<template>
  <div class="tags-view-container">
    <scroll-panel>
      <div class="tags-view-wrapper">
        <router-link
          class="tags-view-item"
          :class="{ active: isActive(tag) }"
          :style="{
            backgroundColor: isActive(tag)?themeColor : '',
            borderColor: isActive(tag)?themeColor : '',

          }"
          v-for="(tag, index) in visitedTags"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          :key="index"
          tag="span"
        >
          <el-dropdown
            trigger="contextmenu"
            @command="command => handleTagCommand(command, tag)"
            >
            <span>
              {{ tag.meta.title || "haha" }}
              <span
                class="el-icon-close"
                v-if="!isAffix(tag)"
                @click.prevent.stop="closeSelectedTag(tag)"
              >
              </span>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item>刷新</el-dropdown-item>
                <el-dropdown-item>关闭所有</el-dropdown-item>
                <el-dropdown-item>关闭其他</el-dropdown-item> -->
                <el-dropdown-item command="refresh">刷新</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item
                  command="self"
                  v-if="!tag.meta || !tag.meta.affix"
                  >关闭</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </router-link>
      </div>
    </scroll-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted, nextTick } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { RouteLocationWithFullPath } from '@/store/modules/tagsView'
import path from 'path'
import { routes } from '@/router'
import ScrollPanel from './ScrollPanel.vue'

enum TagCommandType {
  All = 'all',
  Other = 'other',
  Self = 'self',
  Refresh = 'refresh'
}

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
      // debugger
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
    // 右键刷新页面
    const refreshSelectedTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        nextTick(() => {
          router.replace('/redirect' + fullPath)
        })
      })
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

    const handleTagCommand = (
      command: TagCommandType,
      view: RouteLocationWithFullPath
    ) => {
      // debugger
      switch (command) {
        case TagCommandType.All:
          handleCloseALLTag(view)
          break
        case TagCommandType.Other:
          handleCloseOtherTag(view)
          break
        case TagCommandType.Self:
          closeSelectedTag(view)
          break
        case TagCommandType.Refresh:
          refreshSelectedTag(view)
          break
      }
    }
    // 关闭所有后，切换到最后一个剩下的tag
    const handleCloseALLTag = (view: RouteLocationWithFullPath) => {
      // debugger
      store.dispatch('tagsView/delAllView').then(() => {
        toLastView(visitedTags.value, view)
      })
    }
    // 关闭其他的标签
    const handleCloseOtherTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delOthersViews', view).then(() => {
        // 删除所有路由后，激活此路由
        if (!isActive(view)) {
          router.push(view.path)
        }
      })
    }
    const themeColor = computed(() => store.getters.themeColor)
    return {
      visitedTags,
      isActive,
      closeSelectedTag,
      isAffix,
      handleTagCommand,
      themeColor
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
    // height: 34px;
    // display: flex;
    // align-items: center;
    // flex-wrap: nowrap;
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
      margin-top: 4px;
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
