var arrCondiciones = [];
var Embauduni = function() {
    this.Init = init;

    function initControls() {
        for(var i = 0; i < arrCondiciones.length; i++) {
            alert(arrCondiciones[i].PTransCondCat.Nombre);
        }
    }

    function init() {
        try {
                if(arrCondiciones.length == 0) {
                    Common.loadAjax(true);
                    Common.fillCondUnidades(1, false, true, function(data) {
                        Common.loadAjax(false);
                        arrCondiciones = data.PLstTransporte_condicion;
                        initControls();
                    });
                }
                else {
                    initControls();
                }
        } catch (error) {
            alert('Embauduni:init: ' + error);
        }
    }
}