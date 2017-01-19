var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var objectAssign = require('object-assign')
var throwError = require('../error.js').throwError
var CONSTANT = require('../constant.js')
var DAY = CONSTANT.DAY
var CODE = CONSTANT.CODE
const QUERY_BASE = {'is_move':{$ne:true}}
function* add (next){
    let word = this.request.fields.word
    let describe = this.request.fields.describe
    let sentence = this.request.fields.sentence

    let now_time = new Date()
    let end_time = now_time.getTime()

    let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert(insert_obj)

    this.body = {
      status:true,
      result:res.result,
      _id:res.insertedIds[1]
    }
}
function* list (next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    // 获取所有 end_time 小于当天的单词
    let now_time = new Date()
    let time = now_time.getTime()

    let query_filter = objectAssign({ "end_time":{ $lt: time }},QUERY_BASE,this.login_status)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter)
                            .sort({_id:-1})
                            .toArray();

    console.log('/word/list：',list)

    this.body = {
      status:true,
      list
    }
}
function* all(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number
    // this.login_status
    let query_filter = objectAssign(QUERY_BASE,this.login_status)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter)
                            .sort({end_time:1})
                            .toArray();

    console.log('/word/all：',list)

    this.body = {
      status:true,
      list
    }
}
function* id(next){

    let id = this.request.fields.id
    console.log('this.request.fields.id：',id)
    let query_filter = objectAssign({'_id':ObjectId(id)},QUERY_BASE)
    console.log('QUERY_BASE：',QUERY_BASE)
    console.log('query_filter：',query_filter)
    let word = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .findOne(query_filter);

    console.log('/word/id：',word)
    if(word === null){
        throwError(CODE.WORD_NOT_FIND,id)
        // return this.body = {
        //     status:false,
        //     msg:'未查询到: '+ObjectId(id)
        // }
    }
    this.body = objectAssign({
      status:true},
      word)
    
}
function* hide(next){
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
}
function* move(next){
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
}
// 修改单词
function* alter(next){
    let id = ""
    // let end_time = this.request.fields.end_time

    let word = this.request.fields.word
    let describe = this.request.fields.describe
    let sentence = this.request.fields.sentence

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
                    {'$set':{word,describe,sentence}});

    this.body = {
      status:true,
      res
    }
}
function* sentence_clear(next){
    let id = ""

    let sentence = this.request.fields.sentence
    let now = new Date()
    let time = now.getTime()

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
    .find({'_id':ObjectId(id)})
    .snapshot()
    .forEach(function (elem) {
        db.word_list.update(
                {
                    _id: elem._id
                },
                {
                    $set: {
                        history: elem.history + elem.sentence,
                        sentence:""
                    }
                }
            )
        }
    )

    this.body = {
      status:true,
      res
    }
}

module.exports = {
    add,
    list,
    all,
    id,
    hide,
    move,
    alter,
    sentence_clear
}