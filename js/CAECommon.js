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

/**Funciones para la camra */
Common.capturePhoto = function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 90,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true,
        targetWidth: 1000,
        targetHeight: 1000
    });
}

Common.getPhoto = function (source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 90,
        destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onSuccess(imageData) {
    document.getElementById("foto").style.backgroundImage="url('data:image/jpeg;base64,"+imageData+"')";
    document.getElementById("foto").style.backgroundSize="100% 100%";
    //document.getElementById("foto").style.backgroundRepeat="no-repeat";
    //document.getElementById("foto").style.backgroundSize="contain";
    //document.getElementById("foto").innerHTML=imageData;
    //x$('#' + element).attr('backgroundImage', "url(data:image/jpeg;base64," + imageData + ")");
    //x$('#' + element).attr('backgroundSize', '100% 100%');
}

function onPhotoURISuccess(imageURI) {
    document.getElementById("foto").style.backgroundImage="url('"+imageURI+"')";
    document.getElementById("foto").style.backgroundSize="100% 100%";
}

function onFail(message) {
    alert('Failed because: ' + message);
}