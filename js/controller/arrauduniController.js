var arrTipoTransporte = [];
var arrVigilantes = [];
var arrLstAudUniFiles = [];
var ddlTipoVehiculo = 'ddl_tipovehiculo';
var ddlVigilante = 'ddl_vigilante';

var Arrauduni = function() {
    this.Init = init;
    var divArrauduni = 'div_arrauduni';
    var indPhoto = 1;
    var oSearchData;

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

    function findTransporteByNombre(nombre) {
        for(var i = 0; i < arrTipoTransporte.length; i++) {
            if(arrTipoTransporte[i].Nombre == nombre) 
                return arrTipoTransporte[i].Id;
        }
    }

    function initControls() {
        Common.fillDropDownList(ddlTipoVehiculo, arrTipoTransporte);
        Common.fillDropDownList(ddlVigilante, arrVigilantes);
        evaluaDatosRequeridos(arrTipoTransporte[0].Id);
        ddlTipoVehiculo_Change();
        checkCoincide_Change();
        btn_capturePhoto_Click();
        btn_save_Click();
        oSearchData = new InputSearch({
            content: 'searchData',
            maskDataSearch: 'pedimento',
            clickBtnSearch: clearFormValues,
            callbackBtnSearch: function(data) {
                fillForm(data);
            },
            functionModel: OperationModel.precargaGetByRef
        });
        //btn_search_Click();
    }

    function photoReady(imageData) {
        var img = '<img class="pure-img" src="data:image/jpeg;base64,' + imageData + '" >';
        x$('#evidencias').html('top', '<div id="photo_' + indPhoto + '" class="pure-u-1-2"><div class="l-box">' + img + '</div></div>');
        var oImg = new BeanEntrada_aud_uni_files(imageData);
        arrLstAudUniFiles.push(oImg);
        indPhoto++;
    }

    function fillForm(data) {
        try {
            // x$('#h_id_entrada_precarga').attr('value', data.Id);
            // x$('#h_referencia').attr('value', data.Referencia);
            x$('#txt_operador_db').attr('value', data.Operador).removeClass('hidden');
            x$('#txt_tipovehiculo_db').attr('value', findTransporteById(data.Id_transporte_tipo)).removeClass('hidden');
            document.getElementById(ddlTipoVehiculo).value = data.Id_transporte_tipo;
            x$('#' + ddlTipoVehiculo).fire('change');
            if(data.Placa!='N.A.')
                x$('#txt_placa_db').attr('value', data.Placa);
            if(data.Caja!='N.A.')
                x$('#txt_caja_db').attr('value', data.Caja);
            if(data.Caja1!='N.A.')
                x$('#txt_caja1_db').attr('value', data.Caja1);
            if(data.Caja2!='N.A.') 
                x$('#txt_caja2_db').attr('value', data.Caja2);
            x$('#txt_sello_db').attr('value', data.Sello).removeClass('hidden');
        } catch (error) {
            alert(error);
        }
    }

    function clearFormValues() {
        x$('#txt_referencia').attr('value', '');
        x$('#h_referencia').attr('value', '');
        x$('#h_id_entrada_precarga').attr('value', '');
        x$('#txt_operador_db').attr('value', '').addClass('hidden');
        x$('#txt_operador').attr('value', '')
        x$('#txt_tipovehiculo_db').attr('value', '').addClass('hidden');
        x$('#txt_placa_db').attr('value', 'N.A.');
        x$('#txt_caja_db').attr('value', 'N.A.');
        x$('#txt_caja1_db').attr('value', 'N.A.');
        x$('#txt_caja2_db').attr('value', 'N.A.');
        x$('#txt_sello_db').attr('value', '');
        document.getElementById("chk_sello_roto").checked = false;
        document.getElementById("txt_relato").value = '';
        x$('#evidencias').html('');
        arrLstAudUniFiles = [];
        x$('.coincide_dato').each(function(element, index, xui) { 
            if(document.getElementById(x$(element).attr('id')).checked) {
                document.getElementById(x$(element).attr('id')).checked = false;
                x$(element).fire('click');
            }
        });
    }

    function init() {
        try {
                var requestCallback = new MyRequestsCompleted({
                    numRequest: 2,
                    singleCallback: function(){
                        Common.loadAjax(false);
                        initControls();
                    }
                });
                
                if(arrTipoTransporte.length == 0 || arrVigilantes == 0) {
                    Common.loadAjax(true);
                    if(arrTipoTransporte.length == 0)
                        CatalogosModel.TipoTransporteGetLst(function(data) {
                            arrTipoTransporte = data;
                            requestCallback.requestComplete(true);
                        });
                    else 
                        requestCallback.requestComplete(true);
                    if(arrVigilantes.length == 0)
                        CatalogosModel.vigilanteGetLst(function(data) {
                            arrVigilantes = data;
                            requestCallback.requestComplete(true);
                        });
                    else
                        requestCallback.requestComplete(true);
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
                    switch (id) {
                        case 'datosvehiculo':
                            x$('.datoVehiculo').each(function(element, index, xui) {
                                x$(element).addClass('hidden');
                                var idElement = x$(element).attr('id');
                                x$('#' + idElement).attr('value', x$('#' + idElement + '_db').attr('value'));
                            });    
                            break;
                        case 'tipovehiculo':
                            x$('#pnl_' + id).addClass('hidden');
                            x$('#txt_' + id).attr('value', findTransporteByNombre(x$('#txt_' + id + '_db').attr('value')));
                            document.getElementById(ddlTipoVehiculo).value = x$('#txt_' + id).attr('value');
                            x$('#' + ddlTipoVehiculo).fire('change');
                            break;
                        default:
                            x$('#pnl_' + id).addClass('hidden');
                            x$('#txt_' + id).attr('value', x$('#txt_' + id + '_db').attr('value'));
                            break;
                    }
                }
                else {
                    x$('#lbl_' + id).attr('title', 'No Coincide');
                    x$('#lbl_' + id).html('No Coincide');
                    switch (id) {
                        case 'datosvehiculo':
                            x$('.datoVehiculo').each(function(element, index, xui) {
                                x$(element).removeClass('hidden');
                                x$('#' + ddlTipoVehiculo).fire('change');
                            });
                            break;
                        case 'tipovehiculo':
                            x$('#pnl_' + id).removeClass('hidden');
                            x$('#txt_' + id).attr('value', document.getElementById(ddlTipoVehiculo).value);
                            break;
                        default:
                            x$('#pnl_' + id).removeClass('hidden');
                            x$('#txt_' + id).attr('value', '');
                            break;
                    }
                }
            });
        });
    }

    function ddlTipoVehiculo_Change() {
        x$('#' + ddlTipoVehiculo).on('change', function() {
            var idTipoTransporte = this.value;
            evaluaDatosRequeridos(this.value);
            x$('#txt_tipovehiculo').attr('value', idTipoTransporte);
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

    function btn_save_Click() {
        x$('#btn_save').on('click', function() {
             Common.setEstatusBtn('btn_save', 'Guardando', true);
            try {
                var optionVigilante = document.getElementById('ddl_vigilante');
                var oBEAU = new BeanEntrada_aud_uni(
                    x$('#h_id_dato').attr('value') * 1,
                    x$('#txt_tipovehiculo').attr('value') * 1,
                    String(x$('#h_txt_dato').attr('value')),
                    String(x$('#txt_operador').attr('value')),
                    String(x$('#txt_placa').attr('value')),
                    String(x$('#txt_caja').attr('value')),
                    String(x$('#txt_caja1').attr('value')),
                    String(x$('#txt_caja2').attr('value')),
                    String(x$('#txt_sello').attr('value')),
                    document.getElementById("chk_sello_roto").checked,
                    document.getElementById("txt_relato").value,
                    optionVigilante.options[optionVigilante.selectedIndex].text,
                    arrLstAudUniFiles
                );
                OperationModel.entradaAudUniAdd(oBEAU, function(data) {
                    if(typeof(data)=="object") {
                        Common.notificaRegExitoso();                        
                        window.open(urlHandler + 'rpt/entradas_aud/' + data.Referencia + '/' + data.prefixImg + 'casc028.pdf?' + new Date().getTime(), '_system', 'location=yes');
                        clearFormValues(); 
                    }
                    else {
                        alert(data);
                    }
                    Common.setEstatusBtn('btn_save', 'Guardar', false);
                    
                });
            } catch (error) {
                alert(error);
            }
        });
    }
}