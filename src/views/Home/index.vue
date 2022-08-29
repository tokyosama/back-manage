<template>
    <div class="container">
        <el-row class="home" :gutter="20">
            <el-col :span="8" style="margin-top:20px">
                <el-card shadow="hover" class="card1">
                    <div class="user">
                        <img :src=userImg alt="" class="img">
                        <div class="userinfo">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间:<span>2022-8-19</span></p>
                        <p>上次登录地点:<span>武汉</span></p>
                    </div>
                </el-card>

                <el-card class="card2">
                    <el-table :data="tableData">
                        <!-- :prop=index表示在当前列接收tableData里对应index索引的值,:label="val"表示当前列的名字是什么 -->
                        <el-table-column v-for="(val, index) in tableLabel" :key="index" :prop="index" :label="val">

                        </el-table-column>


                    </el-table>

                </el-card>
            </el-col>

            <el-col :span="16" style="margin-top:20px">
                <!-- 右侧列之顶部订单区域 -->
                <div class="num">
                    <el-card v-for="item in countData" :key="item.name">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="num">￥{{ item.value }}</p>
                            <p class="txt">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>

                <!-- 右侧列之中间echars图表 -->
                <el-card style="height:280px">
                    <!-- <div  ref="myEcharts"></div> -->
                    <my-echart :chartData="echartData.order" style="height:280px"></my-echart>
                </el-card>

                <div class="graph">
                    <el-card style="height:260px" class="g1">
                        <!-- <div style="height:260px" ref="myUserEcharts"></div> -->
                        <my-echart :chartData="echartData.user" style="height:260px"></my-echart>

                    </el-card>
                    <el-card style="height:260px;" class="g2">
                        <!-- <div style="height:260px;" ref="myVideoEcharts"></div> -->
                        <my-echart :chartData="echartData.video" :isAxisChart="false" style="height:260px"></my-echart>

                    </el-card>
                </div>

            </el-col>
        </el-row>


    </div>
</template>

<script>
import { getData } from '@/API/data.js'
//引入自己的echarts组件
import MyEchart from '@/components/Common/Echarts.vue'
//gutter栅格数,:span="8"当前行占用几个栅格
export default {
    name: 'Home',
    components: {
        MyEchart,
    },
    data() {
        return {
            userImg: require('@/assets/logo.png'),
            tableData: [
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                // { name: 'op', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
            ],
            //表格每一列的标题
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            //右侧列顶部订单数据
            countData: [
                { name: '今日支付订单', value: 123, icon: 'success', color: '#2ec7c9' },
                { name: '今日收藏订单', value: 123, icon: 'star-on', color: '#ffb980' },
                { name: '今日未支付订单', value: 123, icon: 's-goods', color: '#5ab1ef' },
                { name: '本月支付订单', value: 123, icon: 'success', color: '#2ec7c9' },
                { name: '本月收藏订单', value: 123, icon: 'star-on', color: '#ffb980' },
                { name: '本月未支付订单', value: 123, icon: 's-goods', color: '#5ab1ef' },
            ],

            //
            echartData: {
                order: { xData: [], series: [] },
                user: { xData: [], series: [] },
                video: { series: [] },

            }
        }
    },
    mounted() {
        // this.getMenu()
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                this.tableData = data.tableData
                const order = data.orderData
                //拿到orderData.data也就是MOck生成的数据的key,即oppo,vivo..
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })

                //定义echarts的options
                const xData = order.Date
                // const myoption = {
                //     xAxis: {data: xData},yAxis: {},
                //     //图例legend: {data: keyArray},
                //     //上面push过的series series
                // }
                // const E = echarts.init(this.$refs.myEcharts)
                // //绘图 E.setOption(myoption)

                this.echartData.order.xData = xData
                this.echartData.order.series = series

                //用户图
                // const myuserOption = {
                //     // legend: {//图例文字颜色textStyle: {color: "#333"},},
                //     // grid: { left: "20%" }, //提示框tooltip: { trigger: "axis",},
                //     xAxis: {
                //         type: "category",
                //         data: data.userData.map(item => item.data),
                //         axisLine: {lineStyle: {color: "#17b3a3"}},
                //         axisLabel: {interval: 0,color: "#333"},
                //     },
                //     yAxis: [{type: "value",axisLine: {lineStyle: { color: "#17b3a3" },}}],
                //     color: ["#2ec7c9", "#b6a2de"],
                //     series: [
                //         { name: '新增用户', data: data.userData.map(x => x.new), type: 'bar' },
                //         { name: '活跃用户', data: data.userData.map(x => x.active), type: 'bar' }],}
                // const EU = echarts.init(this.$refs.myUserEcharts)
                // //绘图
                // EU.setOption(myuserOption)

                this.echartData.user.xData = data.userData.map(item => item.data)
                this.echartData.user.series = [
                    { name: '新增用户', data: data.userData.map(x => x.new), type: 'bar' },
                    { name: '活跃用户', data: data.userData.map(x => x.active), type: 'bar' }]


                //饼图
                // const videoOption = {
                //     tooltrip: { trigger: 'item' },
                //     color: ["#0f78f4", '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                //     series: [{data: data.videoData, type: 'pie',}]
                // }
                // const EV = echarts.init(this.$refs.myVideoEcharts)
                // //绘图EV.setOption(videoOption)

                this.echartData.video.series = [{ data: data.videoData, type: 'pie', }]

            }
        });
    },

}
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;

    .home {

        // .el-co
        .card1 {

            // display: flex;
            .user {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .img {
                    height: 130px;
                    width: 130px;
                    border-radius: 50%;
                    background-color: rgb(233, 201, 201);
                }

                .userinfo {
                    padding-left: 15px;

                    .name {
                        font-size: 30px;
                    }
                }
            }

            .login-info {
                margin-top: 15px;
                border-top: 1px solid gray;
                width: 90%;
                font-size: 12px;

                p {
                    margin-top: 10px;

                    span {
                        padding-left: 70px;
                    }

                    // display: flex;
                    // justify-content: space-between;
                }
            }

        }

        .card2 {
            margin-top: 20px;
            height: 460px;
        }


    }

    .num {
        display: flex;
        flex-wrap: wrap;
        // flex-grow: 1;
        justify-content: space-between;
        align-content: space-between;

        .el-card {
            width: 275px;
            display: flex;
            padding: 0;

            .icon {
                height: 60px;
                width: 60px;
                display: block;
            }
        }
    }

    .graph {
        display: flex;

        .g1,
        .g2 {
            width: 50%;
        }

    }
}
</style>