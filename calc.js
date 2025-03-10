function calculateCarbonFootprint() {
    // Get input values
    const electricityUsage = parseFloat(document.getElementById('electricity_usage').value);
    const devices = parseInt(document.getElementById('devices').value);
    const commuteDistance = parseFloat(document.getElementById('commute_distance').value);
    const transportMode = document.getElementById('transport_mode').value.toLowerCase();
    const cloudUsage = parseFloat(document.getElementById('cloud_usage').value);
    const paperUsage = parseFloat(document.getElementById('paper_usage').value);

    // Constants
    const electricityEmissionFactor = 0.4;  // kg CO₂ per kWh
    const laptopEmissionPerYear = 220;  // kg CO₂ per laptop per year
    const smartphoneEmissionPerYear = 55;  // kg CO₂ per smartphone per year
    const carEmissionPerKm = 0.2;  // kg CO₂ per km
    const publicTransportEmissionPerKm = 0.05;  // kg CO₂ per km
    const bikeEmissionPerKm = 0;  // No emissions for bike
    const cloudEmissionFactor = 0.5;  // kg CO₂ per hour of cloud usage
    const paperEmissionFactor = 0.02;  // kg CO₂ per kg of paper

    // Calculate electricity footprint
    const electricityFootprint = electricityUsage * electricityEmissionFactor;

    // Calculate device footprint
    const deviceFootprint = devices * (laptopEmissionPerYear / 12);  // Monthly estimate for laptops

    // Calculate transportation footprint
    let transportFootprint = 0;
    if (transportMode === 'car') {
        transportFootprint = commuteDistance * carEmissionPerKm * 2;  // round trip
    } else if (transportMode === 'public transport') {
        transportFootprint = commuteDistance * publicTransportEmissionPerKm * 2;  // round trip
    } else if (transportMode === 'bike') {
        transportFootprint = 0;
    } else {
        transportFootprint = commuteDistance * carEmissionPerKm * 2;  // Default to car if invalid
    }

    // Calculate cloud usage footprint
    const cloudFootprint = cloudUsage * cloudEmissionFactor;

    // Calculate paper usage footprint
    const paperFootprint = paperUsage * paperEmissionFactor;

    // Calculate total footprint
    const totalFootprint = (electricityFootprint + deviceFootprint + transportFootprint +
                            cloudFootprint + paperFootprint);

    // Display result
    document.getElementById('result').textContent = `Your monthly carbon footprint is ${totalFootprint.toFixed(2)} kg CO₂.`;
}