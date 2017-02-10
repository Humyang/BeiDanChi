var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var objectAssign = require('object-assign')
var throwError = require('../error.js').throwError
var CONSTANT = require('../constant.js')
var DAY = CONSTANT.DAY
var CODE = CONSTANT.CODE
var METHOD = require('../method.js')
let BASE_QUERY = {}
Object.defineProperty( BASE_QUERY, "WORD", {
  value: Object.freeze({'is_move':{$ne:true}}),
  writable: false,
  enumerable: true,
  configurable: true
});
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
    let query_filter = objectAssign({ "end_time":{ $lt: time }},BASE_QUERY.WORD,this.login_status)
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
    let query_filter = objectAssign({},BASE_QUERY.WORD,this.login_status)
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
    let query_filter = objectAssign({'_id':ObjectId(id)},BASE_QUERY.WORD)
    let word = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .findOne(query_filter);

    console.log('/word/id：',word)
    if(word === null){
        throwError(CODE.WORD_NOT_FIND,id)
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
function* sentenceClear(next){
    let id = ""

    let sentence = this.request.fields.sentence
    // let now = new Date()
    // let time = now.getTime()

    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  msg:"id 类型无效"
                }
    }

    let word_result = yield this.mongo
    .db('BeiDanChi')
    .collection('word_list')
    .findOne({'_id':id})


    let history = METHOD.historyAdd(word_result.history,sentence)

    let update_result = yield this.mongo
    .db('BeiDanChi')
    .collection('word_list')
    .update({_id: word_result._id},
            {$set: {history: history,
                    sentence:""}})

    this.body = {
                status:true,
                update_result
            }
}
function* setMoveWordReal(next){
    let id = ""
    let sentence = this.request.fields.sentence
    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  msg:"id 类型无效"
                }
    }

    let update_result = yield this.mongo
    .db('BeiDanChi')
    .collection('word_list')
    .update({_id: id},
            {$set: {movewordreal: sentence}})

    this.body = {
                status:true,
                update_result
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
    sentenceClear,
    setMoveWordReal
}