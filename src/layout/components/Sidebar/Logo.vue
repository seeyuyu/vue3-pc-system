<template>
  <div class="sidebar-logo-container" :class="{collapse: collapse}">
    <transition name="sidebarLogoFade">

      <router-link v-if="collapse" key="collapse" to="/"
      class="sidebar-logo-link">
        <img v-if="logo" :src="logo" alt=""  class="sidebar-logo"/>
        <h1 v-else  class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>

      <router-link class="sidebar-logo-link" key="expand" v-else to="/">
        <img class="sidebar-logo" :src="logo" v-if="logo" alt="" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },

  setup () {
    return {
      title: 'Vue System',
      // logo: require('@/assets/logo.png'),
      logo: require('@/assets/logo.png')
    }
  }
})
</script>
<style lang="scss" scoped>
.sidebar-logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #2b2f3a;
  overflow: hidden;
  .sidebar-logo-link {
    display: block;
    width: 100%;
    height: 100%;
    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sidebar-title {
      display: inline-block;
      color: #fff;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
