var arrTipoTransporte = [];
var Arrauduni = function() {
    this.Init = init;
    var ddlTipoVehiculo = 'ddl_tipovehiculo';
    var divArrauduni = 'div_arrauduni';
    var indPhoto = 1;

    function evaluaDatosRequeridos(Id) {
        for(var i = 0; i < arrTipoTransporte.length; i++) {
            if(arrTipoTransporte[i].Id == Id) {
                x$('#txt_placa').attr('value', arrTipoTransporte[i].Requiere_placa ? '' : 'N.A.');
                x$('#txt_caja').attr('value', arrTipoTransporte[i].Requiere_caja ? '' : 'N.A.');
                x$('#txt_caja1').attr('value', arrTipoTransporte[i].Requiere_caja1 ? '' : 'N.A.');
                x$('#txt_caja2').attr('value', arrTipoTransporte[i].Requiere_caja2 ? '' : 'N.A.');
            }
        }
    }

    function findTransporteById(Id) {
        for(var i = 0; i < arrTipoTransporte.length; i++) {
            if(arrTipoTransporte[i].Id == Id) 
                return arrTipoTransporte[i].Nombre;
        }
    }

    function initControls() {
        Common.fillDropDownList(ddlTipoVehiculo, arrTipoTransporte);
        evaluaDatosRequeridos(arrTipoTransporte[0].Id);
        ddlTipoVehiculo_Change();
        checkCoincide_Change();
        btn_capturePhoto_Click();
        btn_save_Click();
        btn_search_Click();
    }

    function photoReady(imageData) {
        var img = '<img class="pure-img" src="data:image/jpeg;base64,' + imageData + '" >';
        x$('#evidencias').html('top', '<div id="photo_' + indPhoto + '" class="pure-u-1-2"><div class="l-box">' + img + '</div></div>');
        indPhoto++;
    }

    function fillForm(data) {
        x$('#txt_operador_db').attr('value', data.Operador).removeClass('hidden');
        x$('#txt_tipovehiculo_db').attr('value', findTransporteById(data.Id_transporte_tipo)).removeClass('hidden');
        document.getElementById('ddl_tipovehiculo').value = data.Id_transporte_tipo;
        x$('#ddl_tipovehiculo').fire('change');
        if(data.Placa!='N.A.')
            x$('#txt_placa').attr('placeholder', data.Placa);
        if(data.Caja!='N.A.')
            x$('#txt_caja').attr('placeholder', data.Caja);
        if(data.Caja1!='N.A.')
            x$('#txt_caja1').attr('placeholder', data.Caja1);
        if(data.Caja2!='N.A.')
            x$('#txt_Caja2').attr('placeholder', data.Caja2);
        x$('#txt_sello_db').attr('value', data.Sello).removeClass('hidden');
    }

    function clearFormValues() {
        x$('#txt_referencia').attr('value', '');
        x$('#txt_operador_db').attr('value', '').addClass('hidden');
        x$('#txt_operador').attr('value', '')
        x$('#txt_tipovehiculo_db').attr('value', '').addClass('hidden');
        x$('#txt_sello_db').attr('value', '').addClass('hidden');
    }

    function init() {
        try {
                if(arrTipoTransporte.length == 0) {
                    Common.loadAjax(true);
                    CatalogosModel.TipoTransporteGetLst(function(data) {
                        Common.loadAjax(false);
                        arrTipoTransporte = data;
                        initControls();
                    });
                }
                else {
                    initControls();
                }
        } catch (error) {
            alert(error);
        }
    }

    function checkCoincide_Change() {
        x$('.coincide_dato').each(function(element, index, xui) {
            x$(element).on('click', function() {
                var id= String(x$(this).attr('id')).split('_')[1];
                if(x$('#lbl_' + id).attr('title') == 'No Coincide') {
                    x$('#lbl_' + id).attr('title', 'Coincide');
                    x$('#lbl_' + id).html('Coincide');
                    x$('#pnl_' + id).addClass('hidden');
                }
                else {
                    x$('#lbl_' + id).attr('title', 'No Coincide');
                    x$('#lbl_' + id).html('No Coincide');
                    x$('#pnl_' + id).removeClass('hidden');
                }
            });
        });
    }

    function ddlTipoVehiculo_Change() {
        x$('#' + ddlTipoVehiculo).on('change', function() {
            evaluaDatosRequeridos(this.value);
        });
    }

    function btn_capturePhoto_Click() {
        x$('#btn_capturePhoto').on('click', function() {
            try {
                Common.capturePhoto(photoReady);  
            } catch (error) {
                alert(error);
            }
        });
    }

    function btn_search_Click() {
        x$('#btn_search').on('click', function() {
            Common.loadAjax(true);
            clearFormValues();
            try {
                var referencia = String(x$('#txt_referencia').attr('value'));
                var nopedimento = /(\d{2})(\d{4})(\d{7})/;
                referencia = referencia.replace(nopedimento, "$1-$2-$3");
                referencia = '47-3061-7002226';
                OperationModel.precargaGetByRef(referencia, function(data) {
                    Common.loadAjax(false);
                    if(typeof(data)!='object') {
                        Common.notificationAlert(data, 'Alerta', 'Ok')
                    }
                    else {
                        fillForm(data);
                    }
                });
            } catch (error) {
                alert(error);
            }
        });
    }

    function btn_save_Click() {
        x$('#btn_save').on('click', function() {
            
        });
    }
}