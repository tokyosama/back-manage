<template>
    <div class="container">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="this.isClose">
            <h3>{{ isClose ? '后台' : 'xx后台管理系统' }}</h3>
            <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="clickMenu(item)" >
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path" >
                <template slot="title">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="(citem, cindex) in item.children" :key="citem.path">
                    <!-- <i :class="'el-icon-' + citem.icon"></i> -->
                    <el-menu-item :index="citem.path" @click="clickMenu(citem)">{{ citem.label }}</el-menu-item>
                </el-menu-item-group>

            </el-submenu>

            <!-- <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item> -->
        </el-menu>


    </div>
</template>

<script>
export default {
    data() {
        return {
            // menu: [
            //     { path: '/', name: 'home', label: '首页', icon: 's-home', url: 'Home/Home' },
            //     { path: '/mall', name: 'mall', label: '商品管理', icon: 'video-play', url: 'MallManage/MallManage' },
            //     { path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'UserManage/UserManage' },
            //     {
            //         label: '其他', icon: 'location', children: [
            //             { path: '/page1', name: 'page1', label: '页面1', icon: 'setting', url: 'Other/Pageone' },
            //             { path: '/page2', name: 'page2', label: '页面2', icon: 'setting', url: 'Other/Pagetwo' },
            //         ]
            //     },
            // ]

            menu:[]
        };
    },
    props:{
        sure:Boolean
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        clickMenu(item) {
            this.$router.push({ name: item.name })
            //对应标签的变化
            this.$store.commit('selectMenu',item)
        }
    },
    computed: {
        noChildren() {
            //将没有子项目的menu的数据取出来
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren() {
            //将有子项目的menu的数据取出来
            const list = this.asyncMenu.filter(item => item.children)
            return list
        },

        //Store已经在mian.js注册过,可以通过this.$store取到state的属性里的tab模块下某个state属性值
        isClose() {
            return this.$store.state.Tab.isCollapse
        },

        //在把写死的menu注释后,this.menu全换成this.asyncMenu
        asyncMenu(){
            return this.$store.state.Tab.menu
        }

    },
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.container {
    height: 100%;
}

.el-menu {
    height: 100%;
    border: none;

    h3 {
        color: #fff;
        text-align: center;
        // line-height: 30px;

    }
}
</style>