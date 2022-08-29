import axios from 'axios'
import config from '@/utils/config'

//  判断当前运行环境,如果是开发环境则使用config文件里的dev的baseurl否则使用config文件里的pro的baseurl
const JbaseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

//  定义http请求类
class HttpRequest {
    //初始化
    constructor(mybaseurl) {
        this.baseUrl = mybaseurl
    }
    //定义axios基础配置
    getInsideConfig() {
        const config = {}
        return config
    }
    //定义拦截器
    //在请求或响应被 then 或 catch 处理前拦截它们。
    interceptors(myaxios) {
        // 添加请求拦截器
        //  axios.interceptors.request.use(function (config)
        myaxios.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        myaxios.interceptors.response.use(function (response) {
            // console.log(response);
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // console.log(error);
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    //定义request工具类创建axios实例，配置拦截器等
    Request(myoptions){
        //  创建实例
        const http=axios.create()
        //  将 axios基础配置对象 和 传入的options对象 解构
        const options={...this.getInsideConfig(),...myoptions}
        //  添加拦截器
        this.interceptors(http)
        return http(options)

    }

}

export default new HttpRequest(JbaseUrl)