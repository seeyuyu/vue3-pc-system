<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGenerateTheme } from '@/hooks/useGenerateTheme'
export default defineComponent({
  name: 'App',
  setup () {
    useGenerateTheme()
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

</style>
