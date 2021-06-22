<template>
  <div class="navbar">
    <humbuger @toggleClick="toggleSidebar" :is-active="sidebar.opened">
    </humbuger>
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
      ></screenfull>
      <avatar></avatar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Humbuger from '@/components/Hambuger/index.vue'
import { useStore } from '@/store/index'
import Screenfull from '@/components/Screenfull/index.vue'
import Avatar from './avatar/index.vue'
export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Humbuger,
    Screenfull,
    Avatar
  },

  setup () {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
      console.log('click')
    }
    // 从getters中获取sidebar
    const sidebar = computed(() => store.getters.sidebar)

    return {
      toggleSidebar,
      sidebar
    }
  }
})
</script>

<style lang="scss">
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21,41,.08);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
  }
}
</style>
