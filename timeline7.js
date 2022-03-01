google.charts.load("current", { packages: ["timeline"] });
                        google.charts.setOnLoadCallback(drawChart);
                        
function drawChart() {
    var container = document.getElementById('example5.92');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['President', 'Franklin D. Roosevelt', '#292f2d', new Date(1933, 2, 4), new Date(1945, 3, 12)],
        ['President', 'Harry S. Truman', '#3a4245', new Date(1945, 3, 12), new Date(1953, 0, 20)],
        ['President', 'Dwight D. Eisenhower', '#3a4245',  new Date(1953, 0, 20), new Date(1961, 0, 20)],
        ['President', 'John F. Kennedy', '#d9961a', new Date(1961, 0, 20), new Date(1963, 10, 22)],
        ['President', 'Lyndon B. Johnson', '#d9961a', new Date(1963, 10, 22), new Date(1969, 0, 20)],
       
    
    ]);

    var options = {
        timeline: { showRowLabels: false }
    };

    chart.draw(dataTable, options);
    
}