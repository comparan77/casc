/**Entrada Auditoria Mercancia */
var BeanEntrada_aud_mer = function (id_entrada_precarga, referencia, operador, entrada_unica, bulto_declarado, bulto_recibido, bulto_abierto, bulto_danado, pallet, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_entrada_pre_carga = id_entrada_precarga;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Notificado = operador;
    this.Entrada_unica = entrada_unica;
    this.No_entrada = 0;
    this.Bulto_declarado = bulto_declarado;
    this.Bulto_recibido = bulto_recibido;
    this.Bulto_abierto = bulto_abierto;
    this.Bulto_danado = bulto_danado;
    this.Pallet = pallet;
    this.Acta_informativa = acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante = vigilante;
    this.PLstEntAudMerFiles = lst_files;
}
//**Entrada Auditoria Mercancia Fotos */
var BeanEntrada_aud_mer_files = function(path) {
    this.Id = 0;
    this.Id_entrada_aud_mer = 0;
    this.Path = path;
}
//**Entrada Auditoria Unidades */
var BeanEntrada_aud_uni = function (id_entrada_precarga, id_transporte_tipo, referencia, operador, placa, caja, caja1, caja2, sello, sello_roto, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_entrada_pre_carga = id_entrada_precarga;
    this.Id_transporte_tipo = id_transporte_tipo;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Operador = operador;
    this.Placa = placa;
    this.Caja = caja;
    this.Caja1 = caja1;
    this.Caja2 = caja2;
    this.Sello = sello;
    this.Sello_roto = sello_roto;
    this.Acta_informativa = acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante = vigilante;
    this.PLstEntAudUniFiles = lst_files;
}
//**Entrada Auditoria Unidades Fotos */
var BeanEntrada_aud_uni_files = function(path) {
    this.Id = 0;
    this.Id_entrada_aud_uni = 0;
    this.Path = path;
}
/** @description Salida Auditoria Unidades 
 * @param  {number} id_salida_orden_carga
 * @param  {number} id_transporte_tipo
 * @param  {string} referencia
 * @param  {string} operador
 * @param  {string} placa
 * @param  {string} caja
 * @param  {string} caja1
 * @param  {string} caja2
 * @param  {string} sello
 * @param  {string} acta_informativa
 * @param  {string} vigilante
 * @param  {object} lst_files
 */
var BeanSalida_aud_uni = function (id_salida_orden_carga, id_transporte_tipo, referencia, operador, placa, caja, caja1, caja2, sello, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_salida_orden_carga = id_salida_orden_carga;
    this.Id_transporte_tipo = id_transporte_tipo;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Operador = operador;
    this.Placa = placa;
    this.Caja = caja;
    this.Caja1 = caja1;
    this.Caja2 = caja2;
    this.Sello = sello;
    this.Acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante;
    this.PLstSalAudUniFiles = lst_files;
}
/** @description Salida Auditoria Unidades Fotos
 * @param  {string} path
 */
var BeanSalida_aud_uni_files = function(id, path) {
    this.Id = id;
    this.Id_salida_aud_uni = 0;
    this.Path = path;
}