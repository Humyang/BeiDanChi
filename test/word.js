import expect from 'expect'

import * as API from '../src/api/main.js'
import co from 'co'
import uid from 'uid'
import * as BASE from '../src/api/base.js'

var CODE = require('../serve/constant.js').CODE

function assert(value,expect,msg,append_msg){
    if(value != expect){
        console.log(append_msg)
        throw new Error(msg)
    }
}
global.localStorage = {}
global.localStorage.setItem=function(){}
describe('单词正删改查模块----', function() {
    it('增删改查', function(done) {
        co(function*(){
            // 生成随机测试帐号
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            assert(verifycode.status,true,verifycode)
            let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
            assert(regiest_res.status,true,regiest_res)

            let verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')

            let token = login.token

            BASE.saveToken = expect.createSpy().andReturn(1)

            BASE.getToken = expect.createSpy().andReturn(login.token)

            // var localhost = {}

            let wordAdd = yield API.wordAdd('test word','some word on here','some describe on here',token)
            expect(wordAdd.status).toBe(true,'添加单词')

            let listGet = yield API.listGet(0,20,token)
            expect(listGet.status).toBe(true,'获取显示列表')
            console.log('listGet: ',listGet)

            let listGetAll = yield API.listGetAll(0,20,token)
            expect(listGetAll.status).toBe(true,'获取所有数据列表')
            console.log('所有数据列表：',listGetAll)

            let hideWord = yield API.hideWord(listGet.list[0]._id,0,token)
            assert(hideWord.status,true,hideWord,'隐藏单词')

            let wordId = yield API.wordId(listGet.list[0]._id,token)
            assert(wordId.status,true,wordId,'查询单个单词')
            console.log('query single word: ',wordId)

            let alterWord = yield API.alterWord(listGet.list[0]._id,'test alter1 word','test alter2 sentence','test alter 3 describe')
            assert(alterWord.status,true,alterWord,'修改单词')
            let alterAfterWord = yield API.wordId(listGet.list[0]._id,token)
            assert(alterAfterWord.status,true,alterAfterWord,'查询单个单词')
            console.log('修改后的单词: ',alterAfterWord)


            let moveWord = yield API.moveWord(listGet.list[0]._id,token)
            assert(moveWord.status,true,moveWord,'移除单词')

            let wordId2 = yield API.wordId(listGet.list[0]._id,token)

            done()
        })
        .catch(function(err){
            if(err.STATUSCODE === CODE.WORD_NOT_FIND.STATUSCODE){
                done()
            }else{
                console.log(err)
                done(err)
            }
        })
    }) 
})
describe('单词编辑模块',function() {
    let token = ""
    co(function*(){
            // 生成随机测试帐号
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            assert(verifycode.status,true,verifycode)
            let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
            assert(regiest_res.status,true,regiest_res)

            let verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')

            token = login.token

            BASE.saveToken = expect.createSpy().andReturn(1)

            BASE.getToken = expect.createSpy().andReturn(login.token)
    })

    it('清空例句',function(done){
        co(function*(){
            // var localhost = {}

            let wordAdd = yield API.wordAdd('test word','some sentence on here','some describe on here',token)
            expect(wordAdd.status).toBe(true,'添加单词')

            let listGet = yield API.listGet(0,20,token)
            expect(listGet.status).toBe(true,'获取显示列表')
            console.log('获取显示列表11: ',listGet)

            let wordId = yield API.wordId(listGet.list[0]._id,token)
            assert(wordId.status,true,wordId,'查询单个单词')
            console.log('查询单个单词22: ',wordId)

            let alterWord = yield API.word_sentence_clear(listGet.list[0]._id,'clear sentence')
            let alterWord2 = yield API.word_sentence_clear(listGet.list[0]._id,'clear sentence2')
            assert(alterWord.status,true,alterWord,'清空例句')
            let alterAfterWord = yield API.wordId(listGet.list[0]._id,token)
            assert(alterAfterWord.status,true,alterAfterWord,'查询单个单词')
            console.log('修改后的单词: ',alterAfterWord)
            console.log('item:',alterAfterWord.history[0].item)

            done()
        })
        .catch(function(err){
            // console.log(err)
            // if(err.STATUSCODE === CODE.WORD_NOT_FIND.STATUSCODE){
            //     done()
            // }else{
            //     console.log(err)
                done(err)
            // }
        })
    })
})
describe('MoveWord',function() {
    let token = ""
    co(function*(){
            // 生成随机测试帐号
            let username = 'test'+uid(10)

            let verifycode = yield API.verify_code()
            assert(verifycode.status,true,verifycode)
            let regiest_res = yield API.regiest(username,'password1',123456,verifycode.token)
            assert(regiest_res.status,true,regiest_res)

            let verify_login = yield API.verify_code()
            expect(verify_login.status).toBe(true,'获取登录验证码')
            var login = yield API.login(username,'password1',123456,verify_login.token)
            expect(login.status).toBe(true,'登录')

            token = login.token

            BASE.saveToken = expect.createSpy().andReturn(1)

            BASE.getToken = expect.createSpy().andReturn(login.token)
    })
    it('设置realword', function(done) {
        co(function*(){
            let wordAdd = yield API.wordAdd('test word','some sentence on here','some describe on here',token)
            expect(wordAdd.status).toBe(true,'添加单词')

            let listGet = yield API.listGet(0,20,token)
            expect(listGet.status).toBe(true,'获取显示列表')
            console.log('获取显示列表11: ',listGet)

            let wordId = yield API.wordId(listGet.list[0]._id,token)
            assert(wordId.status,true,wordId,'查询单个单词')
            console.log('查询单个单词22: ',wordId)

            let alterWord = yield API.word_sentence_clear(listGet.list[0]._id,'clear sentence')
        }).catch(function(err){
            done(err)
        })
    })
})
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