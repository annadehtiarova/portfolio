 google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var container = document.getElementById('example5.5');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'George Washington', '#3a4245', new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ['President', 'John Adams', '#637075', new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ['President', 'Thomas Jefferson', '#3a4245', new Date(1801, 2, 4), new Date(1809, 2, 4)],
        ['President', 'James Madison', '#3a4245', new Date(1809, 2, 4), new Date(1817, 2, 4)],
        ['President', 'James Monroe', '#3a4245', new Date(1817, 2, 4), new Date(1825, 2, 4)],
    
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}




                    