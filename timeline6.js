google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.91');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'William Howard Taft', '#637075', new Date(1909, 2, 4), new Date(1913, 2, 4)],
        ['President', 'Woodrow Wilson', '#3a4245', new Date(1913, 2, 4), new Date(1921, 2, 4)],
        ['President', 'Warren G. Harding', '#d9961a', new Date(1921, 2, 4), new Date(1923, 7, 2)],
        ['President', 'Calvin Coolidge ', '#d9961a', new Date(1923, 7, 2), new Date(1929, 2, 4)],
        ['President', 'Herbert Hoover', '#637075', new Date(1929, 2, 4), new Date(1933, 2, 4)],
       
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}