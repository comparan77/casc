var arrLstAudMerFiles = [];

var Arraudmer = function() {
    this.Init = init;
    var indPhoto = 1;
    var oSearchData;

    function initControls() {
        chk_parcial_checked();
        Common.fillDropDownList(ddlVigilante, arrVigilantes);
        btn_capturePhoto_Click();
        oSearchData = new InputSearch({
            content: 'searchData',
            maskDataSearch: 'pedimento',
            txtPlaceHolder: 'No. de Pedimento',
            clickBtnSearch: clearFormValues,
            callbackBtnSearch: function(data) {
                fillForm(data);
            },
            functionModel: OperationModel.precargaGetByRef
        });
        btn_save_Click();
    }

    function photoReady(imageData) {
        var img = '<img class="pure-img" src="data:image/jpeg;base64,' + imageData + '" >';
        x$('#evidencias').html('top', '<div id="photo_' + indPhoto + '" class="pure-u-1-2"><div class="l-box">' + img + '</div></div>');
        var oImg = new BeanEntrada_aud_mer_files(imageData);
        arrLstAudMerFiles.push(oImg);
        indPhoto++;
    }

    function fillForm(data) {
        try {
            x$('#h_id_entrada_precarga').attr('value', data.Id);
            x$('#h_referencia').attr('value', data.Referencia);
        } catch (error) {
            
        }
    }

    function clearFormValues() {
        x$('#txt_referencia').attr('value', '');
        x$('#h_referencia').attr('value', '');
        x$('#h_id_entrada_precarga').attr('value', '');
    }

    function init() {
        try {
            if(arrTipoTransporte.length == 0) {
                    Common.loadAjax(true);
                    CatalogosModel.vigilanteGetLst(function(data) {
                        arrVigilantes = data;
                        Common.loadAjax(false);
                        initControls();
                    });
            }
            else {
                initControls();
            }
        } catch (error) {
            
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

    function chk_parcial_checked() {
        x$('#chk_parcial').on('click', function() {
            if(x$('#lbl_parcial').attr('title') == 'Entrada_Unica') {
                x$('#lbl_parcial').attr('title', 'Entrada_Parcial');
                x$('#lbl_parcial').html('Entrada Parcial');
                x$('#lbl_bulto_porrecibir').removeClass('hidden');
                x$('#lbl_bulto_faltante').addClass('hidden');
                
            } else {
                x$('#lbl_parcial').attr('title', 'Entrada_Unica');
                x$('#lbl_parcial').html('Entrada Única');
                x$('#lbl_bulto_porrecibir').addClass('hidden');
                x$('#lbl_bulto_faltante').removeClass('hidden');
                
            }
        });
    }

    function chk_ultima_checked() {
        x$('#chk_ultima').on('click', function() {
            
        });
    }

    /*function btn_search_Click() {
        x$('#btn_search').on('click', function() {
            Common.setEstatusBtn('btn_search', 'Buscando', true);
            clearFormValues();
            try {
                var referencia = String(x$('#txt_referencia').attr('value'));
                var nopedimento = /(\d{2})(\d{4})(\d{7})/;
                referencia = referencia.replace(nopedimento, "$1-$2-$3");
                referencia = '47-3061-7002660';
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
    }*/

    function btn_save_Click() {
        x$('#btn_save').on('click', function() {
             Common.setEstatusBtn('btn_save', 'Guardando', true);
            try {
                var optionVigilante = document.getElementById('ddl_vigilante');
                var oBEAM = new BeanEntrada_aud_mer(
                    x$('#h_id_dato').attr('value') * 1,
                    String(x$('#h_txt_dato').attr('value')),
                    String(x$('#txt_operador').attr('value')),
                    document.getElementById("chk_parcial").checked,
                    String(x$('#txt_bulto_declarado').attr('value')) * 1,
                    String(x$('#txt_bulto_recibido').attr('value')) * 1,
                    String(x$('#txt_bulto_abierto').attr('value')) * 1,
                    String(x$('#txt_bulto_danado').attr('value')) * 1,
                    String(x$('#txt_pallet').attr('value')) * 1,
                    document.getElementById("txt_relato").value,
                    optionVigilante.options[optionVigilante.selectedIndex].text,
                    arrLstAudMerFiles
                );
                OperationModel.entradaAudMerAdd(oBEAM, function(data) {
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