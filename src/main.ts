import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import installElementPlus, { Size } from './plugins/element'

// import 'normalize.css'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import initSvgIcon from '@/icons/index'

const app = createApp(App)
installElementPlus(app)
app.use(store, key).use(router).use(initSvgIcon).mount('#app')
// vue实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT:{size: Size}
  }
}
