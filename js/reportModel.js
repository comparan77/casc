function ReportModel() {}

ReportModel.reporteGet = function (rptOptions, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=reporte';
    //url += '&referencia=' + referencia;
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(rptOptions)
        );
    } catch (error) {
        alert('reporteGet' + error);
    }
}