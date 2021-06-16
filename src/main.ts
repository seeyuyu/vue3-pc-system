import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// import 'normalize.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import initSvgIcon from '@/icons/index'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(initSvgIcon).mount('#app')
