// 主要的业务逻辑
// 项目太小时不分文件
import mAjax from './ajax.js'
// 登录
export const login = function(username, password, callback) {
    let data={
        username,
        password
    }
    mAjax('POST'
            ,API_URL + '/login/send_login'
            ,data
            ,callback)
}

// 添加单词
export const wordAdd = function(word,describe,callback){
    let data={
        word,
        describe
    }
    mAjax('POST'
            ,API_URL + '/word/add'
            ,data
            ,callback)
}


// 获取单词列表
export const listGet = function(index,number){
    let data={
        index,
        number
    }
    mAjax('POST'
            ,API_URL + '/list/get'
            ,data
            ,callback) 
}