import * as API from './main.js'


// API.listGet(0,20,function(err,res){
//     console.log("获取列表数据,结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })

// API.listGetAll(0,20,function(err,res){
//     console.log("获取所有列表数据,结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })

// API.wordAdd('test word','some word on here',function(err,res){
//     console.log("添加单词,结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })

// API.hideWord('580f0f99ca27ed033896dc21',0,function(err,res){
//     console.log("隐藏单词，结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })

API.moveWord('580f0f99ca27ed033896dc21',function(err,res){
    console.log("移除单词，结果：")
    if(err){
        console.log("some error：",err)
        return false
    }
    console.log("success",res)
})