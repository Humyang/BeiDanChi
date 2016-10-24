import {mAjax} from './ajax.js'

import {
    SESSION_TOKEN,
    SESSION_EXPIRED,
    ACCOUNT_STATE
} from './constant.js'

export const removeToken = function(page_this) {
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(ACCOUNT_STATE);
};
export const saveToken = function(token) {
    localStorage.setItem(SESSION_TOKEN, token);
    localStorage.setItem(SESSION_EXPIRED, 'date');
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