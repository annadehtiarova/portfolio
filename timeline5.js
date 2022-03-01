google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.9');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Grover Cleveland', '#637075', new Date(1885, 2, 4), new Date(1889, 2, 4)],
        ['President', 'Benjamin Harrison', '#637075', new Date(1889, 2, 4), new Date(1893, 2, 4)],
        ['President', 'Grover Cleveland', '#637075', new Date(1893, 2, 4), new Date(1897, 2, 4)],
        ['President', 'William McKinley ', '#637075', new Date(1897, 2, 4), new Date(1901, 8, 14)],
        ['President', 'Theodore Roosevelt', '#3a4245', new Date(1901, 8, 14), new Date(1909, 2, 4)],
       
    
    ]);

    var options = {
        colors: ['#cbb69d', '#603913', '#c69c6e'],
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}