// import $ from 'jquery';
// https://github.com/github/fetch
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
import * as BASE from './base.js'

import {
    API_URL,
    HTTP_FAIL
} from './constant.js'


// 对返回报文进行预处理
// 返回 true 表示已经对报文进行了处理
// 返回 false 表示未处理，请求成功
const preProcessRsp = function(store, callback) {
    if (false) {
        // 返回数据有问题，需要在业务代码处理
        callback(HTTP_FAIL);
    }
    return false;
};

const mFetch = function(path,data,callback) {
    let comb_data = data

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
        // HTTP 错误处理，不涉及逻辑
        if (response.status != 200) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        if(!preProcessRsp(stories,callback)){
            // console.log('stories',stories);
            callback(null,stories)
        }
    })
    .catch(function(ex){
        console.log('parsing failed', ex)
        callback(HTTP_FAIL);
    });
};
export default mFetch