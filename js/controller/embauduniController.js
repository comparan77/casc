var arrCondTran = [];
var Embauduni = function() {
    this.Init = init;
    var indPhoto = 1;
    var oSearchData;

    function fillCondicionesTransporte() {
        x$('#tbody_condiciones').html('');
        var tr;
        var td;
        var ind = 1;
        var categoria = "";
        var tbody = "";
        for (var itemCT in arrCondTran) {
            if (categoria != arrCondTran[itemCT].PTransCondCat.Nombre) {
                categoria = arrCondTran[itemCT].PTransCondCat.Nombre;
                tr = '<tr class="header_cat_cond"><td style="font-weight: bold;">'
                    + categoria
                    + '</td><td style="font-weight: bold;">Sí</td><td style="font-weight: bold;">No</td></tr>';
                tbody += tr;
            }
            tr = '<tr id="condTr_' + arrCondTran[itemCT].Id + '">';
            td = '<td>';
            td += arrCondTran[itemCT].Nombre;
            td += '</td>';
            tr += td;
            td = '<td><input name="name_' + arrCondTran[itemCT].Id + '" type="radio" value="1" /></td>';
            tr += td;
            td = '<td><input name="name_' + arrCondTran[itemCT].Id + '" type="radio" value="0" /></td>';
            tr += td;
            tbody += tr;
            ind++;
        }
        x$('#tbody_condiciones').html(tbody);
    }

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

    function initControls() {
        fillCondicionesTransporte();
        Common.fillDropDownList('ddl_tipovehiculo', arrTipoTransporte);
        evaluaDatosRequeridos(arrTipoTransporte[0].Id);
        oSearchData = new InputSearch({
            content: 'searchData',
            maskDataSearch: 'ordencarga',
            txtPlaceHolder: 'Orden de Carga',
            clickBtnSearch: clearFormValues,
            callbackBtnSearch: function(data) {
                fillForm(data);
            },
            functionModel: OperationModel.getOrdenCargaByFolio
        });
        Common.fillDropDownList(ddlVigilante, arrVigilantes);
        btn_capturePhoto_Click();
        ddlTipoVehiculo_Change();
        btn_save_Click();
    }

    function fillForm(data) {
        x$('#txt_fecha_carga_db').attr('value', data.PSalidaTrafico.Fecha_carga_solicitada.replace('T00:00:00',''));
        x$('#txt_hora_carga_db').attr('value', data.PSalidaTrafico.Hora_carga_solicitada);
        x$('#txt_fecha_cita_db').attr('value', data.PSalidaTrafico.Fecha_cita.replace('T00:00:00',''));
        x$('#txt_hora_cita_db').attr('value', data.PSalidaTrafico.Hora_cita);
        x$('#txt_linea_transporte_db').attr('value', data.PSalidaTrafico.Transporte);
        document.getElementById('ddl_tipovehiculo').value = data.PSalidaTrafico.Id_transporte_tipo_cita;
        x$('#ddl_tipovehiculo').fire('change');
    }

    function clearFormValues() {
        x$('#txt_fecha_carga_db').attr('value','');
        x$('#txt_hora_carga_db').attr('value','');
        x$('#txt_fecha_cita_db').attr('value','');
        x$('#txt_hora_cita_db').attr('value','');
        x$('#txt_linea_transporte_db').attr('value', '');
        x$('#txt_tipo_transporte_db').attr('value', '');
        arrLstAudUniFiles = [];
        x$('#evidencias').html('');
    }

    function confirmDeletePhoto(obj) {
        var searchTerm = obj.getAttribute('id').split('_')[1];
        index = -1;
        for(var i = 0, len = arrLstAudUniFiles.length; i < len; i++) {
            if (arrLstAudUniFiles[i].Id == searchTerm) {
                index = i;
                break;
            }
        }
        if ( index !== -1 ) {
            arrLstAudUniFiles.splice( index, 1 );
            var parent = document.getElementById('evidencias');
            var children = obj;
            parent.removeChild(obj);
        }

    }

    function photoReady(imageData) {
        var img = '<img class="pure-img" src="data:image/jpeg;base64,' + imageData + '" >';
        x$('#evidencias').html('top', '<div id="photo_' + indPhoto + '" class="pure-u-1-2"><div class="l-box">' + img + '</div></div>');
        x$('#photo_' + indPhoto).on('click', function(){
            confirmDeletePhoto(this);
        });
        var oImg = new BeanSalida_aud_uni_files(indPhoto, imageData);
        arrLstAudUniFiles.push(oImg);
        indPhoto++;
    }

    function init() {
        try {
                var requestCallback = new MyRequestsCompleted({
                    numRequest: 3,
                    singleCallback: function(){
                        Common.loadAjax(false);
                        initControls();
                    }
                });
                if(arrCondTran.length == 0 || arrVigilantes == 0 || arrTipoTransporte.length == 0) {
                    Common.loadAjax(true);
                    if(arrCondTran.length == 0) {
                        CatalogosModel.TransporteCondicionesGetLst(1, false, true, function(data) {
                            arrCondTran = data.PLstTransporte_condicion;
                            requestCallback.requestComplete(true);
                        });
                    }
                    else 
                        requestCallback.requestComplete(true);
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
            alert('Embauduni:init: ' + error);
        }
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

    function ddlTipoVehiculo_Change() {
        x$('#ddl_tipovehiculo').on('change', function() {
            var idTipoTransporte = this.value;
            evaluaDatosRequeridos(this.value);
            x$('#txt_tipovehiculo').attr('value', idTipoTransporte);
        });
    }

    function btn_save_Click() {
        x$('#btn_save').on('click', function() {
             Common.setEstatusBtn('btn_save', 'Guardando', true);
             try {
                var optionVigilante = document.getElementById('ddl_vigilante');
                var oBSAU = new BeanSalida_aud_uni(
                    x$('#h_id_dato').attr('value') * 1,
                    document.getElementById('ddl_tipovehiculo').value * 1,
                    String(x$('#h_txt_dato').attr('value')),
                    String(x$('#txt_operador').attr('value')),
                    String(x$('#txt_placa').attr('value')),
                    String(x$('#txt_caja').attr('value')),
                    String(x$('#txt_caja1').attr('value')),
                    String(x$('#txt_caja2').attr('value')),
                    String(x$('#txt_sello').attr('value')),
                    document.getElementById("txt_relato").value,
                    optionVigilante.options[optionVigilante.selectedIndex].text,
                    arrLstAudUniFiles
                );
                OperationModel.salidaAudUniAdd(oBSAU, function(data) {
                    if(typeof(data)=="object") {
                        Common.notificaRegExitoso();  
                        window.open(urlHandler + 'rpt/salidas_aud/' + data.Referencia + '/' + data.prefixImg + 'casc028.pdf?' + new Date().getTime(), '_system', 'location=yes');
                    }
                    else {
                        alert(data);
                    }
                    Common.setEstatusBtn('btn_save', 'Guardar', false);
                    clearFormValues();                    
                });
            } catch (error) {
                alert(error);
            }
        });
    }
}