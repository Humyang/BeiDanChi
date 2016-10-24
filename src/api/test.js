import * as API from './main.js'


API.listGet(0,20,function(err,res){
    console.log("获取列表数据,结果：")
    if(err){
        console.log("some error：",err)
        return false
    }
    console.log("success",res)
})

API.wordAdd('test word','some word on here',function(err,res){
    console.log("添加单词,结果：")
    if(err){
        console.log("some error：",err)
        return false
    }
    console.log("success",res)
})