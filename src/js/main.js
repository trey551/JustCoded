;
(function($) {

    $(document).ready(function() {
        openClose({
            btn: '#menu-opener',
            block: '.main-menu'
        });
    });

    $(window).load(function() {
        $('.main-slider').flexslider({
            animation: 'slide',
            controlNav: false,
            prevText: "",
            nextText: ""
        });
    });

    function openClose(opt) {
        var btn = $(opt.btn);
        var block = $(opt.block);
        var body = $('body');

        btn.on('click', function(e) {
            block.toggleClass("expanded");
            body.toggleClass("expanded");

	        body.on('click', function(e) {
	        	if($(e.target).closest(block).length == 0 && $(e.target).closest(btn).length == 0){
	    	        block.removeClass("expanded");
	    	        body.removeClass("expanded");
	    	    }
	        });
	        e.preventDefault();
        });

    }

})(jQuery);
