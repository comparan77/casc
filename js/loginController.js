var Login = function() {
    this.Init = init;

    function initControls() {
        btn_click();
    }

    function validaCredenciales(email, pass) {
        try {
            x$('#div_login').addClass('hidden');
            oIndexCtrl.InitMenu();    
        } catch (error) {
            alert(error);
        }
    }

	function init() {
		initControls();
	} 

    function btn_click() {
        x$('#access').on('click', function() {
            var passValue = x$("#txt_password").attr('value');
            var pass = SHA512(passValue);//llamada al archivo js 
            var email = x$("#txt_email").attr('value'); 
            validaCredenciales(email, pass);
        });
    }
}