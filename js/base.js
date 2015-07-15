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