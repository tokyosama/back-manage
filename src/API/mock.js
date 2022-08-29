//user.js=>mock.js=>data.js
import Mock from 'mockjs'

//引入假数据
import homeAPI from './MockServe/home.js'
//引入用户表格假数据
import userAPI from './MockServe/user.js'

//引入登录假数据
import loginAPI from './MockServe/permission.js'

Mock.mock('/home/getData',homeAPI.getStatisicalData)

//新增用户
Mock.mock(/user\/add/,'post',userAPI.createUser)
//修改用户
Mock.mock(/user\/edit/,'post',userAPI.updateUser)

//获取用户
Mock.mock(/user\/getUser/,'get',userAPI.getUserList)

//删除用户
Mock.mock(/user\/del/,'post',userAPI.deleteUser)


//用户登录
Mock.mock(/permission\/getMenu/,'post',loginAPI.getMenu)