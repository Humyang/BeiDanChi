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

// API.moveWord('580f0f99ca27ed033896dc21',function(err,res){
//     console.log("移除单词，结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })

// API.wordId('580f0f99ca27ed033896dc21',function(err,res){
//     console.log("查询单个单词，结果：")
//     if(err){
//         console.log("some error：",err)
//         return false
//     }
//     console.log("success",res)
// })


// API.login('test01','123456',function(err,res){
//     console.log('登录，结果：')
//     if(err){
//         console.log('some error：',err)
//         return false
//     }
//     console.log('success',res)
// })

// 测试获取验证码与注册
API.verify_code(function(err,res){
    console.log('测试获取验证码，结果：')
    if(err){
        console.log('失败：',err)
        return false
    }
    console.log('成功：',res)

    API.regiest('username1','password1',123456,res.token,function(err,res){
        console.log('测试注册，结果：')
        if(err){
            console.log('失败：',err)
            return false
        }
        console.log('成功：',res)
    })
})

// API.regiest('username','password',123456,'9aar5hti4alntvqr1kq79euu72js6011gh3d5uru',function(err,res){
//     console.log('测试注册，结果：')
//     if(err){
//         console.log('失败：',err)
//         return false
//     }
//     console.log('成功：',res)
// })