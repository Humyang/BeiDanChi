
export const timeFormat = function(timestamp){
    // console.log('timestamp',timestamp)

    if(timestamp!=undefined){
        let cueent_time = new Date()
        let time = new Date(timestamp) 
        if(cueent_time.getTime() > time){
            return 'now'
        }
        return time.toLocaleDateString() +" "+ time.toLocaleTimeString()
    }

    return "unkonw"
}
var CODE = require('../../serve/constant.js').CODE
export const pageHandle = function(err){
    if( CODE.LOGIN_NO_LOGIN.STATUSCODE === err.STATUSCODE ||
        CODE.LOGIN_TOKEN_INVALID.STATUSCODE === err.STATUSCODE){
          // console.log('jump')
          // location.href = '/login'
          this.$router.go('/login')
    }
}

