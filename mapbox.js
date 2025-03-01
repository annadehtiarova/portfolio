mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWRlaHRpYXJvdmEiLCJhIjoiY2t5b2YzNzBmMzRwcDMwcXB5Z2ViczJqcCJ9.vl48QtJdnAUJ4YHYsTkbJg';

const berlinBounds = [
    [13.0884, 52.3383], // Southwest corner
    [13.7612, 52.6755]  // Northeast corner
];

const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/annadehtiarova/cm7ncczhz00yu01r347ah0gx9',
    center: [13.404954, 52.520008],
    zoom: 11,
    maxBounds: berlinBounds
});

map2.fitBounds(berlinBounds, { padding: 20 });

// 🛠 Format Date Helper (Fixing 1970 Issue)
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
        ? "Invalid Date" 
        : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + 
          " " + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
};

fetch('./data-vis/data.json')
    .then(response => response.json())
    .then(data => {
        // 🛠 Filtering out bad dates to prevent "01 January 1970"
        const validData = data.filter(station => station.DateTime && !isNaN(new Date(station.DateTime).getTime()));

        const uniqueDates = [...new Set(validData.map(station => new Date(station.DateTime).toISOString()))].sort();
        const startDateIndex = uniqueDates.findIndex(date => date.startsWith('2024-02-11'));

        const geojsonData = {
            type: 'FeatureCollection',
            features: validData.map(station => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [station.Longitude, station.Latitude] },
                properties: {
                    stationCode: station.Station_Code,
                    stationAddress: station.Station_address,
                    installationDate: station.Installation_date,
                    dateTime: station.DateTime,
                    countValue: station.Count_Value
                }
            }))
        };

        map2.on('load', function () {
            // Update data source based on selected date from the slider
            function updateMapData(index) {
                const selectedDate = uniqueDates[index];
                const filteredData = geojsonData.features.filter(feature =>
                    new Date(feature.properties.dateTime).toDateString() === new Date(selectedDate).toDateString()
                );

                // Update the map with filtered data based on selected date
                map2.getSource('stations').setData({
                    type: 'FeatureCollection',
                    features: filteredData
                });
            }

            // Add the source and layer for the stations
            map2.addSource('stations', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
            map2.addLayer({
                id: 'stations-layer',
                type: 'circle',
                source: 'stations',
                paint: {
                    'circle-radius': ['interpolate', ['linear'], ['get', 'countValue'], 10, 5, 600, 20],
                    'circle-color': "#4DDE3A",
                    'circle-opacity': 0.5
                }
            });

            // Handle mouse interaction with the stations layer
            map2.on('mouseenter', 'stations-layer', function (e) {
                map2.getCanvas().style.cursor = 'pointer';
                const feature = e.features[0];
                const popup = new mapboxgl.Popup({ closeButton: false })
                    .setLngLat(feature.geometry.coordinates)
                    .setHTML(`
                        <span style="font-size: 14px; font-weight: 600;">${feature.properties.stationAddress}</span><br>
                        <span style="font-size: 14px; font-weight: 300;">Date: ${formatDate(feature.properties.dateTime)}</span><br>
                        <span style="font-size: 14px; font-weight: 300;">Count Value: ${feature.properties.countValue}</span>
                    `)
                    .addTo(map2);

                map2.on('mouseleave', 'stations-layer', () => {
                    popup.remove();
                    map2.getCanvas().style.cursor = '';
                });
            });

            // 🎛 UI Elements
            const dateSlider = document.getElementById('dateSlider');
            const dateDisplay = document.getElementById('dateDisplay');
    
            dateSlider.min = 0;
            dateSlider.max = uniqueDates.length - 1;
            dateSlider.value = startDateIndex >= 0 ? startDateIndex : 0;
            dateDisplay.textContent = formatDate(uniqueDates[dateSlider.value]);

            // Update map data whenever the slider value changes
            dateSlider.addEventListener('input', function () {
                updateMapData(this.value);
                dateDisplay.textContent = formatDate(uniqueDates[this.value]);
            });

            // Initialize the map with data corresponding to the slider's initial value
            updateMapData(dateSlider.value);
        });
    })
    .catch(error => console.error('Error loading data:', error));
