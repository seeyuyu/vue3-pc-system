<template>
  <div class="tags-view-container">
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
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)">
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute, RouteRecordRaw } from 'vue-router'
export default defineComponent({
  name: 'TagsView',
  setup () {
    const store = useStore()
    const route = useRoute()
    const visitedTags = computed(() => store.state.tagsView.visitedViews)
    console.log('route visitedTags', route, visitedTags)
    const addTags = () => {
      const { name } = route
      console.log('addTags visitedTags is', visitedTags)
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
    onMounted(() => addTags())

    const isActive = (tag: RouteRecordRaw) => tag.path === route.path

    const closeSelectedTag = (view: RouteRecordRaw) => {
      store.dispatch('tagsView/delView', view)
    }
    return {
      visitedTags,
      isActive,
      closeSelectedTag
    }
  }
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba($color: #000000, $alpha: 0.12),
  //   0 0 3px 0 rgba($color: #000000, $alpha: 0.4);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
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
      &:active {
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
