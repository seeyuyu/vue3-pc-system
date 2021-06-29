<template>
  <div class="navbar">
    <humbuger @toggleClick="toggleSidebar" :is-active="sidebar.opened">
    </humbuger>
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <!-- 设置 -->
      <div
        @click="openShowSetting"
        class="setting right-menu-item hover-effect"
      >
        <i class="el-icon-s-tools"></i>
      </div>
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
  emits: ['showSetting'],
  setup (props, { emit }) {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
      console.log('click')
    }
    // 从getters中获取sidebar
    const sidebar = computed(() => store.getters.sidebar)
    const openShowSetting = () => {
      emit('showSetting', true)
    }

    return {
      toggleSidebar,
      openShowSetting,
      sidebar
    }
  }
})
</script>

<style lang="scss">
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    .setting {
      font-size: 26px;
    }
    // &-item {
    //   padding: 0 8px;
    //   font-size: 18px;
    // }
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

  }
}
</style>
