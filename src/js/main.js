jQuery(document).ready(function($) {
	// new Vivus('logo', {
	// 	type: 'async',
	// duration: 200,
	// }, logoCallback);
	$("#logo").hover(function() {
		$("#logo").velocity({ height: 100})
	}, function() {
		$("#logo").velocity("reverse");
	});
});

function logoCallback(obj) {
	obj.el.classList.add('finished');
}
