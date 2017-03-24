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

OperationModel.entradaAudMerAdd = function (objEntAudMer, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=entrada&opt=AudMerAdd';
    try {
        Common.fetchJSONFile (
            url,
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(objEntAudMer)
        );
    } catch (error) {
        alert('entradaAudMerAdd' + error);
    }
}

OperationModel.getOrdenCargaByFolio = function (referencia, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=salida&opt=getOrdenCargaByFolio';
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
        alert('getOrdenCargaByFolio' + error);
    }
}

OperationModel.salidaAudUniAdd = function (objSalAudUni, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=salida&opt=AudUniAdd';
    try {
        Common.fetchJSONFile (
            url,
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(objSalAudUni)
        );
    } catch (error) {
        alert('salidaAudUniAdd' + error);
    }
}