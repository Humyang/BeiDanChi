import expect from 'expect'

import * as API from '../src/api/main.js'
import co from 'co'
import uid from 'uid'
var CODE =  require('../serve/constant.js').CODE
// mocha --compilers js:babel-register --recursive login.js
        
describe('登录模块测试----', function() {
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

    it('测试注册-登录-再次登录-使用旧token测试获取数据', function(done) {
        co(function*(){
            let username = 'test'+uid(10)

            var verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取注册验证码')

            let regiest_res = yield API.regiest(username,'password1','123456',verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            var verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')
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
})
