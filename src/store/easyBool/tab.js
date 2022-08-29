// import router from "@/router"

export default {
    state: {
        //侧边栏是否折叠
        isCollapse: false,
        tabList: [
            { path: '/', name: 'home', label: '首页', icon: 'home' }
        ],
        //当前选中的路由
        currentMenu: null,

        //给初始路由添加空数组,根据不同权限的人设置路由
        menu:[]
    },
    mutations: {
        //根据不同权限的人设置路由
        setMenu(state,val){
            state.menu=val
            localStorage.setItem('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            localStorage.removeItem('menu')
        },
        addMenu(state,router){
            const mymenu=localStorage.getItem('menu')
            if (!mymenu) {
                return
            }
            const menu=JSON.parse(mymenu)
            state.menu=menu
            const menuArray=[]
            //遍历菜单路由
            menu.forEach(e => {
                //如果该路由还有子路由
                if (e.children) {
                    //把子路由都引入
                    //$$事实上此项目子路由跟一级路由形式没什么区别
                    e.children=e.children.map(item=>{
                        item.component=()=>import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...e.children)
                }else{
                    //如果没有子路由,只是一级路由
                    e.component=()=>import(`@/views/${e.url}`)
                    menuArray.push(e)
                }
                
            });

            //路由动态添加
            menuArray.forEach(m=>{
                router.addRoute('main',m)
            })
        },


        //侧边栏折叠
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //每次点击改变路由
        selectMenu(state, val) {
            //如果点击后的路由不是home
            if (val.name !== 'home') {
                //val对象参数赋值给state.currentMenu
                state.currentMenu = val
                //当前菜单索引
                const res = state.tabList.findIndex(item => item.name === val.name)
                //当 当前菜单索引不存在时
                if (res === -1) {
                    state.tabList.push(val)
                }
            } 
            //如果点击后的路由是home
            else {
                //将当前路由进行重置
                state.currentMenu = null

            }
        },

        //标签叉号关闭
        closeTag(state,val){
            //当前点击叉号的时候标签的索引
            const res=state.tabList.findIndex(item=>item.name===val.name)
            // 从tabList第res索引删除1个元素
            state.tabList.splice(res,1)
        }
    }
}