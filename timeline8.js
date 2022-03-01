google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.93');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Richard Nixon', '#d9961a', new Date(1969, 0, 20), new Date(1974, 7, 9)],
        ['President', 'Gerald Ford', '#d9961a', new Date(1974, 7, 9), new Date(1977, 0, 20)],
        ['President', 'Jimmy Carter', '#3a4245', new Date(1977, 0, 20), new Date(1981, 0, 20)],
        ['President', 'Ronald Reagan', '#292f2d', new Date(1981, 0, 20), new Date(1989, 0, 20)],
        ['President', 'George H. W. Bush', '#3a4245', new Date(1989, 0, 20), new Date(1993, 0, 20)],
       
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}