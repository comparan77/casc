var arrCondTran = [];
var Embauduni = function() {
    this.Init = init;
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

    function initControls() {
        fillCondicionesTransporte();
        oSearchData = new InputSearch({
            content: 'searchData',
            typeDataSearch: 'ordencarga',
            txtPlaceHolder: 'Orden de Carga',
            // clickBtnSearch: clearFormValues,
            // callbackBtnSearch: function(data) {
            //     fillForm(data);
            // },
            // functionModel: OperationModel.precargaGetByRef
        });
        Common.fillDropDownList(ddlVigilante, arrVigilantes);
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
                if(arrCondTran.length == 0 || arrVigilantes == 0) {
                    Common.loadAjax(true);
                    if(arrCondTran.length == 0) {
                        CatalogosModel.TransporteCondicionesGetLst(1, false, true, function(data) {
                            arrCondTran = data.PLstTransporte_condicion;
                            requestCallback.requestComplete(true);
                        });
                    }
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
}