import { computed } from 'vue'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/getStyleTemplate'
import { useStore } from '@/store'
import { generateColors } from '@/utils/color'
import { writeNewStyle } from '@/utils/writeNewStyle'

export const useGenerateTheme = () => {
  const store = useStore()

  const defaultTheme = computed(() => store.state.settings.theme)
  const originalStyle = computed(() => store.state.settings.originalStyle)

  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    }, generateColors(color))
    writeNewStyle(originalStyle.value, colors)
  }
  const { getThemeChalkStyle } = useThemeFiles()
  if (!originalStyle.value) {
    getThemeChalkStyle().then(data => {
      const styleValue = getStyleTemplate(data as string)
      store.dispatch('settings/changeSetting', { key: 'originalStyle', value: styleValue })
      generateTheme(defaultTheme.value)
    })
  } else {
    generateTheme(defaultTheme.value)
  }
  return {
    generateTheme
  }
}
