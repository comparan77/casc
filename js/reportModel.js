function ReportModel() {}

ReportModel.reporteGet = function (oChartJs, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=reporte&opt=' + oChartJs.Title;
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(oChartJs)
        );
    } catch (error) {
        alert('reporteGet' + error);
    }
}