<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    :predefine="themeColor"
    popper-class="theme-picker-dropdown"
  >

  </el-color-picker>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from 'vue'
import { useStore } from '@/store'
import useGenerateTheme from '@hooks/useGenerateTheme'
export default defineComponent({
  setup () {
    const store = useStore()
    const themeColor = ['#409eef', '1890ff']
    const defaultTheme = computed(() => store.state.settings.theme)
    const theme = ref('')
    const { generateTheme } = useGenerateTheme()

    watch(defaultTheme, value => {
      theme.value = value
    }, {
      immediate: true
    })

    watch(theme, value => {
      store.dispatch('settings/changeSetting', { key: 'theme', value })
      generateTheme(value)
    })
    return {
      themeColor, theme
    }
  }
})
</script>

<style lang="scss" >
.theme-picker{
  height: 26px !important;
  margin-right: 8px;
  .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }
}

.theme-message,
.theme-picker-dropdown{
  z-index: 99999 !important
}

.theme-picker-dropdown .el-color-dropdown__link-btn{
  display: none;
}
</style>
