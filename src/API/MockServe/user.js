//user.js=>mock.js=>data.js

import Mock from 'mockjs'

function param2Obj(url) {
    const search=url.split('?')[1]
    if (!search) {
        return{}
    }
    return JSON.parse(
        '{"'+decodeURIComponent(search).replace(/"/g,'\\"')
                                       .replace(/&/g,'","')
                                       .replace(/=/g,'":"')+
                                       '"}'
    )
}


let List = []
const count = 200
for (let index = 0; index < count; index++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )

}

export default {
    //增加用户
    createUser: (config) => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        console.log(JSON.parse(config.body));
        //在插入数组前面
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex

        })
        return {
            code: 20000,
            data: { message: '添加成功' }
        }


    },

    //修改用户
    updateUser: (config) => {
        const {id, name, addr, age, birth, sex } = JSON.parse(config.body)
        
        const sex_num = parseInt(sex)
        // console.log(JSON.parse(config.body));
        //在插入数组前面
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 20000,
            data: { message: '修改成功' }
        }
    },

    //获取用户列表
    getUserList: (config) => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit);
        //事实上当页面不刷新时List在点击用户界面时已经生成好,因为每次刷新都要重新引入该文件
        //并且先进行最上面for语句生成用户信息,不刷新界面时只会执行export default里的函数,所以最初
        //生成的用户信息不会变
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) {
                return false
            }
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    //删除用户
    deleteUser: (config) => {
        const id=param2Obj(config.url)[0]
        // console.log(param2Obj(config.url)[0]);
        // console.log(id);
        if (!id) {
            return{
                code:-999,
                message:'参数不正确'
            }
        }else{

            List=List.filter(u=>u.id!==id)
            // console.log(List);
            return{
                code:20000,
                message:'删除成功'
            }
        }
    }
}