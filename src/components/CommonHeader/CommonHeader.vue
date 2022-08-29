<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!-- <h3>首页</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in this.tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                }}
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span><img :src=userImg alt="" class="user "></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <!-- @click.native给组件绑定事件,不加的话基本上要点 '登出' 二字才能触发事件 -->
                    <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CommonHeader',
    data() {
        return {
            userImg: require('@/assets/logo.png')
        }
    },
    methods: {
        handleMenu() {
            //执行store里的mutation方法
            this.$store.commit('collapseMenu')
        },

        logOut(){
            //清除token
            this.$store.commit('clearToken')
            //清除menu
            this.$store.commit('clearToken')
            this.$router.push({name:'login'})
            // this.$router.push('/login')


        }
    },
    computed: {
        //将store里的tablist注入，使用vuex的mapState函数
        //当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
        //为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
        //https://vuex.vuejs.org/zh/guide/forms.html
        //还有一种使用方法,意思是将store里面的state里面的tabList属性
        //映射到computed属性中的tags中。即tags代表了$store.state.Tab.tabList
        //即tags现在可以直接用了
        ...mapState({ tags: state => state.Tab.tabList })

    },

}
</script>

<style lang="scss" scoped>
header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 20px;
        }
        .el-breadcrumb ::v-deep .el-breadcrumb__inner {
        color: #fff !important;
}
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

    }
}
</style>