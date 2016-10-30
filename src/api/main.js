// 主要的业务逻辑
// 项目太小时不分文件
import mFetch from './ajax.js'
import {DAY} from './constant.js'
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
        page_index:index,
        page_number:number
    }
    mFetch('/word/list'
            ,data
            ,callback) 
}

// 获取所有单词列表
export const listGetAll = function(index,number,callback){
    let data={
        page_index:index,
        page_number:number
    }
    function preSet(err,res){
        if(res){
        for (var i = res.list.length - 1; i >= 0; i--) {
                if(res.list[i].end_time!=undefined){
                    let source_time = new Date(res.list[i].end_time) 
                    res.list[i].end_time = source_time.toLocaleDateString() +" "+ source_time.toLocaleTimeString()
                }
            }
        }
        callback(err,res)
    }
    mFetch('/word/all'
            ,data
            ,preSet) 
}

// 隐藏单词
// type
// 0 1~10 天
// 1 10~100 天
// 2 很久

export const hideWord = function(id,type,callback){


    let rand_ = 0
    switch(type){
        case 0:
            rand_ = Math.random()*10
            rand_ += 1
        break;
        case 1:
            rand_ = Math.random()*90
            rand_ += 10
        break;
        case 2:
            rand_ = 9999
        break;
    }
    
    rand_ = Math.round(rand_)


    let hide_time = rand_ * DAY
    

    let now_time = new Date()
    let end_time = now_time.getTime() + hide_time

    let data = {
        id,
        end_time
    }
    console.log('current_time',now_time.toLocaleDateString() +" "+ now_time.toLocaleTimeString())
    console.log('rand_',rand_)
    console.log('end_time',new Date(end_time).toLocaleDateString() +" "+ new Date(end_time).toLocaleTimeString() )

    mFetch('/word/hide'
            ,data
            ,callback)

}

export const moveWord = function(id,callback){
    let data = {
        id
    }
    mFetch('/word/move'
            ,data
            ,callback)

}
