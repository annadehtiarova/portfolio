mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWRlaHRpYXJvdmEiLCJhIjoiY2t5b2YzNzBmMzRwcDMwcXB5Z2ViczJqcCJ9.vl48QtJdnAUJ4YHYsTkbJg';

const berlinBounds = [
    [13.0884, 52.3383], // Southwest corner
    [13.7612, 52.6755]  // Northeast corner
];

// 🗺️ Initialize Mapbox
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

// 🔄 Fetch Data
fetch('./data-vis/data.json')
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Data is empty or invalid format!");
        }

        console.log("✅ Data Loaded Successfully", data);

        // 🛠 Filtering out bad dates to prevent "01 January 1970"
        const validData = data.filter(station => station.DateTime && !isNaN(new Date(station.DateTime).getTime()));

        // Extract unique dates & sort
        const uniqueDates = [...new Set(validData.map(station => new Date(station.DateTime).toISOString()))].sort();

        if (uniqueDates.length === 0) {
            throw new Error("No valid dates found in dataset!");
        }

        console.log("📅 Unique Dates:", uniqueDates);

        // Default date index (fallback to first date)
        const startDateIndex = uniqueDates.findIndex(date => date.startsWith('2024-02-11')) || 0;

        // Convert data to GeoJSON format
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

        console.log("🌍 GeoJSON Data Prepared", geojsonData);

        // 🌐 Mapbox: Ensure Map Style is Loaded Before Adding Data
        map2.once('styledata', function () {
            console.log("✅ Map style loaded, adding data...");

            // 🗺️ Add Source for Stations
            map2.addSource('stations', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

            // 🔴 Add Layer for Stations
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

            // 🖱️ Mouse Interaction (Popup)
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

            if (!dateSlider || !dateDisplay) {
                console.error("⚠️ Slider or Display element missing in DOM!");
                return;
            }

            // Set slider properties
            dateSlider.min = 0;
            dateSlider.max = uniqueDates.length - 1;
            dateSlider.value = startDateIndex;
            dateDisplay.textContent = formatDate(uniqueDates[startDateIndex]);

            // 🔄 Update Map Data Function
            function updateMapData(index) {
                const selectedDate = uniqueDates[index];
                console.log("📆 Selected Date:", selectedDate);

                const filteredData = geojsonData.features.filter(feature =>
                    new Date(feature.properties.dateTime).toDateString() === new Date(selectedDate).toDateString()
                );

                const source = map2.getSource('stations');
                if (source) {
                    source.setData({
                        type: 'FeatureCollection',
                        features: filteredData
                    });
                } else {
                    console.error("❌ Source 'stations' not found!");
                }

                dateDisplay.textContent = formatDate(selectedDate);
            }

            // 🔄 Update map when slider changes
            dateSlider.addEventListener('input', function () {
                updateMapData(this.value);
            });

            // Initialize map with first date's data
            updateMapData(dateSlider.value);
        });
    })
    .catch(error => console.error('❌ Error loading data:', error));
