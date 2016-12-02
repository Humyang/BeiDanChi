import expect from 'expect'

import * as API from '../src/api/main.js'
import co from 'co'
import uid from 'uid'
var CODE =  require('../serve/constant.js').CODE

describe('单词正删改查模块----', function() {
    it('增删改查', function(done) {
        co(function*(){
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            expect(verifycode.status).toBe(true,'获取验证码')
            let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
            expect(regiest_res.status).toBe(true,'注册账号')

            let verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')

            let token = login.token

            let wordAdd = yield API.wordAdd('test word','some word on here',token)
            expect(wordAdd.status).toBe(true,'添加单词')

            let listGet = yield API.listGet(0,20,token)
            expect(listGet.status).toBe(true,'获取显示列表')

            let listGetAll = yield API.listGetAll(0,20,token)
            expect(listGetAll.status).toBe(true,'获取所有数据列表')

            done()
        })
        .catch(function(err){
            done(err)
        })
    })
    
})