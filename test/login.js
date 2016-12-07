import expect from 'expect'

import * as API from '../src/api/main.js'
import co from 'co'
import uid from 'uid'
var CODE =  require('../serve/constant.js').CODE

import * as BASE from '../src/api/base.js'
// mocha --compilers js:babel-register --recursive login.js
global.location = {}
describe('注册流程测试', function() {

    it('不输入验证码',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            let regiest_res = yield API.regiest('','','',verifycode.token)
            done('应该提示验证码错误')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_ERROR.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })
    
    it('输入错误验证码',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            let regiest_res = yield API.regiest('','','fasddf',verifycode.token)
            done('应该提示验证码错误')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_ERROR.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('不传 token 值',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            let regiest_res = yield API.regiest('','','fasddf','')
            done('应该提示验证码错误')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_ERROR.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('获取验证码并注册', function(done) {
        // expect(null).toExist()
        co(function*(){
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'测试注册')

            let regiest_res2 = yield API.regiest(username,'password1','123456',verifycode.token)
            done('出现错误，验证码应失效')
        })
        .catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_INVALID.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

})

describe('登录流程测试', function() {

    it('注册后立即登录',function(done){
        co(function*(){
            let username = 'test'+uid(10)

            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            var login = yield API.login(username,'password1',regiest_res.temp_verifycode,regiest_res.temp_token)
            done()
        }).catch(function(err){
            done(err)
        })
    })

    it('测试注册-登录-再次登录-使用旧token测试获取数据', function(done) {
        co(function*(){
            let username = 'test'+uid(10)
             // = expect.createSpy()
            // localhost.href = expect.createSpy()
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            var verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')

            let token = login.token

            BASE.saveToken = expect.createSpy().andReturn(1)

            BASE.getToken = expect.createSpy().andReturn(login.token)

            var listall = yield API.listGetAll(0,20,login.token)
            expect(listall.status).toBe(true,'获取数据')

            //再次登录，使旧token失效
            var verifycode2 = yield API.verify_code()
            expect(verifycode2.status).toBe(true,'获取登录验证码2')
            var login2 = yield API.login(username,'password1',123456,verifycode2.token)
            expect(login2.status).toBe(true,'再次登录，使旧token失效')
            //使用旧 token 获取数据，反馈失败
            var listall2 = yield API.listGetAll(0,20,login.token)
            done('出现错误，token应失效，无法获取数据')
            
        }).catch(function(err){

            if(err.STATUSCODE === CODE.LOGIN_TOKEN_INVALID.STATUSCODE){
                // console.log('err: ',err)
                done()
            }else{
                done(err)    
            }
        })
    })

    it('检查账号重复性',function(done){
        co(function*(){
            let username = 'test'+uid(10)

            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            var verifycode2 = yield API.verify_code()
            expect(verifycode2.status).toBe(true,'获取注册验证码')
            let regiest_res2 = yield API.regiest(username,'password1','123456',verifycode2.token)
            done('出现错误，账号名称重复，应抛出异常')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.USERNAME_REPTER.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('不输入验证码',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')

            let regiest_res = yield API.login('','','','')
            done('出现错误，应该提示验证码不正确')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_ERROR.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('输入错误验证码',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            
            let regiest_res = yield API.login('','','asdddw',verifycode.token)
            done('出现错误，应该提示验证码不正确')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.VERIFY_ERROR.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('不输入账号密码',function(done){
        co(function*(){
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')
            let regiest_res = yield API.login('','','123456',verifycode.token)
            done('出现错误，应该提示没有找到此用户')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.USERNAME_NO_FIND.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })

    it('输入错误账号密码',function(done){
        co(function*(){
            let username = 'test'+uid(10)
            
            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            var verifycode2 = yield API.verify_code()
            expect(verifycode2.status).toBe(true,'获取注册验证码')
            let regiest_res2 = yield API.login('','','123456',verifycode2.token)
            done('出现错误，应该提示没有找到此用户')
        }).catch(function(err){
            if(err.STATUSCODE === CODE.USERNAME_NO_FIND.STATUSCODE){
                done()
            }else{
                done(err)    
            }
        })
    })
})

