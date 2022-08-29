import Mock from 'mockjs'

let List = []
export default {
    getStatisicalData: () => {
        //Mock.random.float产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let index = 0; index < 7; index++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    华为: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }

        return {
            code: 20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: '苹果',
                        value: 2999
                    },
                    {
                        name: '华为',
                        value: 599
                    },
                    {
                        name: 'vivo',
                        value: 1999
                    },
                    {
                        name: 'oppo',
                        value: 1899
                    },
                    {
                        name: '三星',
                        value: 399
                    },
                    {
                        name: '小米',
                        value: 999
                    },

                ],

                //柱状图
                userData: [
                    { data: '周一', new: 12, active: 200 },
                    { data: '周二', new: 10, active: 600 },
                    { data: '周三', new: 8, active: 400 },
                    { data: '周四', new: 19, active: 200 },
                    { data: '周五', new: 12, active: 500 },
                    { data: '周六', new: 4, active: 200 },
                    { data: '周日', new: 10, active: 900 },
                ],

                //折线图
                orderData: {
                    Date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007',],
                    data: List
                },

                tableData: [
                    { name: '苹果', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: '华为', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: 'vivo', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: 'oppo', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: '三星', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: '小米', todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                ],


            }
        }
    }

}