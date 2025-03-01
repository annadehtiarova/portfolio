mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWRlaHRpYXJvdmEiLCJhIjoiY2t5b2YzNzBmMzRwcDMwcXB5Z2ViczJqcCJ9.vl48QtJdnAUJ4YHYsTkbJg';

    const berlinBounds = [
        [13.0884, 52.3383], // Southwest
        [13.7612, 52.6755]  // Northeast
    ];

    async function loadData() {
        console.time("Data Load Time");
        try {
            const response = await fetch('./data-vis/data.json');
            const data = await response.json();
            console.timeEnd("Data Load Time");

            return data.filter(station => station.DateTime && !isNaN(new Date(station.DateTime).getTime()));
        } catch (error) {
            console.error('Error loading data:', error);
            return [];
        }
    }

    async function initMap() {
        const validData = await loadData();
        if (validData.length === 0) return;

        const uniqueDates = [...new Set(validData.map(s => new Date(s.DateTime).toISOString()))].sort();
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

        const map2 = new mapboxgl.Map({
            container: 'map2',
            style: 'mapbox://styles/annadehtiarova/cm7ncczhz00yu01r347ah0gx9',
            center: [13.404954, 52.520008],
            zoom: 11,
            maxBounds: berlinBounds
        });

        map2.fitBounds(berlinBounds, { padding: 20 });

        map2.on('load', function () {
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

            function updateMapData(index) {
                const selectedDate = uniqueDates[index];
                const filteredData = geojsonData.features.filter(feature =>
                    new Date(feature.properties.dateTime).toDateString() === new Date(selectedDate).toDateString()
                );

                map2.getSource('stations').setData({
                    type: 'FeatureCollection',
                    features: filteredData
                });
            }

            map2.on('mouseenter', 'stations-layer', function (e) {
                map2.getCanvas().style.cursor = 'pointer';
                const feature = e.features[0];
                const popup = new mapboxgl.Popup({ closeButton: false })
                    .setLngLat(feature.geometry.coordinates)
                    .setHTML(`
                        <span style="font-size: 14px; font-weight: 600;">${feature.properties.stationAddress}</span><br>
                        <span style="font-size: 14px; font-weight: 300;">Date: ${new Date(feature.properties.dateTime).toLocaleString()}</span><br>
                        <span style="font-size: 14px; font-weight: 300;">Count Value: ${feature.properties.countValue}</span>
                    `)
                    .addTo(map2);

                map2.on('mouseleave', 'stations-layer', () => {
                    popup.remove();
                    map2.getCanvas().style.cursor = '';
                });
            });

            const dateSlider = document.getElementById('dateSlider');
            const dateDisplay = document.getElementById('dateDisplay');

            dateSlider.min = 0;
            dateSlider.max = uniqueDates.length - 1;
            dateSlider.value = startDateIndex >= 0 ? startDateIndex : 0;
            dateDisplay.textContent = new Date(uniqueDates[dateSlider.value]).toLocaleDateString();

            dateSlider.addEventListener('input', function () {
                updateMapData(this.value);
                dateDisplay.textContent = new Date(uniqueDates[this.value]).toLocaleString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit', hour12: false
                });
            });
            
            // Initialize date display
            dateDisplay.textContent = new Date(uniqueDates[dateSlider.value]).toLocaleString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric', 
                hour: '2-digit', minute: '2-digit', hour12: false
            });
            

            updateMapData(dateSlider.value);
        });
    }

    initMap();