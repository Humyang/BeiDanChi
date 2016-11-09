var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors');
var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var objectAssign = require('object-assign');
var uid = reuiqre('uid')
// var ccap = require('ccap');
app.use(cors());


// 添加单词
router.post('/word/add',body(),function * (next){
    let word = this.request.fields.word
    let describe = this.request.fields.describe

    let now_time = new Date()
    let end_time = now_time.getTime()

    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert({word,describe,end_time})

    this.body = {
      status:true,
      result:res.result
    }
})

const QUERY_BASE = {'is_move':{$ne:true}}

// 获取列表（以到达显示时间）
router.post('/word/list',body(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    // 获取所有 end_time 小于当天的单词
    let now_time = new Date()
    let time = now_time.getTime()

    let query_filter = objectAssign({ "end_time":{ $lt: time }},QUERY_BASE)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter)
                            .toArray();

    console.log('/word/list：',list)

    this.body = {
      status:true,
      list
    }
})
// 获取所有
router.post('/word/all',body(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number
    let query_filter = objectAssign(QUERY_BASE)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter).toArray();

    console.log('/word/all：',list)

    this.body = {
      status:true,
      list
    }
})
// 获取单个
router.post('/word/id',body(),function *(next){

    let id = this.request.fields.id

    let query_filter = objectAssign({'_id':ObjectId(id)},QUERY_BASE)

    let word = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .findOne(query_filter);

    console.log('/word/id：',word)

    this.body = objectAssign({
      status:true},
      word)
    
})

// 隐藏单词
router.post('/word/hide',body(),function *(next){
    let id = ""
    let end_time = this.request.fields.end_time


    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  res:"id 类型无效"
                }
    }

    let res = yield this.mongo
            .db('BeiDanChi')
            .collection('word_list')
            .update({'_id':ObjectId(id)},
                    {'$set':{end_time}},
                    {'upsert':true});

    this.body = {
      status:true,
      res
    }
})
// 移除单词
router.post('/word/move',body(),function *(next){
    let id = ""
    let end_time = this.request.fields.end_time

    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  msg:"id 类型无效"
                }
    }

    let res = yield this.mongo
            .db('BeiDanChi')
            .collection('word_list')
            .update({'_id':ObjectId(id)},
                    {'$set':{end_time,is_move:true}},
                    {'upsert':true});

    this.body = {
      status:true,
      res
    }
})

router.post('/regiest',body(),function *(next){

    let fields = this.request.fields

    // 验证验证码

    // 验证账号格式
    
    // 验证密码格式

    // 验证账号重复性

    // 写入数据库

    // 响应


    // let res = yield this.mongo
    //         .db('BeiDanChi')
    //         .collection('word_list')
    //         .update({'_id':ObjectId(id)},
    //                 {'$set':{end_time,is_move:true}},
    //                 {'upsert':true});

    this.body = {
      status:true,
      res
    }
})

router.all('/verify',function *(next){

    // 生成 Token
    let Token = uid(20)
    
    // 生成 验证码
    let verify_code = "123456"
    // 验证码转换为 base64 图片
    // Token，verify_code 存入数据库

    let insert = {
        Token,
        verify_code,
        
    }

    // 返回 验证码
    this.body = verify_code
})

app.use(mongo())
app.use(router.routes()).use(router.allowedMethods());


app.listen(8082)

console.log("listen serve on port 8081")