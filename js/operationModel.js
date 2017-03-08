function OperationModel() {}

OperationModel.precargaGetByRef = function (referencia, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=entrada&opt=precargaGetByRef';
    //url += '&referencia=' + referencia;
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            },
            'POST',
            referencia
        );
    } catch (error) {
        alert('precargaGetByRef' + error);
    }
}

OperationModel.entradaAudUniAdd = function (objEntAudUni, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=entrada&opt=AudUniAdd';
    try {
        Common.fetchJSONFile (
            url,
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(objEntAudUni)
        );
    } catch (error) {
        alert('entradaAudUniAdd' + error);
    }
}