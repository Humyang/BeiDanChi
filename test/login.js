import expect from 'expect'

import * as API from '../src/api/main.js'
import co from 'co'
import uid from 'uid'


        
describe('登录模块测试', function() {
    it('获取验证码并注册', function(done) {
        // expect(null).toExist()
        co(function*(){
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'测试注册')

            let regiest_res2 = yield API.regiest(username,'password1','123456',verifycode.token)
            // expect(regiest_res.status).toBe(false,'token 未失效，旧 token 仍能注册')
            done()
        })
        .catch(function(err){
            if(err.msg === "验证码失效"){
                done()
            }else{
                done(err)    
            }
            // expect(err.status).toBe(false,'token 未失效，旧 token 仍能注册')
            
        })
    })
})
                // let username = 'test'+uid(10)

                // let verifycode = yield API.verify_code()
                // console.log(verifycode.status)
                // expect(verifycode.status).toBe(false,'获取验证码')


                // let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
                // expect(regiest_res.status).toBe(true,'测试注册')

                // let regiest_res2 = yield API.regiest(username,'password1','123456',verifycode.token)
                // // done()
            
        // })
        // .catch(function(err){
        //     expect(err.status).toBe(true,'使用旧验证码测试注册')
        //      // reject()
        //     throw new Error('验证码错误')
        // })
        // })
        // expect(
        //     function(){

        // }).toNotThrow('出现错误')
    

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