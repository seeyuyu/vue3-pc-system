<template>
  <div>
    <h3 style="color:green;" @click="isCollapse = !isCollapse">测试</h3>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { routes } from '@/router'
import variables from '@/styles/variables.scss'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const activeMenu = computed(() => {
      const { path, meta } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 菜单展开收起状态 需要存储在store中
    const isCollapse = computed(() => !store.getters.sidebar.opened)

    const menuRoutes = computed(() => {
      // console.log('route is', routes)
      return routes
    })
    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes
    }
  }
})
</script>
