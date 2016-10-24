// 主要的业务逻辑
// 项目太小时不分文件
import mFetch from './ajax.js'
// 登录
export const login = function(username, password, callback) {
    let data={
        username,
        password
    }
    mFetch('/login/send_login'
            ,data
            ,callback)
}

// 添加单词
export const wordAdd = function(word,describe,callback){
    let data={
        word,
        describe
    }
    mFetch('/word/add'
            ,data
            ,callback)
}


// 获取单词列表
export const listGet = function(index,number,callback){
    let data={
        index,
        number
    }
    mFetch('/word/list'
            ,data
            ,callback) 
}