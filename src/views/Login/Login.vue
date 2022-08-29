<template>
    <div>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
            <h3 class="login_title"></h3>
            <el-form-item label="用户名" label-width="80px" prop="username" class="username">
                <el-input type="input" v-model="form.username" autocomplate="off" placeholder="输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password" class="password">
                <el-input type="password" v-model="form.password" autocomplate="off" placeholder="输入密码"></el-input>
            </el-form-item>

            <el-form-item class="login_submit">
                <el-button type="primary" @click="login" class="login_submitbtn">登录</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
import Mock from 'mockjs';
import { getMenu } from '@/API/data.js'
export default {
    name: 'Login',
    data() {
        return {
            //与用户名密码绑定了
            form: {},
            rules: {
                username: [
                    { required: true, message: '输入用户名', trigger: 'blur' },
                    { min: 2, message: "用户名长度不能小于3位", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '输入密码', trigger: 'blur' },
                    { min: 3, message: "密码长度不能小于3位", trigger: 'blur' }
                ]
            }
        }
    },
   
    methods: {
        login() {
            getMenu(this.form).then(({data:res}) => {
                // console.log(res);
                if (res.code === 20000) {
                    this.$store.commit('clearMenu')
                    this.$store.commit('setMenu', res.data.menu)
                    this.$store.commit('setToken', res.data.token)
                    this.$store.commit('addMenu', this.$router)
                    this.$router.push({ name: 'home' })

                } else {
                    this.$message.warning(res.data.message)
                }
            })
            // //获取token
            // const token = Mock.random.guid()
            // //已经在main.js注册了$store
            // this.$store.commit('setToken', token)
            // this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    border-radius: 15px;
    //背景裁剪内边距
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458
    }

    .login_submit {
        width: 100%;
        margin: 10px auto 0 auto;

        .login_submitbtn {
            margin-left: 35px;
        }
    }
}
</style>