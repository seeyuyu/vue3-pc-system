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
