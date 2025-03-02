mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWRlaHRpYXJvdmEiLCJhIjoiY203cmdjYWZjMTBueTJpcXkyczB1bmxoMiJ9.2BrVVn1vTIOPEBLC9M1B6g';

const berlinBounds = [
    [13.0884, 52.3383], // Southwest
    [13.7612, 52.6755]  // Northeast
];

// ✅ Check if WebGL is available (Safari issue)
function isWebGLAvailable() {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
}

// ✅ If WebGL is missing, alert user
if (!isWebGLAvailable()) {
    alert("Your browser does not support WebGL, which is required for this map.");
}

// ✅ Load data with better error handling
async function loadData() {
    try {
        const response = await fetch('./data-vis/data.json', { cache: 'no-cache' }); // Prevents Safari caching issues
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.filter(station => station.DateTime && !isNaN(new Date(station.DateTime).getTime()));
    } catch (error) {
        console.error('🚨 Error loading data:', error);
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

    // ✅ Force WebGL 1 & fix Safari rendering
    const map2 = new mapboxgl.Map({
        container: 'map2',
        style: 'mapbox://styles/annadehtiarova/cm7ncczhz00yu01r347ah0gx9',
        center: [13.404954, 52.520008],
        zoom: 11,
        maxBounds: berlinBounds,
        attributionControl: false,
        failIfMajorPerformanceCaveat: true, // Forces WebGL initialization in Safari
        preserveDrawingBuffer: true, // Fixes Safari disappearing layers
        renderWorldCopies: false, // Prevents duplicate world copies
        webglVersion: 1  // Force WebGL 1 for Safari
    });

    map2.fitBounds(berlinBounds, { padding: 20 });

    map2.once('style.load', function () {
        console.log("✅ Mapbox style fully loaded");

        map2.addSource('stations', { type: 'geojson', data: geojsonData });

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

            if (map2.getSource('stations')) {
                map2.getSource('stations').setData({
                    type: 'FeatureCollection',
                    features: filteredData
                });
            }
        }

        // ✅ Fix hover issue in Safari
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

        updateMapData(dateSlider.value);
    });

    // ✅ Ensure map resizes properly in Safari
    function resizeMap() {
        setTimeout(() => {
            map2.resize();
        }, 500);
    }

    window.addEventListener("load", resizeMap);
    window.addEventListener("resize", resizeMap);
}

initMap();
