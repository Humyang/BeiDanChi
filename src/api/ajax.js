// import $ from 'jquery';
// https://github.com/github/fetch
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
import * as BASE from './base.js'
var CODE = require('../../serve/constant.js').CODE
import {
    API_URL,
    HTTP_FAIL
} from './constant.js'


// 业务逻辑错误处理

// 对返回报文进行预处理
// 返回 false 表示发生业务逻辑问题
// 返回 true 表示未发生业务逻辑问题，继续执行
const preProcessRsp = function(store,reslove,reject) {
    if (!store.status) {
        // if(CODE.LOGIN_NO_LOGIN.STATUSCODE === store.STATUSCODE ||
        //    CODE.LOGIN_TOKEN_INVALID.STATUSCODE === store.STATUSCODE){
        //     console.log('jump')
        //     location.href = '/login'
        // }
        reject(store)
        return false
    }
    return true;
};

const mFetch = function(path,data,token) {
    return new Promise(function(reslove,reject){
        let comb_data = {}
        if(data===undefined){
            data = {}
        }else{
            comb_data = data
            if(data.token === undefined){
                comb_data = Object.assign(data,{token:BASE.getToken()})
            }
            // if(token===undefined){
            //     comb_data = Object.assign(data,{token:BASE.getToken()})
            //     // console.log(222,path)
            // }else{
            //     // console.log(111,path)
            //     comb_data = Object.assign(data,{token})
            // }
        }
        
        let root = this
        // if(typeof window !=="undefined" && root===window){
        //     let token = BASE.getToken()
        //     comb_data = Object.assign(data,{token})
        // }

        
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
                // throw new Error("Bad response from server: status",response.status);
                reject("Bad response from server: status",response.status)
            }
            return response.json();
        })
        .then(function(res) {
            if(preProcessRsp(res,reslove,reject)){
                reslove(res)
            }else{
                reject(res.msg)
            }
        })
        .catch(function(ex){
            // console.log('parsing failed', ex)
            reject(ex)
            // callback(HTTP_FAIL);
        });
    })
    
};
export default mFetch