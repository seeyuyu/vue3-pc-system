<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? '404' : 'bug'"
      @click="handleClick"
    ></svg-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import screenfull, { Screenfull } from 'screenfull'
export default defineComponent({
  name: 'ScreenFull',
  setup () {
    const proxy = getCurrentInstance()?.proxy
    const isFullscreen = ref(false)
    const handleClick = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        return
      }
      return proxy?.$message({
        message: '浏览器不支持',
        type: 'warning'
      })
    }
    const change = () => {
      isFullscreen.value = (screenfull as Screenfull).isFullscreen
    }
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    }

    onMounted(() => {
      init()
    })
    return {
      isFullscreen,
      handleClick
    }
  }
})
</script>
