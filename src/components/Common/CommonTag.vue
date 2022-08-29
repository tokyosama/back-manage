<template>
    <div class="tabs">
        <!-- 首页标签不能有叉号,如果标签不是首页那么tag可以有closable删除键 -->
        <!-- 关闭触发close事件 -->
        <el-tag size="small" 
        v-for="(tag,index) in this.tags" :key="tag.name" 
        :closable="tag.name!=='home'"
        :effect="$route.name===tag.name ? 'dark' :'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)">
        {{tag.label}}

        </el-tag>
    </div>
</template>

<script>
import {mapState ,mapMutations} from 'vuex'
    export default {
        name:'CommonTag',
        computed:{
            ...mapState({tags:state=>state.Tab.tabList})
        },
        // updated () {
        //     console.log(this.tags);
        // }, 
        methods: {
            ...mapMutations({
                //用close代表mutions里的 closeTag方法
                close:'closeTag'
            }),
            changeMenu(mytag){
                this.$router.push({name:mytag.name})
            },
            handleClose(mytag,index){
                //mapState里的tags长度减一
                const tlength=this.tags.length-1
                this.close(mytag)
                //如果点击的叉号不是当前标签的叉号,即不点当前高亮标签叉号
                if (mytag.name!==this.$route.name) {
                    //那么
                    return ;
                }
                //如果点击最右侧tag删除键
                if(index===tlength){
                    this.$router.push({name:this.tags[index-1].name})

                }else{
                    this.$router.push({name:this.tags[index].name})
                }

            }

        },
        
    }
</script>

<style lang="scss" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>