<template>
    <div ref="commonechart">

    </div>
</template>
<script>
import * as Echart from 'echarts'

export default {
    props: {
        //判断是否是折线柱状图
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default() {
                return {
                    xData: [],
                    series:[]
                }
            }

        },

    },
    data() {
        return {
            axisOption: {
                legend: {
                    //图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: { left: "20%" },
                //提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3"
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333"
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: { color: "#17b3a3" },
                        }
                    }
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    // { name: '新增用户', data: data.userData.map(x => x.new), type: 'bar' },
                    // { name: '活跃用户', data: data.userData.map(x => x.active), type: 'bar' }
                ],
            },
            normalOption: {
                tooltrip: { trigger: 'item' },
                color: ["#0f78f4", '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                series: [
                    
                ]
            },

            //判断echart有没有渲染
            isechart:null
        }
    },
    watch: {
        //对props里chartData进行监听
        chartData: {
            handler:function () {
                this.initCharts()
                
            },
            //首次监听也要触发
            deep:true
            
        }
    },
    methods: {
        initCharts() {
            this.initChartData()
            //如果isechart不为null即已经初始化了,那么就拿到options重新绘制
            if (this.isechart) {
                this.isechart.setOption(this.myoptions)
            }else{
                //否则初始化echarts,将初始化实例给isechart对象
                this.isechart=Echart.init(this.$refs.commonechart)
                //再绘制,将computed得到的到底用那个option结果传给Echart.setOption固有属性里
                this.isechart.setOption(this.myoptions)
            }      
        },
        initChartData(){
            //如果isAxisChart 存在就用axisOption,将props里chartData.xData数据
            //给axisOption.xAxis.data,props里chartData.xData父传子得到数据
            if (this.isAxisChart) {
                this.axisOption.xAxis.data=this.chartData.xData
                this.axisOption.series=this.chartData.series 
            }else{
                this.normalOption.series=this.chartData.series
            }
        }
    },
    computed: {
        myoptions() {
            return this.isAxisChart ? this.axisOption :this.normalOption
        }
    },

}
</script>

<style lang="scss" scoped>
</style>