import { IObject } from './constants'

// 写入新的css样式
export const writeNewStyle = (originalStyle: string, colors: IObject): void => {
  // 'light-1': '#333',
  // 'light-2': '#eee',
  // 遍历colors对象，将其色值一个一个替换到originalStyle.value的css字符串进去
  Object.keys(colors).forEach(key => {
    const reg = new RegExp('(:|\\s+)' + key, 'g')
    originalStyle = originalStyle.replace(reg, '$1' + colors[key])
  })
  // 替换完成之后，将其插入到html中
  const chalkStyle = document.getElementById('chalk-theme-style')
  if (!chalkStyle) {
    const style = document.createElement('style')
    style.innerText = originalStyle
    style.id = 'chalk-theme-style'
    document.head.appendChild(style)
  } else {
    (chalkStyle as HTMLElement).innerText = originalStyle
  }
}
