<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
    </div>
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="SettingsPanelWidth"
      >
      <settings/>
    </right-panel>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
import RightPanel from '@/components/RightPanel/index.vue'
import Settings from '@/components/Settings/index.vue'
import varibalse from '@/styles/variables.scss'

export default defineComponent({
  name: 'Layout',
  setup () {
    const showSetting = ref(false)
    const openSetting = () => {
      showSetting.value = true
    }
    return {
      showSetting,
      openSetting,
      SettingsPanelWidth: varibalse.settingPanelWidth
    }
  },
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView,
    RightPanel,
    Settings
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      // 84 = 50 +30
      min-height: calc(100vh - 84px);
      background: #ccc;
    }
  }
}
</style>
