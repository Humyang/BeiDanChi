var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors');
var mongo = require('koa-mongo')
app.use(cors());
// 添加单词
router.post('/word/add',body(),function * (next){
    // console.log(this.body)
    // console.log(this.request.word)
    // console.log(this)
    // console.log(this.request.fields)
    // { word: '12', describe: '12', token: '' }
    let word = this.request.fields.word
    let describe = this.request.fields.describe
    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert({word,describe})
    // console.log(res)
    // let res = yield this.mongo
    //         .db('BeiDanChi')
    //         .collection('store')
    //         .update({'app_id':10000},
    //                 {'$set':{app_id:10000,list:list}},
    //                 {'upsert':true});
    this.body = res
})
// 获取列表
router.post('/word/list',function *(next){
    this.body = [
          {describe:'1111111',size:0},
          {describe:'222222222',size:1},
          {describe:'aaaaa',size:1},
          {describe:'a1acxba1aa',size:1},
          {describe:'aa2qwgzaaa2',size:1},
          {describe:'aaahjla3a',size:1},
          {describe:'bbq2bbs4b',size:1},
          {describe:'cc1caacc3c',size:1}
      ]
})
// router.post('/upload', body(), function * (next) {
// })
// app.use(serve('.'));

app.use(mongo())
app.use(router.routes())


app.listen(8081)