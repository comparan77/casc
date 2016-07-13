var Menu = function() {
	this.Init = init;
	
	function init(){
		x$('#lnkMenu').click(function() { 
			document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
		}); 
		
		var opts = x$('li').has('.optMenu');
		for (var index = 0; index < opts.length; index++) {
			var element = opts[index];
			x$(element).find('a').click(function(){
				clearActive();
				x$(this).addClass('active');
				x$('#lnkNav').html('OPT: ' + x$(this).html());
				document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
			});
		}	
	}

	function clearActive() {
		var opts = x$('li').has('.optMenu');
		for (var index = 0; index < opts.length; index++) {
			var element = opts[index];
			x$(element).find('a').removeClass('active');
		}
		x$('#lnkNav').html('');
	}
}