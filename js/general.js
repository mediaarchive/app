function setcookie(name, value, expires, path, domain, secure){	// создает куки
	document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}


function emailcheck(email){      
    var e = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return e.test(email);
}

function preventSelection(element){ // убраем выделение с элемента
  var preventSelection = false;
    
  function addHandler(element, event, handler){
    if (element.attachEvent) 
      element.attachEvent('on' + event, handler);
    else 
      if (element.addEventListener) 
        element.addEventListener(event, handler, false);
  }
  function removeSelection(){
    if (window.getSelection) { window.getSelection().removeAllRanges(); }
    else if (document.selection && document.selection.clear)
      document.selection.clear();
  }

  // не даем выделять текст мышкой
  addHandler(element, 'mousemove', function(){
    if(preventSelection)
      removeSelection();
  });
  addHandler(element, 'mousedown', function(event){
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
  });

  // борем dblclick
  // если вешать функцию не на событие dblclick, можно избежать
  // временное выделение текста в некоторых браузерах
  addHandler(element, 'mouseup', function(){
    if (preventSelection)
      removeSelection();
    preventSelection = false;
  });
}

function strip_tags(str){ // работает как strip_tags в PHP
    return str.replace(/<\/?[^>]+>/g, '');
}

function getcookie(name) { // полуает куки. Принимает имя куки
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function c(text){
    console.log(text);
}

function this_date(){
    var date = new Date();
    
    var min = date.getMinutes();
    if(min < 10){
        var min = '0'+min;
    }
    
    var sec = date.getSeconds();
    if(sec < 10){
        var sec = '0'+sec;
    }
    
    return date.getHours()+':'+ min+':'+sec; 
}

function if_num(num){
    return (num / 1) ? true : false;
}

function obj_count(obj) {
    var count = 0;
    for(var key in obj) count ++;
    return count;
}