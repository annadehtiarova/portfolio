google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.94');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Bill Clinton', '#3a4245', new Date(1993, 0, 20), new Date(2001, 0, 20)],
        ['President', 'George W. Bush', '#3a4245', new Date(2001, 0, 20), new Date(2009, 0, 20)],
        ['President', 'Barack Obama', '#3a4245', new Date(2009, 0, 20), new Date(2017, 0, 17)],
        ['President', 'Donald Trump', '#637075', new Date(2017, 0, 17), new Date(2021, 0, 20)],
        ['President', 'Joe Biden', '#d9961a', new Date(2021, 0, 20), new Date()]
       
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}