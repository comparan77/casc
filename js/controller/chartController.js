var arrClientes = [];
var BeanChartJs = function(title, opcion, anio, mes, id_cliente, id_bodega) {
    this.Title = title;
    this.Data = null;
    this.Opcion = opcion;
    this.Anio = anio;
    this.Mes = mes;
    this.Id_cliente = id_cliente;
    this.Id_bodega = id_bodega;
}

var Chart = function() {
    this.Init = init;

    function changeOptAnios(anioSeleccionado) {
        var anioMax = new Date().getFullYear();
        if(anioSeleccionado==undefined)
            anioSeleccionado = anioMax;
        x$('#spn_anio_anterior').html(anioSeleccionado-1);
        x$('#spn_anio_seleccionado').html(anioSeleccionado);
        x$('#spn_anio_siguiente').html(anioSeleccionado + 1 > anioMax ? '': anioSeleccionado + 1);
    }

    function initControls() {
        changeOptAnios();
        spn_anio_Click();
        ddl_mes_change();
        ddl_op_change();
        ddl_cliente_change();
        Common.fillDropDownList('ddl_cliente', arrClientes, 'Todos');
        initCallData();
    }

    function init() {
        try {
            if(arrClientes.length == 0) {
                    Common.loadAjax(true);
                    CatalogosModel.ClienteGetAll(function(data) {
                        arrClientes = data;
                        Common.loadAjax(false);
                        initControls();
                    });
            }
            else {
                initControls();
            }
        } catch (error) {
            alert(error);
        }

    }//End init function

    function initCallData() {

        var oChartJs = new BeanChartJs(
            'Unidades', 
            document.getElementById('ddl_op').value * 1, 
            x$('#spn_anio_seleccionado').html() * 1,
            document.getElementById('ddl_mes').value * 1, 
            document.getElementById('ddl_cliente').value * 1,
            0);
        
        ReportModel.reporteGet(oChartJs, function(data) {
            initHighChart(data);
        });
    }

    function initHighChart(data) {

var options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Transportes'
    },
    /*subtitle: {
        text: 'Source: WorldClimate.com'
    },*/
    xAxis: {
        categories: [
            /*'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'*/
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Cantidad'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{}/*{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

    }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

    }*/]
}
        for(var i in data.Data.labelX) {
            options.xAxis.categories.push(data.Data.labelX[i]);
        }
        options.series[0].data = data.Data.dataX;
        options.series[0].name = 'Tipos de Transporte';
        Highcharts.chart('container', options);

    }

    function spn_anio_Click() {
        x$('.optAnio').each(function(element, index, xui) { 
            x$(element).on('click', function() {
                var anioClick = x$(element).html() * 1;
                changeOptAnios(anioClick);
                initCallData();
            });
        });
    }

    function ddl_mes_change() {
        x$('#ddl_mes').on('change', function() {
            initCallData();
        });
    }

    function ddl_op_change() {
        x$('#ddl_op').on('change', function() {
            initCallData();
        });
    }

    function ddl_cliente_change() {
        x$('#ddl_cliente').on('change', function() {
            initCallData();
        });
    }

}