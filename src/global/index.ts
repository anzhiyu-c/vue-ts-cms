/*
 * @Description: 公共插件出口文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-08-28 13:06:10
 * @LastEditTime: 2021-09-10 09:29:27
 * @LastEditors: 安知鱼
 */
import { App } from 'vue'

import registerElement from './register-element'
import registerProperties from './register-properties'
export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
