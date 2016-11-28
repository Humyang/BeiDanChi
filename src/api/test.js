import * as API from './main.js'
import co from 'co'
import uid from 'uid'
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

// 测试业务逻辑
//登录-获取列表数据-获取所有列表数据-添加单词-隐藏单词-移除单词-查询单个单词
co(function*(){
    console.log('获取注册验证码：')
    let verifycode = yield API.verify_code()
    console.log(verifycode)

    let username = 'test_'+uid(10)
    console.log('注册账号：')
    let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
    console.log(regiest_res)


    console.log('获取登录验证码：')
    let verify_login = yield API.verify_code()
    console.log(verify_login)
    console.log('登录：')
    var login = yield API.login(username,'password1',123456,verify_login.token)
    console.log(login)

    let token = login.token

    console.log("添加单词：")
    let wordAdd = yield API.wordAdd('test word','some word on here',token)
    console.log(wordAdd)

    console.log("获取列表数据：")
    let listGet = yield API.listGet(0,20,token)
    console.log(listGet)

    console.log("获取所有列表数据：")
    let listGetAll = yield API.listGetAll(0,20,token)
    console.log(listGetAll)

    // console.log("隐藏单词,结果：")
    // let wordAdd = yield API.hideWord('test word','some word on here',regiest_res.token)
    // console.log(wordAdd)
}).catch(function(err){
    console.log('出错：',err)
})


// 测试获取验证码与注册
// co(function*(){
//     let username = 'test'+uid(10)

//     console.log('获取验证码')
//     let verifycode = yield API.verify_code()
//     console.log(verifycode)

//     console.log('测试注册')
//     let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
//     console.log(regiest_res)

//     console.log('使用旧验证码测试注册')
//     let regiest_res2 = yield API.regiest(username,'password1',123456,verifycode.token)
//     console.log(regiest_res2)

// }).catch(function(err){
//     console.log('发现异常：',err)
// })

//测试登录-再次登录-使用旧token测试获取数据
// co(function*(){
//     var verifycode = yield API.verify_code()
//     console.log('verifycode',verifycode)
//     var login = yield API.login('username3','password1',123456,verifycode.token)
//     console.log('login status',login)

//     //再次登录，使旧token失效
//     var verifycode2 = yield API.verify_code()
//     var login2 = yield API.login('username3','password1',123456,verifycode2.token)
//     console.log('再次登录，使旧token失效: ',login2)

//     //使用旧 token 获取数据，反馈失败
//     var listall = yield API.listGetAll(0,20,login)
//     console.log('使用旧 token 获取数据，反馈失败: ',listall)

// }).catch(function(err){
//     console.log('error',err)
// })
