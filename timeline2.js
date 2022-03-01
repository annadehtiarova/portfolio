google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.6');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'John Quincy Adams', '#637075', new Date(1825, 2, 4), new Date(1829, 2, 3)],
        ['President', 'Andrew Jackson', '#3a4245',  new Date(1829, 2, 4), new Date(1837, 2, 4)],
        ['President', 'Martin Van Buren', '#637075', new Date(1837, 2, 4), new Date(1841, 2, 4)],
        ['President', 'William Henry Harrison', '#d9961a', new Date(1841, 2, 4), new Date(1841, 3, 4)],
        ['President', 'John Tyler', '#637075', new Date(1841, 3, 6), new Date(1845, 2, 4)],
        ['President', 'James Knox Polk', '#637075', new Date(1845, 2, 4), new Date(1849, 2, 3)],
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}