const temperature = document.getElementById('temperature').getContext('2d');
const humidity = document.getElementById('humidity').getContext('2d');
const pressure = document.getElementById('pressure').getContext('2d');

let temperatureChart = null;
let humidityChart = null;
let pressureChart = null;


function showData(room, from, to, showTemperature, showHumidity, showPressure) {
    fetch(`http://172.16.1.69/api/weather?room=${room}&from=${from}&to${to}`)
        .then(response => response.json())
        .then(json => {

            if (temperatureChart !== null)
                temperatureChart.destroy();
            if (humidityChart !== null)
                humidityChart.destroy();
            if (pressureChart !== null)
                pressureChart.destroy();

            labels = json.map(e => new Date(e.time).toDateString());

            if (showTemperature) {
                temperatureChart = new Chart(temperature, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Temperature',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: json.map(e => e.temperature)
                        }]
                    },
                    options: {}
                });
            }

            if (showHumidity) {
                humidityChart = new Chart(humidity, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Humidity',
                            backgroundColor: '#1E90FF',
                            borderColor: '#1E90FF',
                            data: json.map(e => e.humidity)
                        }]
                    },
                    options: {}
                });
            }

            if (showPressure) {
                pressureChart = new Chart(pressure, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Pressure',
                            backgroundColor: '#7CFC00',
                            borderColor: '#7CFC00',
                            data: json.map(e => e.pressure)
                        }]
                    },
                    options: {}
                });
            }
        });
}

function parseForm(event) {
    event.preventDefault();

    const room = document.getElementById('input-room').value;
    const from = document.getElementById('input-from').value;
    const to = document.getElementById('input-to').value;

    const showTemperature = document.getElementById('input-temperature').checked;
    const showHumidity = document.getElementById('input-humidity').checked;
    const showPressure = document.getElementById('input-pressure').checked;

    showData(room, from, to, showTemperature, showHumidity, showPressure);
}