const envNumber = (_key, fallback) => fallback;
const point = (id, label, lat, lng) => ({ id, label, latitude: lat, longitude: lng });
export const journeys = [
    { id: 'vauxhall_to_office', label: 'Vauxhall → Office', context: 'work', startLocation: point('vauxhall_station', 'Vauxhall Station', 51.4862, -0.1229), destinationLocation: point('office', 'Office', envNumber('OFFICE_LAT', 51.5007), envNumber('OFFICE_LNG', -0.1246)), defaultMaxExtraWalkMinutes: 8, defaultMaxStops: 2 },
    { id: 'waterloo_to_office', label: 'Waterloo → Office', context: 'work', startLocation: point('waterloo_station', 'Waterloo Station', 51.5033, -0.1147), destinationLocation: point('office', 'Office', envNumber('OFFICE_LAT', 51.5007), envNumber('OFFICE_LNG', -0.1246)), defaultMaxExtraWalkMinutes: 8, defaultMaxStops: 2 },
    { id: 'surbiton_to_home', label: 'Surbiton → Home', context: 'home', startLocation: point('surbiton_station', 'Surbiton Station', 51.3925, -0.3039), destinationLocation: point('home', 'Home', envNumber('HOME_LAT', 51.3903), envNumber('HOME_LNG', -0.3070)), defaultMaxExtraWalkMinutes: 10, defaultMaxStops: 2 }
];
