/**
 * 封装请求文件
 * 2019-06-30 by Cynthia Zou
 */

import axios from 'axios'

const IP =  'http://127.0.0.1:9999'
// const IP =  'http://192.168.43.107:9999' //红米手机 手机端调试 手机连接热点后yarn serve得到的net地址
// const IP =  'http://172.20.10.10:9999' //失败 ！！苹果手机 手机端调试 手机连接热点后yarn serve得到的net地址
// 本机ip 172.16.12.185

export function getseller() {
    return axios.get(IP + '/api/seller')
}

export function getgoods() {
    return axios.get(IP + '/api/goods')
}

export function getratings() {
    return axios.get(IP + '/api/ratings')
}