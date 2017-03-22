;(function(){
    
    //Constructor
    this.InputSearch = function() {

        this.searchButton = null;
        this.searchDiv = null;
        this.searchTxtDato = null;
        this.searchHiddenIdDato = null;
        this.searchHiddenTxtDato = null;

        var defaults = {
            content: '',
            className: '',
            txtPlaceHolder: 'Referencia',
            functionModel: '',
            clickBtnSearch: '',
            callbackBtnSearch: '',
            typeDataSearch: ''
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        build.call(this);
    }

    //private methods
    function build() {
        var docFrag, content;
        content = document.getElementById(this.options.content);
        content.className = 'pure-form' + this.options.className;
        this.searchTxtDato = document.createElement('input');
        this.searchTxtDato.setAttribute('type', 'number')
        this.searchTxtDato.setAttribute('id', 'txt_dato');
        this.searchTxtDato.setAttribute('placeHolder', this.options.txtPlaceHolder);
        this.searchTxtDato.className = 'pure-input-rounded';
        content.appendChild(this.searchTxtDato);
        this.searchButton = document.createElement('button');
        this.searchButton.className = 'pure-button';
        this.searchButton.innerHTML = '<i class="sprite icon Search"></i>Buscar';
        content.appendChild(this.searchButton);
        this.searchHiddenIdDato = document.createElement('input');
        this.searchHiddenIdDato.setAttribute('type', 'hidden');
        this.searchHiddenIdDato.setAttribute('id', 'h_id_dato');
        content.appendChild(this.searchHiddenIdDato);
        this.searchHiddenTxtDato = document.createElement('input');
        this.searchHiddenTxtDato.setAttribute('type', 'hidden');
        this.searchHiddenTxtDato.setAttribute('id', 'h_txt_dato');
        content.appendChild(this.searchHiddenTxtDato);

        initializeEvents.call(this);
    }

    function initializeEvents() {
        var _ = this;
        _.searchButton.addEventListener('click', function() {
            if(_.options.clickBtnSearch) _.options.clickBtnSearch();
            Common.setEstatusBtn(_.searchButton, 'Buscando...', true);
            var dato =  maskDataSearch.call(_);
            //dato = '47-3061-7002660';
            try {
                _.options.functionModel(dato, function(data) {
                    if(typeof(data)!='object') {
                        Common.notificationAlert(data, 'Alerta', 'Ok')
                    }
                    else {
                        _.searchHiddenTxtDato.value = _.searchTxtDato.value;
                        _.searchHiddenIdDato.value = data.Id;
                        _.options.callbackBtnSearch(data);
                    }
                    Common.setEstatusBtn(_.searchButton, 'Buscar', false);
                });
            } catch (error) {
                alert(error);
            }
        });
    }

    function maskDataSearch() {
        var dato = this.searchTxtDato.value;
        switch (this.options.typeDataSearch) {
            case 'pedimento':
                var nopedimento = /(\d{2})(\d{4})(\d{7})/;
                dato = dato.replace(nopedimento, "$1-$2-$3");
                break;
            default:
                alert('the dta type not exists...')
                break;
        }
        return dato;
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
        }
    return source;
    }

}());