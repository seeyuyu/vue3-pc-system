<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view v-if="showTagsView"></tags-view>
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
import { defineComponent, ref, computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
import RightPanel from '@/components/RightPanel/index.vue'
import Settings from '@/components/Settings/index.vue'
import varibalse from '@/styles/variables.scss'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Layout',
  setup () {
    const store = useStore()
    const showSetting = ref(false)
    const openSetting = () => {
      showSetting.value = true
    }

    const showTagsView = computed(() => store.state.settings.tagsView)
    return {
      showSetting,
      openSetting,
      showTagsView,
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
