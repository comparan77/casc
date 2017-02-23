function CatalogosModel() {}

/**Transportes */
CatalogosModel.TipoTransporteGetLst = function (callback) {
    var url = 'http://cascserver.ddns.net:8083/handlers/catalog.ashx?catalogo=transporte_tipo';
    try {
        var opts = '';
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            }, 
            'GET');
    } catch (error) {
        alert(error);
    }
}

CatalogosModel.TransporteCondicionesGetLst = function(id_cliente, es_entrada, es_salida, callback) {
    var url = 'http://cascserver.ddns.net:8083/handlers/Operation.ashx?op=transCond&opt=condCli';
    url += '&id_cliente=' + id_cliente + '&es_entrada=' + es_entrada + '&es_salida=' + es_salida;
    try {
        var opts = '';
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            },
            'POST'
            );
    } catch (error) {
        alert('fillCondUnidades' + error);
    }
}