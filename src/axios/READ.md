<!--
 * @Descripttion: 
 * @Author: licongzheng
 * @Date: 2020-07-14 15:57:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-10 16:08:06
--> 
# url: String, 请求路径
# params: Object, 请求参数
# header: Object, 请求头
不传时默认为 {'Content-Type': 'application/x-www-form-urlencoded'}
json数据传入 {'Content-Type': 'application/json'} 或者 "json"
formData传入 {'Content-Type': 'multipart/form-data'} 或者 "form"

get(url, params)
post(url, params, header)
put(url, params, header)
delete(url, params, header)