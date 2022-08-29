//user.js=>mock.js=>data.js

//  将接口请求全部放在这里 

// 引入自己的axios
import axios from "./axios.js"

//  获取用户登录接口请求
export const getMenu= (mydata) =>{
     return axios.Request({
        url:'/permission/getMenu',
        method:'POST',
        data:mydata
     }) 
}


//获取首页各种数据
export const getData= () =>{
   return axios.Request({
      url:'/home/getData',
      method:'GET',
      // data:mydata
   }) 
}

//用户页添加用户
export const addUserData= (mydata) =>{
   return axios.Request({
      url:'/user/add',
      method:'POST',
      data:mydata
   }) 
}

//用户页编辑用户
export const editUserData= (mydata) =>{
   return axios.Request({
      url:'/user/edit',
      method:'POST',
      data:mydata
   }) 
}

//用户页获取用户列表
export const getUser= (mydata) =>{
   return axios.Request({
      url:'/user/getUser',
      method:'GET',
      params:mydata
   }) 
}

//用户页删除用户
export const delUserData= (myid) =>{
   return axios.Request({
      url:'/user/del',
      method:'POST',
      params:myid
   }) 
}

// module.exports={ getMenu }