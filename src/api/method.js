export const timeFormat = function(timestamp){
    console.log('timestamp',timestamp)
    if(timestamp!=undefined){
        let time = new Date(timestamp) 
        return time.toLocaleDateString() +" "+ time.toLocaleTimeString()
    }
    return undefined
}