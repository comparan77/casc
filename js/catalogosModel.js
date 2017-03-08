var BeanUsuario = function(email, contrasenia) {
    this.Id = 0;
    this.Nombre = '';
    this.Clave = '';
    this.Email = email;
    this.Contrasenia = contrasenia;
    this.Id_bodega = 0;
    this.Id_rol = 0;
    this.IsActive = 0;
}

function CatalogosModel() {}
/**Usuarios */
CatalogosModel.UsuarioCredencialesValidas = function (obj, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=usuario&opt=CredencialesValidas';
    try {
        var opts = '';
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            }, 
            'POST',
            JSON.stringify(obj)
        );
    } catch (error) {
        alert(error);
    }
}

/**Transportes */
CatalogosModel.TipoTransporteGetLst = function (callback) {
    var url = urlHandler + 'handlers/catalog.ashx?catalogo=transporte_tipo';
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
    var url = urlHandler + 'handlers/Operation.ashx?op=transCond&opt=condCli';
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