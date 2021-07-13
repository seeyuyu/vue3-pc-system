import { computed } from 'vue'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/getStyleTemplate'
import { useStore } from '@/store'
import { generateColors } from '@/utils/color'
import { writeNewStyle } from '@/utils/writeNewStyle'

export const useGenerateTheme = () => {
  const store = useStore()

  const defaultTheme = computed(() => store.state.settings.theme)
  // 获取element-ui的主题文件，通过ajax获取，作为替换模板
  const originalStyle = computed(() => store.state.settings.originalStyle)

  // 生成新主题的方法
  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    },
    // 将color的色值，作为渐变色计算函数中的的primary值，然后将其转化为一系列的rgba色值，
    generateColors(color))
    // 插入到html中的方法，originalStyle.value为一个很长的css字符串，colors为一个颜色对应字典，值如下
    // 'light-1': '#333',
    // 'light-2': '#eee',
    writeNewStyle(originalStyle.value, colors)
  }

  // 远程获取elementUI的主题文件作为模板，然后进行变量替换，替换成我们所选主题色
  const { getThemeChalkStyle } = useThemeFiles()
  // 如果主题模板不存在，发起请求，获取，并存入originalStyle中
  if (!originalStyle.value) {
    getThemeChalkStyle().then(data => {
      const styleValue = getStyleTemplate(data as string)
      store.dispatch('settings/changeSetting', { key: 'originalStyle', value: styleValue })
      generateTheme(defaultTheme.value)
    })
  } else {
    // 根据主题色生成主题 插入到html中
    generateTheme(defaultTheme.value)
  }
  return {
    generateTheme
  }
}
