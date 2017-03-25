/**
 * 序列化对象
 * @param {object} data - 对象
 * @return {string}  -  返回一个序列化后的字符串
 */

function serialize(data){
	var res = '';
	for(var key in data){
		res += key + '=' + data[key] + '&';
	}
	return res.substring(0,res.length - 1);
};

/**
 * ajax工具类
 * @param {object} opts - 参数对象
 */

function ajax(opts){
	var opts = opts || {};
	opts.method = opts.method || 'GET';
	opts.url = opts.url || '';
	opts.data = opts.data || {};
	opts.success = opts.success || function(){};

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){

		if(xhr.readyState == 4 && (xhr.status === 200 || xhr.status === 304)){
			if(opts.success && typeof opts.success === 'function'){
				opts.success(xhr.responseText);
			}
		}
	};

	if(opts.method === 'GET'){
		if(opts.data !== null){
			opts.url += '?' + serialize(opts.data);
		}
	}

	xhr.open(opts.method , opts.url,true);

	if(opts.method === 'GET'){
		xhr.send(null);
	}else{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(serialize(opts.data));
	}

}

/**
 *  tween效果
 */
var effects = {

    linear: function (t, b, c, d) {

        return c * t / d + b;

    },
    quadIn: function (t, b, c, d) {

        return c * (t /= d) * t + b;
    },
    quadOut: function (t, b, c, d) {

        return -c * (t /= d) * (t - 2) + b;
    },
    quadInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {

            return c / 2 * t * t + b;
        }

        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    cubicIn: function (t, b, c, d) {

        return c * (t /= d) * t * t + b;
    },
    cubicOut: function (t, b, c, d) {

        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    cubicInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {

            return c / 2 * t * t * t + b;
        }

        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },

    // Copy of cubic
    easeIn: function (t, b, c, d) {

        return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {

        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {

            return c / 2 * t * t * t + b;
        }

        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    // End copy
    quartIn: function (t, b, c, d) {

        return c * (t /= d) * t * t * t + b;
    },
    quartOut: function (t, b, c, d) {

        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    quartInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {

            return c / 2 * t * t * t * t + b;
        }

        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    quintIn: function (t, b, c, d) {

        return c * (t /= d) * t * t * t * t + b;
    },
    quintOut: function (t, b, c, d) {

        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    quintInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }

        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    sineIn: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    sineOut: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    sineInOut: function (t, b, c, d) {

        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    expoIn: function (t, b, c, d) {

        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    expoOut: function (t, b, c, d) {

        return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    expoInOut: function (t, b, c, d) {

        if (t === 0) { return b; }
        if (t === d) { return b + c; }

        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }

        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circIn: function (t, b, c, d) {

        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    circOut: function (t, b, c, d) {

        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    circInOut: function (t, b, c, d) {

        if ((t /= d / 2) < 1) {

            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }

        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    bounceIn: function (t, b, c, d) {

        return c - effects.bounceOut(d - t, 0, c, d) + b;
    },
    bounceOut: function (t, b, c, d) {

        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else

        if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else

        if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        }
    },
    bounceInOut: function (t, b, c, d) {

        if (t < d / 2) {
            return effects.bounceIn(t * 2, 0, c, d) * 0.5 + b;
        }

        return effects.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
    elasticIn: function (t, b, c, d, a, p) {

        if (t === 0) { return b; }

        if ((t /= d) === 1) {
            return b + c;
        }

        if (!p) {
            p = d * 0.3;
        }

        if (!a) {
            a = 1;
        }
        var s = 0;

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function (t, b, c, d, a, p) {

        if (t === 0) {
            return b;
        }

        if ((t /= d) === 1) {
            return b + c;
        }

        if (!p) {
            p = d * 0.3;
        }

        if (!a) {
            a = 1;
        }
        var s = 0;

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticInOut: function (t, b, c, d, a, p) {

        if (t === 0) {
            return b;
        }

        if ((t /= d / 2) === 2) {
            return b + c;
        }

        if (!p) {
            p = d * (0.3 * 1.5);
        }

        if (!a) {
            a = 1;
        }
        var s = 0;

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        if (t < 1) {

            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }

        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
};


/**
 * 获取样式
 * @param {object} ele - dom元素
 * @param {string} attr - 属性名
 * @return {mixed}  -  返回获取后的元素的样式
 */


function getStyle(ele,attr){
	
	if(window.getComputedStyle){

		return parseFloat(window.getComputedStyle(ele,null)[attr],10);
	}else{

		//透明度处理
		if(attr === 'opacity'){
			var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			var opacity = ele.currentStyle.filter;
			if(reg.test(opacity)){
				
				var value = RegExp.$1 / 100;

				if(value >= 1){
					return 1;
				}else if(value < 0.01){
					return 0;
				}else{
					return value;
				}


			}else{
				return 1;
			}
		}

		return parseFloat(ele.currentStyle[attr],10);
	}

};

/**
 * 设置样式
 * @param {object} ele - dom元素
 * @param {string} attr - 属性名
 * @param {mixed} value - 属性值
 */


function setStyle(ele, attr, value){
	if(attr == 'opacity'){
		ele.style.opacity = value;
		ele.style.filter = 'alpha(opacity=' + (value * 100) + ')'; //ie
		
	}else if(attr === 'float'){
		ele.style.cssFloat = value;  
		ele.style.styleFloat = value; 
	}else{
		ele.style[attr] =  value + 'px';
	}	
};


/**
 * 动画工具
 * @param {object} ele - dom元素
 * @param {object} json - 动画元素的属性对象
 * @param {int} speed - 速度
 * @param {string} effect - 动画的效果类型
 * @param {function} callback - 回调函数
 */

var animate = function(ele, json, speed, effect , callback){

	var effectFn;

	//如果effect不存在?
	if(typeof effect === 'function'){

		callback = effect;
		effectFn = effects['linear'];

	}else if(typeof effect === 'string'){
		effectFn = effects[effect];
	}else{
        effectFn = effects['linear'];
    }

	speed = speed || 500;

	var fromObj = {};
	var distanceObj = {};
	var counter = 0;

	for(var attr in json){
		var from = getStyle(ele, attr); 
		var to = json[attr];
		var distance = to - from; 		

		//有效
		if(distance){
			fromObj[attr] = from;
			distanceObj[attr] = distance;
			counter++;
		}
	}

	//如果无效下面事情不做了
	if(counter === 0){
		return;
	}
	
	var interval = 10; 
	var times = 0; 

	if(ele.intervalID){
		clearInterval(ele.intervalID);
	}





	var step = function(){
		
		times += interval;
		
		if(times > speed){

			//最终值
			for(var attr in json){
				var to = json[attr];
				setStyle(ele,attr,to);
			}
			
			clearInterval(ele.intervalID);
			ele.intervalID = null;

			if(callback && typeof callback === 'function'){
				callback.call(ele);
			}

		}else{

			for(var attr in distanceObj){
				var from = fromObj[attr]; //开始
				var distance = distanceObj[attr];
				
                var value = effectFn(times, from, distance, speed );
              
				
				setStyle(ele,attr,value);
				//setStyle(ele,attr,distance * times / speed + from);
			}

		}
	};

	ele.intervalID = setInterval(step, interval);

};	

/*  tips模块 start  */
var tipsMod = (function(){

    return {

        init:function(){
            this.renderUI();
            this.initTips();
            this.bind();            
        },

        renderUI:function(){
            this.tips = document.querySelector(".g-tips");
            this.closed = document.querySelector("#closed");
            this.$Event = APP.utils.Event;
            this.$Cookie = APP.utils.Cookie;
        },

        bind:function(){
            var me = this;
            this.$Event.on(this.closed,'click',function(){
                me.closeTips();
            });
        },

        initTips:function(){
            if(!this.$Cookie.get().tipsShow){
                this.tips.style.display = "block";
            }
        },

        closeTips:function(){
            this.$Cookie.set('tipsShow','exists',30);
            this.tips.style.display = "none";
        }
    }
})();

tipsMod.init();

/*  tips模块 end  */

/*  video模块 start  */

var videoMod = (function(){
    
    return {

        init:function(){
            this.renderUI();
            this.bind();
        },

        renderUI:function(){
            this.gVid = document.querySelector('.g-vid');
            this.logoVideo = document.querySelector('.m-logoVideo');
            this.mask = null;
            this.$Event = APP.utils.Event;
            this.wyVideo = document.querySelector('.wy-video');
        },

        createMask:function(){
            this.mask = document.createElement('div');
            this.mask.className = 'm-mask';
            document.body.appendChild(this.mask);

        },

        removeMask:function(){
            document.body.removeChild(this.mask);
            this.wyVideo.currentTime = 0;
            this.wyVideo.pause();
            
        },

        bind:function(){

            var me = this;

            this.$Event.on(this.gVid,'click',function(){
                me.logoVideo.style.display = 'block';
                me.createMask();
            });

            this.$Event.on(this.logoVideo,'click',function(e){
                var target = e.target;

                if(target.className === "m-closed"){
                    me.logoVideo.style.display = 'none';
                    if(this.mask !== null){
                        me.removeMask();
                    }
                }
            });
        }
    }



})();
videoMod.init();
/*  video模块 end  */


/*  login模块 start  */

    var loginMod = (function(){

    return {

        init:function(){
            this.renderUI();
            this.bind();            
        },

        renderUI:function(){
            this.account = document.querySelector('#account');
            this.pwd = document.querySelector('#pwd');
            this.loginBtn = document.querySelector('.btn input');
            this.logoForm = document.querySelector('.m-logoForm');
            this.collect = document.querySelector('.collect');
            this.hasCol = document.querySelector('.hasCol');

            this.account = document.querySelector('#account');
            this.pwd = document.querySelector('#pwd');
            this.labels = document.querySelectorAll('.m-position label');

            this.mask = null;
            this.$Cookie = APP.utils.Cookie;
            this.$Event = APP.utils.Event;
            
        },

        createMask:function(){
            this.mask = document.createElement('div');
            this.mask.className = 'm-mask';
            document.body.appendChild(this.mask);

        },

        removeMask:function(){
            document.body.removeChild(this.mask);
            
        },

        bind:function(){
            var me = this;

            this.$Event.on(this.loginBtn,'click',function(){
                me.checkUserNameAndPwd();
            });

            this.$Event.on(this.logoForm,'click',function(e){
                var target = e.target;
                
                if(target.className === "m-closed"){
                    me.logoForm.style.display = 'none';
                    if(this.mask !== null){
                        me.removeMask();
                    }
                }
                e.stopPropagation();
            });

            this.$Event.on(this.account,'focus',function(){
                this.labels[0].style.display = 'none';
            });

            this.$Event.on(this.pwd,'focus',function(){
                this.labels[0].style.display = 'none';
            });

            this.$Event.on(this.account,'blur',function(){
                if(this.value.length === 0){
                    this.labels[0].style.display = 'block';
                }else{
                    this.labels[0].style.display = 'none';
                }
                
            });

            this.$Event.on(this.pwd,'blur',function(){
                if(this.value.length === 0){
                    this.labels[0].style.display = 'block';
                }else{
                    this.labels[0].style.display = 'none';
                }
            });


        },



        isValidate:function(){
            return this.checkUserNameAndPwd();
        },

        checkUserNameAndPwd:function(){
            
            var me = this;

            ajax({
                url:"http://study.163.com/webDev/login.htm",
                data:{userName:md5(this.account.value),password:md5(this.pwd.value)},
                success:function(data){
                    if(data == 1){
                        me.$Cookie.set('loginSuc','success',30);
                        me.logoForm.style.display = 'none';
                        if(me.mask !== null){
                            me.removeMask();
                        }
                        me.collect.style.display = 'none';
                        me.hasCol.style.display = 'block';

                        return true;
                        
                    }else{
                        alert('登录失败');
                    }
                }
            })
            return false;
        }
    }
})();

loginMod.init();

/*  login模块 end  */

/*  follow模块 start  */

var followMod = (function(loginMod){
    
    return {

        init:function(){
            this.renderUI();
            this.bind();
            this.checkFollow();
        },

        renderUI:function(){
            this.collect = document.querySelector('.collect');
            this.hasCol = document.querySelector('.hasCol');
            this.cancel = document.querySelector('.cancel');
            this.$Event = APP.utils.Event;
            this.$Cookie = APP.utils.Cookie;        
        },

        checkFollow:function(){
            if( this.$Cookie.get().followSuc ){
                    this.collect.style.display = 'none';
                    this.hasCol.style.display = 'block';
                }
        },

        bind:function(){

            var me = this;

            this.$Event.on(this.collect,'click',function(e){
                
                //如果没有登录
                if( !(me.$Cookie.get().loginSuc) ){
                    loginMod.logoForm.style.display = 'block';
                    loginMod.createMask();
                }else{
                    ajax({
                        url:"http://study.163.com/webDev/attention.htm",
                        success:function(data){
                            if(data == 1){
                                me.$Cookie.set('followSuc','success',30);
                                me.collect.style.display = 'none';
                                me.hasCol.style.display = 'block';  
                            }
                        }
                    })

                    

                }
                e.stopPropagation();
            });

            this.$Event.on(this.cancel,'click',function(){
                me.$Cookie.del('followSuc');
                me.collect.style.display = 'block';
                me.hasCol.style.display = 'none';
            });     
        }
    }
})(loginMod);

followMod.init();
/*  follow模块 end  */

/*  banner模块 start  */
var bannerMod = (function(){
    
    return {

        init:function(){
            this.renderUI();
            this.bind();
            this.autoPlay();
        },

        renderUI:function(){
            this.pics = document.querySelector('.pics');
            this.aPics = this.pics.querySelectorAll('a');
            this.uls = document.querySelector('.item');
            this.lis = this.uls.querySelectorAll('li');
            this.now = 0;
            this.$Event = APP.utils.Event;
            this.setIntervalID = null;
        },

        bind:function(){

            var me = this;
            

            for(var i = 0; i< this.aPics.length; i++){

                this.$Event.on(this.aPics[i],'mouseover',function(){
                    clearInterval(me.setIntervalID);
                });

                this.$Event.on(this.aPics[i],'mouseout',function(){
                    me.autoPlay();
                });

                this.lis[i].index = i;

                this.$Event.on(this.lis[i],'click',function(){  
                    me.now = this.index;
                    me.change();
                })
            }

            
        },

        autoPlay:function(){

            var me = this;  

            this.setIntervalID = setInterval( function(){

                    me.now++;

                    if(me.now === 3){
                        me.now = 0;
                    }

                    me.change();
            } , 5000 );
        },

        change:function(){

            var me = this;

            for(var i = 0; i < me.lis.length; i++){
                me.lis[i].className = '';
                me.aPics[i].style.opacity = 0;
                me.aPics[i].style.zIndex = 1;
            }
                
            me.lis[me.now].className = 'cur';
            me.aPics[me.now].style.zIndex = 2;
            
            animate(me.aPics[me.now],{zIndex:2,opacity:1},500);
        }



    }
})();

bannerMod.init();
/*  banner模块 end  */


/*  pagination模块 start  */
var pageMod = (function(){
    return {
        init:function(curPage,totalPage){
            return this.showPage(curPage,totalPage);
        },

        showPage:function(curPage,totalPage){

            var curPage = curPage;//当前页
            var pageSize = 20;//每页20条记录
            var totalPage = totalPage; //总页数
            var len = 8;//列表长度
            var num = Math.floor( len / 2 );
            var start = 0;
            var end = 0;

            var p = '';

            //根据不同情况，确定start end的值

            //总页面数 < 列表长度
            if(totalPage < len){
                start = 1;
                end = totalPage;
            }else{
                //当前页 <= 结束
                if(curPage <= len){
                    if(curPage == len){
                        start = 2;
                        end = len + 1;
                    }else{
                        start = 1;
                        end = len;
                    }
                }else if(curPage > totalPage - len + 1){
                    start = totalPage - len + 1;
                    end = totalPage;
                }else{
                    start = curPage - num;
                    end = curPage + num - 1;
                }
            }

            p += '<a class="pagelist prev" href="javascript:;"> &lt; </a>';

            for(var i = start; i <= end; i++){
                if(i == curPage){
                    p += '<a class="pageCur" data-page="'+ i +'" href="javascript:;">'+ i +'</a>';
                }else{
                    p += '<a data-page="'+ i +'" href="javascript:;">'+ i +'</a>';
                }
            }
            p += '<a class="pagelist next" href="javascript:;"> &gt; </a>';
            return p;
        }

    }
})();



/*  pagination模块 end  */


/*  main模块 start  */
    var tabMod = (function(pageMod){
    return {
        init:function(){
            this.readerUI();
            this.goPage(1);
            this.bind();
        },
        readerUI:function(){
            this.tab = document.querySelector('.m-course-tab');
            this.present = document.querySelector('.present');
            this.couCont = document.querySelector('.m-course-cont');
            this.mParent = document.querySelector('.m-parent');
            this.$Event = APP.utils.Event;
            this.pageDiv = null;
            this.type = 10;
            this.pageDiv = document.querySelector('.page');
            this.showDiv = null;

        },
        siblings:function(ele){
            var _res = [];  //存放兄弟节点的数组
            var _prev = ele.previousSibling; //当前元素的前一个兄弟节点
            var _next = ele.nextSibling;     //当前元素的后一个兄弟节点

            while(_prev){
                if(_prev.nodeType === 1){
                    _res.unshift(_prev);
                }
                _prev = _prev.previousSibling;
            }

            while(_next){
                if(_next.nodeType === 1){
                    _res.unshift(_next);
                }
                _next = _next.nextSibling;
            }
            return _res;
        },

        getPos:function(ele){

            var left = 0;
            var top = 0;

            left += ele.offsetLeft;
            top += ele.offsetTop;
            ele = ele.offsetParent;

            while(ele){
                
                left += ele.offsetLeft  - ele.scrollLeft + ele.clientLeft;
                top  += ele.offsetTop - ele.scrollTop + ele.clientTop;
                ele = ele.offsetParent;
            }

            return {
                top:  top,
                left: left
            }
        },
        bind:function(){
            var me = this;

            this.$Event.on(this.tab,'click',function(e){
                var target = e.target;

                if(target.tagName = 'A'){
                    var arr = me.siblings(target);
                    for(var i = 0; i< arr.length;i++){
                        arr[i].className = '';
                    }
                    target.className = 'present';

                    me.type = target.getAttribute('data-type');
                    me.goPage(1);
                }   
            });
            
        },


        goPage: function(pageNo){

            var me = this;

            ajax({
                url:'http://study.163.com/webDev/couresByCategory.htm',
                data:{
                    pageNo : pageNo,
                    psize : 20,
                    type : me.type
                },
                success: function(data){
                    me.initPage(data);
                    me.getData(data);
                }
            })

        },

        initPage:function(data){
            var me = this;
            var data = JSON.parse(data);
            var curPage = data.pagination.pageIndex;


            this.pageDiv.innerHTML = pageMod.init(data.pagination.pageIndex,data.totalPage);
            this.pageDiv.onclick =  function(e){
                var target = e.target;
                if(target.className == 'pagelist prev'){
                    curPage--;
                    me.goPage(curPage);
                }

                if(target.className == 'pagelist next'){
                    curPage++;
                    me.goPage(curPage);
                }

                if(target.getAttribute('data-page')){
                    var page = parseInt( target.getAttribute('data-page'),10 );
                    me.goPage(page);
                }
            };
        },


        getData: function(data){    
            var data = JSON.parse(data);
            this.appendHTML(data);
        },

        sb:function(str){
            return str.substring(0,60) + '...';
        },

        appendHTML: function(data){
            
            var res = '';
            this.mParent.innerHTML = '';

            for(var i in data.list){
                
                res += '<div class="m-wares"><div class="m-wrap"><div class="m-imgs"><img src="'+ data.list[i].middlePhotoUrl +'"/></div></div><div class="tit"><h3 class="thide">'+ data.list[i].name +'</h3></div><div class="source">音频帮</div><div class="thumb"><div class="desc"><span class="hot">'+ data.list[i].learnerCount +'</span></div><div class="money"><span class="normal">'+ (data.list[i].price == 0 ? "免费" : "¥" + data.list[i].price ) +'</span></div></div><div class="m-cur clearfix"><div class="m-cur-cont clearfix"><div class="m-pics fl"><img src="'+ data.list[i].middlePhotoUrl +'"/></div><div class="m-menu fl"><h2>'+ data.list[i].name +'</h2><p class="m-menu-f"><span></span>'+ data.list[i].learnerCount +'人在学</p><p>发布者：<span>'+ data.list[i].provider +'</span></p><p>分类：<span>'+ data.list[i].categoryName +'</span></p></div></div><div class="m-words"><p>' + this.sb(data.list[i].description) +'</p></div></div></div>';

            }

            this.mParent.innerHTML = res;

        }



    }
})(pageMod);


tabMod.init();
        

/*  main模块 end  */

/*  couresTop模块 start  */
    var courseTop = (function(){

    return {
        init:function(){
            this.readerUI();
            this.getData();
            this.scrollData();
        },
        readerUI:function(){
            this.mHot = document.querySelector('.m-hot');
            this.cur = 0;
        },
        getData:function(){
            var me = this;
            me.mHot.innerHTML = '';
            ajax({
                url:'http://study.163.com/webDev/hotcouresByCategory.htm',
                success:function(data){
                    var data = JSON.parse(data);

                    for(var i in data){
                        
                        var courseHtml = '<div class="hot-list clearfix"><div class="hot-img fl"><img src="'+ data[i].smallPhotoUrl +'" alt="rank.jpg"></div><div class="hot-cont fl"><h3>'+ data[i].name +'</h3><p><span class="hot-span"></span><span class="num">'+ data[i].learnerCount +'</span></p></div></div>';

                        me.mHot.innerHTML += courseHtml;                    
                    }
                    me.mHot.innerHTML += me.mHot.innerHTML;
                }

            }); 
            
        },


        scrollData:function(){
            var me = this;
            
            setInterval( function(){
                me.cur++;
                animate( me.mHot,{ top : -me.cur * 70 },500,function(){
                    if(me.cur >= 20){
                        me.cur = 0;
                        me.mHot.style.top = 0;                      
                    }               
                });
            }, 5000);           
        }
    }
})();
courseTop.init();

/*  couresTop模块 end  */



