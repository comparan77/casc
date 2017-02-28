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
Common.capturePhoto = function(onSuccess) {
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

/*function onSuccess(imageData) {
    document.getElementById("foto").style.backgroundImage="url('data:image/jpeg;base64,"+imageData+"')";
    document.getElementById("foto").style.backgroundSize="100% 100%";
}*/

function onPhotoURISuccess(imageURI) {
    document.getElementById("foto").style.backgroundImage="url('"+imageURI+"')";
    document.getElementById("foto").style.backgroundSize="100% 100%";
}

function onFail(message) {
    alert('Failed because: ' + message);
}

/**Notificaciones */
Common.notificationAlert = function (msg, title, buttonName, alertDismissed) {
    navigator.notification.alert(
        msg,            // message
        alertDismissed, // callback
        title,          // title
        buttonName      // buttonName
    );
} 

Common.notificationConfirm = function (msg, title, buttonName, onConfirm) {
    navigator.notification.confirm(
        msg,                    // message
        onConfirm,              // callback return buttonindex function onConfirm(buttonindex)
        title,                  // title
        buttonName              // buttonName ['Reiniciar','Salir']
    );
} 

Common.notificationPrompt = function (msg, title, buttonName, defaultText, onPrompt) {
    navigator.notification.prompt(
        msg,            // message
        onPrompt,       // callback to invoke return buttonindex like notificationConfirm
        title,          // title
        buttonName,     // buttonLabels
        defaultText     // defaultText
    );
} 

Common.notificationBeep = function () {
    navigator.notification.beep(2);
}