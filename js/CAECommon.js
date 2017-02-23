function Common() {}

Common.fetchJSONFile = function (path, callback, type) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(type, path, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };

    httpRequest.send();
}


/**Devuelve el valor buscado de un json por ejemplo */
Common.getValueByKey = function (key, data) {
    var i, len = data.length;
    
    for (i = 0; i < len; i++) {
        if (data[i] && data[i].hasOwnProperty(key)) {
            return data[i][key];
        }
    }
    
    return -1;
}

Common.loadAjax = function(state) {
    state ? x$('#divLoading').removeClass('hidden') : x$('#divLoading').addClass('hidden');
}

Common.fillDropDownList = function (ddl, data) {
    var opts = '';
    x$('#' + ddl).html('');
    for(var x in data) {
        opts+= '<option value=' + data[x].Id + '>' + data[x].Nombre + '</option>';
    }
    x$('#' + ddl).html('inner',opts);
}