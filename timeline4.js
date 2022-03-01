google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.8');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Andrew Johnson', '#637075', new Date(1865, 3, 15), new Date(1869, 2, 4)],
        ['President', 'Ulysses S. Grant', '#3a4245', new Date(1869, 2, 4), new Date(1877, 2, 4)],
        ['President', 'Rutherford B. Hayes', '#637075', new Date(1877, 2, 4), new Date(1881, 2, 3)],
        ['President', 'James A. Garfield', 'd9961a', new Date(1881, 2, 4), new Date(1881, 8, 19)],
        ['President', 'Chester Alan Arthur', '#637075', new Date(1881, 8, 20), new Date(1885, 2, 4)],
       
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}