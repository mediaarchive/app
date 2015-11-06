var pages = {}

pages.main_div = '#pages'; // контейнер для страниц
pages.all = '.page'; // селектор для выбора всех страниц
pages.changeto_events = {} // для событий по смене страницы
pages.default_page = 'events';



/**
 * Старт работы системы
*/
pages._start = function(){
    pages._url_init();
}


/**
 * Инициализирует слежение за URL страницы
*/
pages._url_init = function(){
    if (pages.get_hash() == '') {
        pages.change(pages.default_page);
    }
    else{
        var href = $(this).attr('href');
        var url = pages.url_parse(href);
        pages.change(url);
    }
    
     window.onhashchange = function(){
        var href = location.hash;
        var url = pages.url_parse(href);

        if (url != '' && pages.if_exist(url) ) {
            if (typeof pages.changeto_events[url] != 'undefined') {
                pages.changeto_events[url](url);    
            }
            pages.change(url);
        }
    }
}


/**
 * Изменяет хеш, переходит на новую страницу
*/
pages.change = function(id){
    $(pages.all).fadeOut(0);
    $(pages.all+'[data-page='+id+']').fadeIn(0);
    
    $('.header_menu').removeClass('active');
    $('[href=#'+id+']').closest('.header_menu').addClass('active');
    
    document.location.hash = id;
}


/**
 * Парсит URL
 *
 * @param {string} url Хеш из URL
*/
pages.url_parse = function(url){
    return pages.get_hash().replace('#', '');
}


/**
 * Достает хеш страницы
 *
 * @returns {string} хеш страницы
*/
pages.get_hash = function(){
    return document.location.hash;
}


/**
 * Проверяет страницу на существование
 *
 * @param {string} id ID страницы
 * @returns {boolean} Если страница существует - true, не существует - false
*/
pages.if_exist = function(id){
    if($(pages.all+'[data-page='+id+']').length == 1){
        return true;
    }
    else{
        return false;
    }
}


/**
 * Устанавливает событие по смене страницы
 *
 * @param {string} id ID страницы
 * @param {function} func Callback функция
*/
pages.changeto = function(id, func){ // событие по смене страницы
    pages.changeto_events[id] = func;
}

