const coord = (p) => `${p.latitude},${p.longitude}`;
export function buildGoogleMapsUrl(origin, destination, waypoints = []) {
    const params = new URLSearchParams({ api: '1', origin: coord(origin), destination: coord(destination), travelmode: 'walking' });
    if (waypoints.length)
        params.set('waypoints', waypoints.map(coord).join('|'));
    return `https://www.google.com/maps/dir/?${params.toString()}`;
}
export function buildGoogleMapsEmbedUrl(origin, destination, waypoints = []) {
    const destinationPath = [...waypoints, destination].map(coord).join(' to:');
    const params = new URLSearchParams({ output: 'embed', saddr: coord(origin), daddr: destinationPath, dirflg: 'w' });
    return `https://www.google.com/maps?${params.toString()}`;
}
