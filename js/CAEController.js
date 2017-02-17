var CAEController = function() {
    this.Create = create;

    function create(type){
        var obj;
        try {
            if (type === "inicio") {
                obj = new Inicio();
            } else if (type === "arrauduni") {
                obj = new Arrauduni();
            }
            x$('#div_' + type).xhr('./' + type + '.html', {
                async: true,
                callback: function() { 
                    x$('#div_' + type).html(this.responseText);
                    obj.Init();
                },
            });
        } catch (error) {
            alert(error);
        }
        
    }
}