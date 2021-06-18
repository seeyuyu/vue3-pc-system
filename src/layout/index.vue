<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      sidebar
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar</div>
        <navbar></navbar>
        <div class="tags-view">tagsview</div>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
export default defineComponent({
  name: 'Layout',
  // setup () {

  // },
  components: {
    Sidebar,
    AppMain,
    Navbar
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
    .header {
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      // 84 = 50 +30
      min-height: calc(100vh - 84px);
      background: red;
    }
  }
}
</style>
