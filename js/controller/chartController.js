var Chart = function() {
    this.Init = init;

    function changeOptAnios(anioSeleccionado) {
        var anioMax = new Date().getFullYear();
        if(anioSeleccionado==undefined)
            anioSeleccionado = anioMax;
        x$('#spn_anio_anterior').html(anioSeleccionado-1);
        x$('#spn_anio_seleccionado').html(anioSeleccionado);
        x$('#spn_anio_siguiente').html(anioSeleccionado + 1 > anioMax ? '': anioSeleccionado + 1);
    }



    function initControls() {
        
        changeOptAnios();
        spn_anio_Click();
        
        var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
    }

    function init() {
        try {
            initControls();            
        } catch (error) {
            alert(error);
        }
    }//End init function

    function spn_anio_Click() {
        x$('.optAnio').each(function(element, index, xui) { 
            x$(element).on('click', function() {
                var anioClick = x$(element).html() * 1;
                changeOptAnios(anioClick);
            });
        });
    }

}
    