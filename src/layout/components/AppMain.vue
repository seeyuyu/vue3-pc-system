<template>
  <div class="app-main">
    <router-view v-slot={Component}>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { useStore } from '@/store'

export default defineComponent({
  name: 'AppMain',
  setup () {
    const store = useStore()
    const cachedViews = computed(
      () => {
        // console.log('store.state.tagsView.cachedViews is', store.state.tagsView.cachedViews)
        return store.state.tagsView.cachedViews
      }
      // {
      //   console.log('store is', store)
      //   // store.state.tagsView.cachedViews
      //   return []
      // }
    )
    const route = useRoute()
    const key = computed(() => route.path)
    return { key, cachedViews }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh- 50px);
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all .5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
