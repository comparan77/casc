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
    }

    function fillData(oChartJs, data_id, drilldownConfig) {
        try {
            Common.loadAjax(true);
            ReportModel.reporteGet(oChartJs, function(data) {
                Common.loadAjax(false);
                var drilldownDataStructure = [];
                drilldownDataStructure[data_id] = {
                    "data": data.Data.dataX,
                    "scale-labels": data.Data.labelX,
                    //"title": data.Title,
                    //"colors":["#EF5350","#E53935","#C62828"]
                };
                drilldownConfig['title']['text'] = drilldownDataStructure[data_id]['title'];
                drilldownConfig['scale-x']['values'] = drilldownDataStructure[data_id]['scale-labels'];
                drilldownConfig['series'][0]['values'] = drilldownDataStructure[data_id]['data'];
                //drilldownConfig['series'][0]['styles'] = drilldownDataStructure[data_id]['colors'];
                zingchart.exec('chart_div', 'destroy');
                zingchart.render({
                    id : 'drilldown1', 
                    data : drilldownConfig, 
                    height: 450, 
                        width: '100%' 
                    });
            });
        } catch (error) {
            alert(error);
        }
    }


var nlJS = 0;

  function jsLoaded() {
     var jss = document.getElementsByTagName('script');
     for (var i = 0; i < js.length; i ++) {
         alert(jss[i]);
    }
  }

    function init() {



        initControls();
    var originalConfig = {
            "type":"ring",
            "title":{
            "text":""
            },
            "plot":{
                "detach":false,
                "cursor":"hande",
                "shadow":8,
                "tooltip":{
                    "visible":false
                },
                "animation":{
                    "delay":10,
                    "effect":"2",
                    "speed":"ANIMATION_FAST",
                    "method":"1",
                    "sequence":"3",
                    "attributes":{
                        
                    }
                },
                "value-box":{
                    "color":"#FFF",
                    "text":"%t",
                    "font-weight":"none",
                    "font-size":14
                }
            },
            "series":[
                {
                    "values":[69],
                    "background-color":"#F44336",
                    "text":"Transportes",
                    "data-id":"ru"
                },
                {
                    "values":[69],
                    "background-color":"#009688",
                    "text":"Pallets",
                    "data-id":"rt"
                },
                {
                    "values":[69],
                    "background-color":"#00BCD4",
                    "text":"Bultos",
                    "data-id":"rb"
                },
                {
                    "values":[69],
                    "background-color":"#03A9F4",
                    "text":"Piezas",
                    "data-id":"rp"
                }
            ]
        }
try {
    zingchart.render({
            id : 'chart_div', 
            data : originalConfig, 
            height: 450, 
            width: '100%' 
        });
} catch (error) {
    alert(error);
}
        

        var drilldownConfig = {
            "type":"bar",
            "title":{
                "text":"Security Tools"
            },
            "plotarea": {
                "margin":"dynamic"
            },
            "plot":{
                "value-box":{
 	            },
                "animation":{
                    "delay":10,
                    "effect":"4",
                    "speed":"1200",
                    "method":"1",
                    "sequence":"3"
                },
                "tooltip":{
                    "text": "Cantidad: %v",
                    "shadow":true,
                    "shadowAlpha":.5,
                    "shadowBlur":2,
                    "shadowDistance":3,
                    "shadowColor":"#c4c4c4",
                    "borderWidth":0,
                    "font-size":18
                }
            },
            "series":[
                {
                    "values":[35,15,25,10],
                    "styles":["#1565C0","#42A5F5","#1E88E5","#90CAF9"]
                }
            ],
            "scale-x":{
                "line-color":"#555",
                "tick":{
                    "line-color":"#555"
                },
                "values":["Firewall","Cache-control","Link-access","HTTP-Comp"],
                "item":{
                    "max-chars":9,
                    "color":"#555",
                    "font-size":12,
                    "angle": -30
                },
                "label":{
                    "text":"Tipo",
                    "color":"#555",
                    "font-weight":"none",
                    "font-size":16
                }
            },
            "scale-y":{
                "line-color":"#555",
                "tick":{
                    "line-color":"#555"
                },
                "item":{
                    "color":"#555",
                    "font-size":12
                },
                "guide":{
                    "visible":false
                },
                "label":{
                    "text":"Cantidad",
                    "color":"#555",
                    "font-weight":"none",
                    "font-size":16
                }
            },
            "shapes":[
            {
                'x':20,
                'y':20,
                'size':10,
                'angle':-90,
                'type':'triangle',
                'background-color':'#C4C4C4',
                'padding':5,
                'cursor':'hand',
                'id': 'backwards'
            }
            ]
        };

        var drilldownDataStructure = [];
        drilldownDataStructure["ru"] = {
            "data":[10,25,35],
            "scale-labels":["Grid-component","Map-tool","Web-charting"],
            "title":"Visualization Tools",
            "colors":["#EF5350","#E53935","#C62828"]
        };
        drilldownDataStructure["sp"] = {
            "data":[15,5,35,20],
            "scale-labels":["Speed-test","Error-tracking","Load-testing","User-monitoring"],
            "title":"Site Performance",
            "colors":["#26A69A","#80CBC4","#00695C","#00897B"]
        };
        drilldownDataStructure["dt"] = {
            "data":[20,8,35,20],
            "scale-labels":["IDE","File-Management","Image-Generation","QA-testing"],
            "title":"Dev Tools",
            "colors":['#26C6DA','#80DEEA','#00838F','#00ACC1']
        };
        drilldownDataStructure["st"] = {
            "data":[35,15,25,10],
            "scale-labels":["Firewall","Cache-control","Link-access","HTTP-Comp"],
            "title":"Security Tools",
            "colors":["#1565C0","#42A5F5","#1E88E5","#90CAF9"]
        };
        drilldownDataStructure["dm"] = {
            "data":[10,25,35],
            "scale-labels":["Relational","Non-relational","Cluster"],
            "title":"Data Management",
            "colors":["#5E35B1","#4527A0","#7E57C2"]
        };

        zingchart.node_click = function(p) {
        var plotIndex = p.plotindex;
        var scaleText = p.scaletext;
        try {
            var oChartJs = new BeanChartJs(
                'Unidades', 
                document.getElementById('ddl_op').value * 1, 
                x$('#spn_anio_seleccionado').html() * 1,
                document.getElementById('ddl_mes').value * 1, 
                document.getElementById('ddl_cliente').value * 1,
                0);
            fillData(oChartJs, p['data-id'], drilldownConfig);
        } catch (error) {
            alert(error);
        }

        // You could use this data to help construct drilldown graphs check it out...
        //console.log(p);
        /*if (drilldownDataStructure[p['data-id']]) {
            drilldownConfig['title']['text'] = drilldownDataStructure[p['data-id']]['title'];
            drilldownConfig['scale-x']['values'] = drilldownDataStructure[p['data-id']]['scale-labels'];
            drilldownConfig['series'][0]['values'] = drilldownDataStructure[p['data-id']]['data'];
            drilldownConfig['series'][0]['styles'] = drilldownDataStructure[p['data-id']]['colors'];
            zingchart.exec('chart_div', 'destroy');
            
            zingchart.render({
                id : 'drilldown1', 
                data : drilldownConfig, 
                height: 450, 
                    width: '100%' 
                });
            }*/
        }

        zingchart.shape_click = function(p) {
        var shapeId = p.shapeid;
        //console.log(p);
        
        switch(shapeId) {
            case 'forwards':
            case 'backwards':
            case 'default':
            zingchart.exec('drilldown1', 'destroy');
            zingchart.render({
                id : 'chart_div', 
                data : originalConfig, 
                height: 450, 
                width: '100%' 
                });
            break;
            }
        }

    }//End init function

    function spn_anio_Click() {
        x$('.optAnio').each(function(element, index, xui) { 
            x$(element).on('click', function() {
                var anioClick = x$(element).html() * 1;
                changeOptAnios(anioClick);
            });
        });
    }

}
    