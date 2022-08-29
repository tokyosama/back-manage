<template>
    <div class="common-table">
        <!-- stripe显示表格条纹  -->
        <el-table :data="tableData" height="90%" stripe>
            <!-- show-overflow-tooltip:当内容过长被隐藏时显示 tooltip -->
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
                :width="item.width ? item.width : 125">
                <!-- 除了渲染v-for的表头数据还要渲染表格数据,用 插槽 -->
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{ scope.row[item.prop] }}</span>
                </template>

            </el-table-column>

            <!-- 当前操作列 -->
            <el-table-column label="操作" min-width="180">

                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDel(scope.row)" type="danger">删除</el-button>
                </template>

            </el-table-column>

        </el-table>

        <el-pagination layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" :page-size="20"
            @current-change="changePage" class="pager"></el-pagination>

    </div>
</template>

<script>
export default {
    name: 'CommonTable',
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
    mounted() {
        // console.log(this.tableLabel);

    },
    methods: {
        //点击编辑,自定义事件传给User.vue
        handleEdit(myrow) {
            this.$emit('edit', myrow)

        },
        //点击删除,自定义事件传给User.vue
        handleDel(myrow) {
            this.$emit('del', myrow)



        },
        //点击下面页码,自定义事件传给User.vue
        changePage(mypage) {
            this.$emit('changePage', mypage)

        }

    },

}
</script>

<style lang="scss" scoped>
.common-table {
    height: 500px;
    // height: calc(100% - 62px);
    background-color: #fff;
    position: relative;

    .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>