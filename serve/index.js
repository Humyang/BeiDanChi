var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors');
var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var $gt = require('mongodb').$gt

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

    this.body = res.result
})

const QUERY_BASE = {'is_move':{$ne:true}}

// 获取列表
router.post('/word/list',body(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    // 获取所有 end_time 小于当天的单词
    let now_time = new Date()
    let time = now_time.getTime()

    let query_filter = Object.assgin({ "end_time":{ $lt: time }},QUERY_BASE)

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
    let query_filter = Object.assgin(QUERY_BASE)

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
// 隐藏单词
router.post('/word/hide',body(),function *(next){
    let id = this.request.fields.id
    let end_time = this.request.fields.end_time

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
    let id = this.request.fields.id
    let end_time = this.request.fields.end_time

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

app.use(mongo())
app.use(router.routes())


app.listen(8081)

console.log("listen serve on port 8081")