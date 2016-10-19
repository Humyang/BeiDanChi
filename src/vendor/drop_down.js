var drop_down = {
    startY:0,
    startScrollTop:0,
    direction:'',
    currentY:0,
    scrollEventTarget:'',
    translate:0,
    callback:function(){},
    getScrollTop:function(element){

        if (element === window) {
            return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {

            return element.scrollTop;
        }
    },
    handleTouchStart:function(event){
        this.startY = event.touches[0].clientY;
        // 获取滚动条头部位置
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
    },
    handleTouchMove:function(event){
        // 当前点击位置
        this.currentY = event.touches[0].clientY;

        // 与起始点击位置的距离
        let distance = this.currentY - this.startY;
        // 判断方向
        this.direction = distance > 0 ? 'down' : 'up';



        if (
            this.direction === 'down' 
            && this.getScrollTop(this.scrollEventTarget) === 0 
            // && this.topStatus !== 'loading'
            ) {
            event.preventDefault();
            event.stopPropagation();
            this.translate = distance - this.startScrollTop;
            if (this.translate < 0) {
                this.translate = 0;
            }
            // console.log(this.translate)
            // this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
        }
    },
    handleTouchEnd:function(event){
        
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
            // console.log(this.translate)
            if(this.translate > 50){
                this.callback()
            }
            // 
        }
    },

    getScrollEventTarget:function(element){
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
    },
    listen:function(elementId, options,callback){
        if(callback===undefined){
            callback = options
        }
        this.callback = callback
        var element = document.getElementById(elementId)
        console.log(element)
        this.scrollEventTarget = this.getScrollEventTarget(element);
        element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        element.addEventListener('touchmove', this.handleTouchMove.bind(this));
        element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
}

export default drop_down