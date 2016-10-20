import $ from 'jquery';
import * as BASE from './base.js'

const TIMEOUT = 3000000;
const HTTP_FAIL = "与服务器通信失败，请检查手机网络"
const DATA_INVALID = "无法识别服务器返回的数据包"

// 对返回报文进行预处理
// 返回 true 表示已经对报文进行了处理
// 返回 false 表示未处理，请求成功
const preProcessRsp = function(rsp, callback) {
    if (rsp.status!=200) {
        callback(HTTP_FAIL);
        return true;
    }
    return false;
};
export const mAjax = function(type,url,data,callback) {
    let token = BASE.getToken()
    let data = Object.assgin(data,{token})
    $.ajax({
        url:url,
        type,
        dataType: 'json',
        data,
        complete:function(rsp){
            if(!preProcessRsp(rsp,callback)){
                callback(null,rsp.responseText)
            }else{
                callback(rsp)
            }
        }
    });
};