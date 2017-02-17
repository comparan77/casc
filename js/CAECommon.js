function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

function loadTipoTransporte() {
    var url = 'http://cascserver.ddns.net:8083/handlers/catalog.ashx?catalogo=transporte_tipo';
    try {
        var opts = '';
        fetchJSONFile(url, function(data) {
            for(var x in data) {
                opts+= '<option>' + data[x].Nombre + '</option>';
            }
            x$('#ddlTipoVehiculo').html('inner',opts);
        });
        
    } catch (error) {
        alert(error);
    }
    
}