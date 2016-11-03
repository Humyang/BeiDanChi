// import $ from 'jquery';
// https://github.com/github/fetch
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
import * as BASE from './base.js'

import {
    API_URL,
    HTTP_FAIL
} from './constant.js'


// 业务逻辑错误处理

// 对返回报文进行预处理
// 返回 false 表示发生业务逻辑问题
// 返回 true 表示未发生业务逻辑问题，继续执行
const preProcessRsp = function(store, callback) {
    if (!store.status) {
        callback(store.msg);
        return false
    }
    return true;
};

const mFetch = function(path,data,callback) {
    let comb_data = data
    let root = this
    if(typeof window !=="undefined" && root===window){
        let token = BASE.getToken()
        comb_data = Object.assign(data,{token})
    }

    fetch(API_URL+path,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comb_data)
    })
    .then(function(response) {
        // HTTP 错误处理
        if (response.status != 200) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(res) {
        if(preProcessRsp(res,callback)){
            callback(null,res)
        }
    })
    .catch(function(ex){
        console.log('parsing failed', ex)
        callback(HTTP_FAIL);
    });
};
export default mFetch