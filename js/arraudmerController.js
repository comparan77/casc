var Arraudmer = function() {
    this.Init = init;

    function initControls() {
        chk_parcial_checked();
    }

    function init() {
        initControls();
    }

    function chk_parcial_checked() {
        x$('#chk_parcial').on('click', function() {
            if(x$('#lbl_parcial').attr('title') == 'Entrada_Unica') {
                x$('#lbl_parcial').attr('title', 'Entrada_Parcial');
                x$('#lbl_parcial').html('Entrada Parcial');
                x$('#lbl_bulto_porrecibir').removeClass('hidden');
            } else {
                x$('#lbl_parcial').attr('title', 'Entrada_Unica');
                x$('#lbl_parcial').html('Entrada Única');
                x$('#lbl_bulto_porrecibir').addClass('hidden');
            }
        });
    }
}