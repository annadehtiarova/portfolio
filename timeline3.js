google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.7');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Zachary Taylor', '#d9961a', new Date(1849, 2, 4), new Date(1850, 6, 9)],
        ['President', 'Milliard Fillmore', '#d9961a',  new Date(1850, 6, 10), new Date(1853, 2, 3)],
        ['President', 'Franklin Pierce', '#637075', new Date(1853, 2, 4), new Date(1857, 2, 4)],
        ['President', 'James Buchanan', '#637075', new Date(1857, 2, 4), new Date(1861, 2, 4)],
        ['President', 'Abraham Lincoln', '#637075', new Date(1861, 2, 4), new Date(1865, 3, 15)],
       
    
    ]);

    var options = {
        colors: ['#cbb69d', '#603913', '#c69c6e'],
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}