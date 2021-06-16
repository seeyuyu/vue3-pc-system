import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
// 使用require.context加载 ./svg下面的svg文件
const req = require.context('./svg', false, /\.svg$/)
// 导入 ./svg下面的所有 .svg文件
const requireAll = (requireContent: ReturnType<typeof require.context>) =>
  requireContent.keys().map(requireContent)
requireAll(req)

export default (app: App): void => {
  app.component('svg-icon', SvgIcon)
}
