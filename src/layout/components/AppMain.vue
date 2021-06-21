<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="put-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'AppMain',
  setup () {
    const cachedViews = ref([])
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

// .fade-transform-enter-active,
// .fade-transform-leave-active {
//   transition: all .3s;
// }

// .fade-transform-enter-from {
//   opacity: 0;
//   transform: translateX(-10px);
// }
// .fade-transform-leave-to {
//   opacity: 0;
//   transform: translateX(10px);
// }
</style>
