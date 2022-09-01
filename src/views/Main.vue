<template>
    <div class="container">
        <el-container style="height:100%">
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <common-tag></common-tag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
//  引入通用侧边栏
import CommonAside from '@/components/CommonAside/CommonAside.vue'
//  引入通用header
import CommonHeader from '@/components/CommonHeader/CommonHeader.vue';
//  引入通用tag
import CommonTag from '@/components/Common/CommonTag.vue';
export default {
    name:'main',
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
  


}
</script>

<style lang="scss">
.container {

    width: 100%;
    height: 100%;

    .el-header {
        background-color: #0b0c0e;
    }

    .el-main {
        padding-top: 0;
    }

}
</style>