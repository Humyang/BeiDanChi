
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

