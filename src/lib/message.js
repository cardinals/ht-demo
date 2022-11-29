/*
 * @Author: licongzheng 
 * @Date: 2020-07-14 11:05:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-02-03 16:40:12
 */
import { Message } from 'view-design'

let messageInstance = null;
const resetMessage = (type, options) => {
  if (messageInstance) {
    messageInstance.destroy()
  }
  Message[type](options)
  messageInstance = Message
}
['error', 'success', 'info', 'warning', 'loading'].forEach(type => {
  resetMessage[type] = options => {
    Message.config({
      top: 100,
      duration: 1.5
    })
    return resetMessage(type, options)
  }
})
export const message = resetMessage