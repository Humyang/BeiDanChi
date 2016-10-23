import {mAjax} from './ajax.js'
const IP = 'http://localhost:8081'
window.API_URL = IP + '';
// const remote_code = ip + '/WheatInterface/in?';
const FLAG="APP_"
const USERNAME = FLAG+'USERNAME' //用户名
const SESSION_TOKEN = FLAG+'SESSION_TOKEN' //token
const SESSION_EXPIRED = FLAG+'SESSION_EXPIRED' //session过期时间
const ACCOUNT_STATE = FLAG+'ACCOUNT_STATE' //账户状态

export const removeToken = function(page_this) {
    // storage.sessionToken = '',
    // storage.sessionExpired = new Date();
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(ACCOUNT_STATE);
};
export const saveToken = function(token) {
    // localStorage.setItem(USERNAME, storage.userName);
    localStorage.setItem(SESSION_TOKEN, token);
    localStorage.setItem(SESSION_EXPIRED, 'date');
    // localStorage.setItem(ACCOUNT_STATE, storage.accountState);
};
export const getToken = function(){
    var current = new Date();
    let token_expired = localStorage.getItem(SESSION_EXPIRED) || 'Now'
    if(token_expired < current){
        return ''
    }else{
        return localStorage.getItem(SESSION_TOKEN)
    }
}
// export const sessionIsExpired = function() {
//     if (storage.sessionToken === '') {
//         return true;
//     }

//     return false;
// };
// export default function() {
//     var current = new Date();
//     var storage = this.cache = {
//         userName: localStorage.getItem(USERNAME) || '',
//         sessionToken: localStorage.getItem(SESSION_TOKEN) || '',
//         sessionExpired: localStorage.getItem(SESSION_EXPIRED) || current,
//         accountState: localStorage.getItem(ACCOUNT_STATE) || '',
//     };
//     this.storage = storage;
//     var self = this;
//     this.saveToken = function() {
//         localStorage.setItem(USERNAME, storage.userName);
//         localStorage.setItem(SESSION_TOKEN, storage.sessionToken);
//         localStorage.setItem(ACCOUNT_STATE, storage.accountState);
//     };
//     //清除本地Token，可以用于退出登录的处理
//     this.removeToken = function(page_this) {
//         storage.sessionToken = '',
//         storage.sessionExpired = new Date();
//         localStorage.removeItem(SESSION_TOKEN);
//         localStorage.removeItem(ACCOUNT_STATE);
//     };
//     //判断session是否过期，如果过期，必须重新登录
//     this.sessionIsExpired = function() {
//         if (storage.sessionToken === '') {
//             return true;
//         }
//         return false;
//     };
//     //取用户名
//     this.getUserName = function() {
//         return storage.userName;
//     };
//     //设置用户名
//     this.setUserName = function(text) {
//         storage.userName = text;
//     }
//     //取用户状态
//     this.getAccountState = function() {
//         return storage.accountState;
//     };
//     // 登录模块
//     // this.LOGIN = LOGIN;
//     // 其它模块接口
//     // this.OTHER = OTHER;
// }
