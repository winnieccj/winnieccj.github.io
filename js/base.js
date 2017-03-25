var APP = APP || {};

APP.namespace = function(ns){
	var parts = ns.split('.'),
	    parent = APP,
	    i;

	if(parts[0] === 'APP'){
		parts = parts.slice(1);
	}

	for(i = 0,len = parts.length;i < len;i++){
		if( typeof parent[parts[i]] === 'undefined' ){
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

APP.namespace('APP.utils.DOM');

APP.namespace('APP.utils.Event');



APP.utils.Event.on = function(ele,type,listener){
	if(window.addEventListener){
		this.on = function(ele,type,listener){
			ele.addEventListener(type, listener,false);
		}
	}else{
		this.on = function(ele,type,listener){
			ele.attachEvent('on' + type, listener,false);
		}
	}

	this.on(ele,type,listener);
}


APP.namespace('APP.utils.Cookie');

APP.utils.Cookie.set = function(name,value,expires,domain,path,secure){

	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	
	if(expires){
		var date = new Date();
		date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000) );
		cookie += '; expires=' + date.toGMTString();
	}

	if(domain){
		cookie += '; domain=' + domain;
	}

	if(path){
		cookie += '; path=' + path;
	}

	if(secure){
		cookie += '; secure=' + secure;
	}

	document.cookie = cookie;
};

APP.utils.Cookie.get = function(){
	var cookieObj = {};
	var all = document.cookie;
	if(all === ''){
		return cookieObj;
	}

	var list = all.split('; ');

	for(var i = 0;i < list.length;i++){
		var item = list[i];
		var pos = item.indexOf('=');
		var name = item.substring(0,pos);
		name = decodeURIComponent(name);
		var value = item.substring(pos + 1);
		value = decodeURIComponent(value);
		cookieObj[name] = value;
	}

	return cookieObj;
};

APP.utils.Cookie.del = function(name,value,expires,domain,path,secure){
	this.set(name,'',-1,domain,path,secure);
};
