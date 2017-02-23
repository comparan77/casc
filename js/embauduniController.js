var arrCondTran = [];
var Embauduni = function() {
    this.Init = init;

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
    }

    function init() {
        try {
                if(arrCondTran.length == 0) {
                    Common.loadAjax(true);
                    CatalogosModel.TransporteCondicionesGetLst(1, false, true, function(data) {
                        Common.loadAjax(false);
                        arrCondTran = data.PLstTransporte_condicion;
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