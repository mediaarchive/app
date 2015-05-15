function btn_selector_init() {
    $('.btn_selector .btn').click(function(){
        $(this).closest('.btn_selector').find('.btn').removeClass('active');
        $(this).addClass('active');
    });
}