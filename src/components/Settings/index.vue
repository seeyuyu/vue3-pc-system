<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker></theme-picker>
    </div>

    <!-- <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="tagsView" class="drawer-switch"></el-switch>
    </div>

    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="showSidebarLogo" class="drawer-switch"></el-switch>
    </div> -->

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ThemePicker from '@/components/ThemePicker/index.vue'

export default defineComponent({
  name: 'Settings',
  // setup () {

  // }
  components: {
    ThemePicker
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item{
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 16px;
    color: rgba(0,0,0,.65)
  }
}
</style>
