<template>
    <div class="manage">
        <!-- 需要设置visible属性Boolean，当为true时显示弹窗,支持.sync修饰符 -->
        <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
            <common-form :formLabel="opertateFormLabel" :form="opertateForm" :inline="true" ref="myform"></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">新增</el-button>
            <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="myform">
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @edit="editUser" @del="delUser"
            @changePage="getList()"></common-table>


    </div>
</template>

<script>
import CommonForm from '@/components/Common/CommonForm.vue';
import CommonTable from '@/components/Common/CommonTable.vue';
import { addUserData, editUserData, getUser, delUserData } from '@/API/data.js'
export default {
    name: 'User',
    components: {
        CommonForm,
        CommonTable
    },
    data() {
        return {
            operateType: 'add',
            isShow: false,

            //弹窗里form配置数据
            opertateFormLabel: [
                { model: 'name', label: '姓名', type: 'input' },
                { model: 'age', label: '年龄', type: 'input' },
                {
                    model: 'sex', label: '性别', type: 'select', opts: [
                        { label: '男', value: 0 },
                        { label: '女', value: 1 },

                    ]
                },
                { model: 'birth', label: '生日', type: 'date' },
                { model: 'addr', label: '地址', type: 'input' },


            ],
            opertateForm: { name: '', addr: '', age: '', birth: '', sex: '' },

            //表格右上角输入框数据
            formLabel: [
                { model: 'keyword', label: '', type: 'input' }
            ],
            //表格右上角输入框数据
            searchForm: { keyword: '' },

            //真正用户表格数据
            tableData: [],

            tableLabel: [
                { label: '姓名', prop: 'name' },
                { label: '年龄', prop: 'age' },
                { label: '性别', prop: 'sex' },
                { label: '生日', prop: 'birth', width: 200 },
                { label: '地址', prop: 'addr', width: 320 },

            ],
            config: { page: 1, total: 30 }






        }
    },
    created() {
        this.getList();
    },
    methods: {
        //点击确定
        confirm() {
            //如果是编辑
            if (this.operateType === 'edit') {
                editUserData(this.opertateForm).then(({data:res}) => {
                    //拿到数据后关了弹窗
                    this.isShow = false
                    this.$message({ type: 'success', message: res.data.message })
                    //重新获取数据
                    this.getList()
                })
            } else {
                //如果是添加
                addUserData(this.opertateForm).then(({data:res}) => {
                    this.isShow = false
                    this.$message({ type: 'success', message: res.data.message })
                    //重新获取数据
                    this.getList()

                })
                // this.$http.post('/user/add', this.opertateForm).then(res => {
                //     //拿到数据后关了弹窗
                //     this.isShow = false
                //     console.log(res);

                // })

            }

        },
        addUser() {
            this.isShow = true
            this.operateType = 'add'
            this.opertateForm = { name: '', addr: '', age: '', birth: '', sex: '' }

        },


        //编辑
        editUser(myrow) {
            //将模式调成编辑,isShow为true使得弹窗出现
            this.operateType = 'edit'
            this.isShow = true
            //接收那一行的数据
            //由于该方法是子组件CommonTable自定义事件传过来的
            //因此myrow就是那一行数据
            this.opertateForm = myrow

        },

        //删除
        delUser(myrow) {
            //类似this.notify的提示弹窗
            //this.$confirm(提示内容,标题,{按钮1:'1名',type按钮类型:'warning吧'}).then(回调)
            this.$confirm('此操作永久删除该组件,是否继续', '提示',
                { confirmBtnTxt: '确认', cancelBtnTxt: '取消', type: 'warning' })
                .then(() => {
                    //获取用户id并删除
                    const id = myrow.id
                    // console.log(id);
                    //调用接口删除
                    delUserData(id).then(() => {
                        //删除重新渲染用户列表
                        this.getList()
                        this.$message({ type: 'success', message: '删除成功' })
                    })

                })
        },

        //获取用户列表,name = ''提供搜索功能
        getList(name = '') {
            //先给config加上loading属性表是 要加载?
            this.config.loading = true
            //用户?是否存在是的话页码到第一页,不是的话什么都不做
            name ? (this.config.page = 1) : ''
            //进行接口调用
            getUser({ page: this.config.page, name: name }).then(({ data: res }) => {
                //还是返回res.list列表,只是把列表里的0或1变成女或男
                this.tableData = res.list.map(item => {
                    item.sex = item.sex === 0 ? '女' : '男'
                    return item
                })
                // console.log(this.tableData);

                //将总页码传到total中
                this.config.total = res.count
                //调用完接口之后把loading状态? 关了
                this.config.loading = false
            })


        },

    },


}
</script>

<style lang="scss" scoped>
.manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>