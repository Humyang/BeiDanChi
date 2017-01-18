// 主要的业务逻辑
// 项目太小时不分文件
import mFetch from './ajax.js'
import {DAY} from './constant.js'
import * as M from './method.js'
import md5 from 'md5'
import {saveUsername} from './base.js'

// var md5 = require('md5')

// 添加单词
export const wordAdd = function(word,sentence,describe){
    
    let data={
        word,
        sentence,
        describe
    }
    return mFetch('/word/add'
            ,data
            )
}


// 获取单词列表
export const listGet = function(index,number){
    let data={
        page_index:index,
        page_number:number
    }
    return mFetch('/word/list'
            ,data
            ) 
}

// 获取所有单词列表
export const listGetAll = function(index,number){
    let data={
        page_index:index,
        page_number:number
    }
    // function preSet(err,res){
    //     if(res){
    //     for (var i = res.list.length - 1; i >= 0; i--) {
    //             res.list[i].end_time = M.timeFormat(res.list[i].end_time)
    //         }
    //     }
    //     callback(err,res)
    // }
    return mFetch('/word/all'
            ,data
            ).then(function(res){
                if(res){
                for (var i = res.list.length - 1; i >= 0; i--) {
                        res.list[i].end_time = M.timeFormat(res.list[i].end_time)
                    }
                }
                return res
            })
}

export const wordId = function(id){
    let data={
        id
    }
    function preSet(err,res){
        res.end_time = M.timeFormat(res.end_time)
        callback(err,res)
    }
    return mFetch('/word/id'
            ,data
            ) 
}
export const word_sentence_clear = function(id,sentence){
    let now = new Date()
    let data = {
        id,
        sentence,
        date:now.getTime()
    }
    return mFetch('/word/sentence_clear'
            ,data
            ) 
}
// 隐藏单词
// type
// 0 1~10 天
// 1 10~100 天
// 2 很久

export const hideWord = function(id,type){


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

    return mFetch('/word/hide'
            ,data
            )

}

// 删除单词
export const moveWord = function(id){
    let data = {
        id
    }
    return mFetch('/word/move'
            ,data
            )

}
// 修改单词
export const alterWord = function(id,word,sentence,describe){
    let data = {
        id,
        word,
        sentence,
        describe
    }
    return mFetch('/word/alter',
        data)
}
// 获取验证码
export const verify_code = function(){
    return mFetch('/verify_code')
}

//登录
export const login = function(username,password,verify_code,token){
    
    let data = {
        username,
        password:md5(password),
        verify_code,
        device:'html5',
        token
    }
    return mFetch('/login',
        data).then(
        function(res){
            saveUsername(username)
            return res
        })
}
// 注册
export const regiest = function(username,password,verify_code,token){
    let data = {
        username,
        password:md5(password),
        verify_code,
        token
    }
    return mFetch('/regiest',
        data)
}


