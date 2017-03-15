var CAEController = function() {
    this.Create = create;

    function create(type){
        var obj;
        try {
            if (type === "login") {
                obj = new Login();
            } else if (type === "inicio") {
                obj = new Inicio();
            } else if (type === "arrauduni") {
                obj = new Arrauduni();
            } else if (type === "arraudmer") {
                obj = new Arraudmer();
            } else if (type == "embauduni") {
                obj = new Embauduni();
            } else if (type == "chart") {
                obj = new Chart();
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