// var DAY = require('./constant.js').DAY
import {DAY} from './constant.js'
export const timeFormat = function(timestamp){
    // console.log('timestamp',timestamp)

    if(timestamp!=undefined){
        let cueent = new Date()
        let target = new Date(timestamp) 
        if(cueent.getTime() > timestamp){
            return 'now'
        }
        let remain = target - cueent
        return Math.round(remain/DAY)+"天后 "+ target.toLocaleDateString() +" "+ target.toLocaleTimeString()
    }

    return "unkonw"
}
var CODE = require('../../serve/constant.js').CODE
export const pageHandle = function(err){
    if( CODE.LOGIN_NO_LOGIN.STATUSCODE === err.STATUSCODE ||
        CODE.LOGIN_TOKEN_INVALID.STATUSCODE === err.STATUSCODE){
          this.$router.go('/login')
    }
}

