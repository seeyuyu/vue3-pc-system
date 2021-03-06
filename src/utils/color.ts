import color from 'css-color-function'
import { formula, IObject } from './constants'

export const generateColors = (primary: string):IObject => {
  const colors = {} as IObject
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  return colors
}

// export const formula: IObject = {
//   'shade-1': 'color(primary shade(10%))',
//   'light-1': 'color(primary tint(10%))',
//   'light-2': 'color(primary tint(20%))',
//   'light-3': 'color(primary tint(30%))',
//   'light-4': 'color(primary tint(40%))',
//   'light-5': 'color(primary tint(50%))',
//   'light-6': 'color(primary tint(60%))',
//   'light-7': 'color(primary tint(70%))',
//   'light-8': 'color(primary tint(80%))',
//   'light-9': 'color(primary tint(90%))'
// }

// generateColors 将上面的格式，加入primary之后，将其转化为，

// export const formula: IObject = {
//   'shade-1': '#ccc',
//   'light-1': '#eee',
//   'light-2': '#eee',
//   'light-3': '#eee',
//   'light-4': '#eee',
//   'light-5': ’#eee',
//   'light-6': ‘#eee',
//   'light-7': ’#eee',
//   'light-8': ‘#eee',
//   'light-9': ’#eee',
// }
