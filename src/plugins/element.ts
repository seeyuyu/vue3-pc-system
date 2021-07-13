import {
  ElButton, ElMenuItem, ElMessage, ElMessageBox, ElNotification, ElSubmenu, ElMenu, ElBreadcrumb, ElBreadcrumbItem, ElCol, ElDropdown, ElDropdownItem, ElDropdownMenu, ElScrollbar, ElDrawer, ElColorPicker, ElSwitch
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
// import 'element-plus/lib/theme-chalk/index.css'
import { App } from 'vue'
import 'dayjs/locale/zh-cn'
export type Size='default' | 'medium' | 'small' | 'mini'

export default (app: App):void => {
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElScrollbar,
    ElDrawer,
    ElColorPicker,
    ElSwitch

  ]
  components.forEach(component => {
    app.component(component.name, component)
  })
  locale.use(lang)

  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$ELEMENT = {
    size: 'medium'
  }
  // app.use(ElButton)
}
