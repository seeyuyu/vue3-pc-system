import { ElButton } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import 'element-plus/lib/theme-chalk/index.css'
import { App } from 'vue'
export default (app: App):void => {
  const components = [
    ElButton
  ]
  components.forEach(component => {
    app.component(component.name, component)
  })
  locale.use(lang)

  app.config.globalProperties.$ELEMENT = {
    size: 'medium'
  }
  // app.use(ElButton)
}
