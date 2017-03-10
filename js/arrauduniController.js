var BeanEntrada_aud_uni = function (id_entrada_precarga, id_transporte_tipo, referencia, operador, placa, caja, caja1, caja2, sello, sello_roto, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_entrada_pre_carga = id_entrada_precarga;
    this.Id_transporte_tipo = id_transporte_tipo;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Operador = operador;
    this.Placa = placa;
    this.Caja = caja;
    this.Caja1 = caja1;
    this.Caja2 = caja2;
    this.Sello = sello;
    this.Sello_roto = sello_roto;
    this.Acta_informativa = acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante = vigilante;
    this.PLstEntAudUniFiles = lst_files;
}

var BeanEntrada_aud_uni_files = function(path) {
    this.Id = 0;
    this.Id_entrada_aud_uni = 0;
    this.Path = path;
}

var arrTipoTransporte = [];
var arrLstAudUniFiles = [];
var arrVigilantes = [];

var Arrauduni = function() {
    this.Init = init;
    var ddlTipoVehiculo = 'ddl_tipovehiculo';
    var ddlVigilante = 'ddl_vigilante';
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
        btn_search_Click();
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
            x$('#h_id_entrada_precarga').attr('value', data.Id);
            x$('#h_referencia').attr('value', data.Referencia);
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
                    CatalogosModel.TipoTransporteGetLst(function(data) {
                        arrTipoTransporte = data;
                        requestCallback.requestComplete(true);
                    });
                    CatalogosModel.vigilanteGetLst(function(data) {
                        arrVigilantes = data;
                        requestCallback.requestComplete(true);
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

    function btn_search_Click() {
        x$('#btn_search').on('click', function() {
            Common.setEstatusBtn('btn_search', 'Buscando', true);
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
                    Common.setEstatusBtn('btn_search', 'Buscar', false);
                });
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
                    x$('#h_id_entrada_precarga').attr('value') * 1,
                    x$('#txt_tipovehiculo').attr('value') * 1,
                    String(x$('#h_referencia').attr('value')),
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
                    alert(data);
                    Common.setEstatusBtn('btn_save', 'Guardar', false);
                    window.open(urlHandler + 'rpt/entradas_aud/' + oBEAU.Referencia + '/casc028.pdf', '_system', 'location=yes');
                });
            } catch (error) {
                alert(error);
            }
        });
    }
}


var options = {
    title: 'titulo',
    documentView : {
        closeLabel : 'cerrar'
    },
    navigationView : {
        closeLabel : 'navegar'
    },
    email : {
        enabled : false
    },
    print : {
        enabled : true
    },
    openWith : {
        enabled : true
    },
    bookmarks : {
        enabled : false
    },
    search : {
        enabled : false
    },
    autoClose: {
        onPause : true
    }
}



