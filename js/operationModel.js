function OperationModel() {}

OperationModel.precargaGetByRef = function (referencia, callback) {
    var url = 'http://cascserver.ddns.net:8083/handlers/CAEApp.ashx?op=entrada&opt=precargaGetByRef';
    url += '&referencia=' + referencia;
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            },
            'POST'
        );
    } catch (error) {
        alert('precargaGetByRef' + error);
    }
}