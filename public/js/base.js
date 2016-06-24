function render(to_elem, template_elem, params) {
    if (params === undefined) 
        params = {};
    
    var template = Handlebars.compile($(template_elem).html());
    
    if (to_elem === false) 
        return template(params);
    else
        $(to_elem).html(template(params));
    
    return true;
}

function check_extension(filename, extensions_array){
    filename = filename.toLowerCase();
    
    for(var key in extensions_array){
        //console.log(filename.indexOf('.' + extensions_array[key]), filename, extensions_array[key]);
        if (filename.indexOf('.' + extensions_array[key]) !== -1) 
            return true;
    }
    return false;
}