const root = document.querySelector('#root');

if (!root) throw new Error('App root element was not found.');

const offices = [
  { id: 'swire-hk', business: 'Swire Group', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'John Swire & Sons (H.K.)', localName: '太古集團香港總部', address: '31/F, One Pacific Place, 88 Queensway, Hong Kong', localAddress: '香港金鐘道88號太古廣場一座31樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-properties-hk', business: 'Swire Properties', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Swire Properties', localName: '太古地產', address: '64/F, One Island East, Taikoo Place, 18 Westlands Road, Quarry Bay, Hong Kong', localAddress: '香港鰂魚涌華蘭路18號太古坊港島東中心64樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'swire-cocacola-hk', business: 'Swire Coca-Cola', city: 'Hong Kong', region: 'New Territories', country: 'Hong Kong', name: 'Swire Coca-Cola Hong Kong', localName: '太古可口可樂香港', address: '17–19 Yuen Shun Circuit, Siu Lek Yuen, Sha Tin, New Territories, Hong Kong', localAddress: '香港新界沙田小瀝源源順圍17至19號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swire.com/en/contact/all_offices.php?by=alphabetic&v=r-s' },
  { id: 'haeco-hk', business: 'HAECO', city: 'Hong Kong', region: 'Lantau / Airport', country: 'Hong Kong', name: 'HAECO Hong Kong', localName: '香港飛機工程有限公司', address: '80 South Perimeter Road, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場南環路80號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.haeco.com/en/about/haeco-group/haeco-hong-kong' },
  { id: 'swire-london', business: 'Swire Group', city: 'London', region: 'United Kingdom', country: 'United Kingdom', name: 'John Swire & Sons', localName: 'John Swire & Sons', address: 'Swire House, 59 Buckingham Gate, London SW1E 6AJ, United Kingdom', localAddress: 'Swire House, 59 Buckingham Gate, London SW1E 6AJ', timezone: 'Europe/London', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-beijing', business: 'Swire Group', city: 'Beijing', region: 'Chinese Mainland', country: 'China', name: 'John Swire & Sons (China)', localName: '太古（中国）有限公司', address: '2/F, ONE INDIGO, 20 Jiuxianqiao Road, Chaoyang District, Beijing 100016, China', localAddress: '中国北京市朝阳区酒仙桥路20号颐堤港一座2层', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-shanghai', business: 'Swire Group', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Swire Shanghai Management', localName: '太古（上海）管理有限公司', address: 'Unit 2706, HKRI Centre Tower 2, 288 Shimen 1st Road, Jing’an District, Shanghai 200041, China', localAddress: '中国上海市静安区石门一路288号兴业太古汇香港兴业中心二座2706室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swire.com/en/about/_fast-facts/fastfacts.pdf' },
  { id: 'swire-properties-guangzhou', business: 'Swire Properties', city: 'Guangzhou', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Hui Guangzhou', localName: '广州太古汇', address: 'Suite 1801, Taikoo Hui Tower 1, 385 Tianhe Road, Tianhe District, Guangzhou, China', localAddress: '中国广州市天河区天河路385号太古汇一座1801室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'swire-singapore', business: 'Swire Group', city: 'Singapore', region: 'Singapore', country: 'Singapore', name: 'John Swire & Sons (S.E. Asia)', localName: 'John Swire & Sons (S.E. Asia)', address: '300 Beach Road, The Concourse #12-06, Singapore 199555', localAddress: '300 Beach Road, The Concourse #12-06, Singapore 199555', timezone: 'Asia/Singapore', mode: 'transit', source: 'https://www.swire.com/en/about/_fast-facts/fastfacts.pdf' },
  { id: 'swire-bangkok', business: 'Swire Group', city: 'Bangkok', region: 'Thailand', country: 'Thailand', name: 'Swire Thailand Representative Office', localName: 'Swire Thailand Representative Office', address: 'Unit 3302, 33/F, One City Centre, 548 Phloen Chit Road, Pathum Wan, Bangkok 10330, Thailand', localAddress: 'One City Centre, 548 Phloen Chit Road, Bangkok 10330', timezone: 'Asia/Bangkok', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-hcmc', business: 'Swire Group', city: 'Ho Chi Minh City', region: 'Vietnam', country: 'Vietnam', name: 'Swire Vietnam Representative Office', localName: 'Swire Vietnam Representative Office', address: 'Suite 1407, Level 14, Tower 1, Saigon Centre, 65 Le Loi Boulevard, Ho Chi Minh City, Vietnam', localAddress: 'Saigon Centre, 65 Le Loi Boulevard, Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', mode: 'driving', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-miami', business: 'Swire Properties', city: 'Miami', region: 'United States', country: 'United States', name: 'Swire Properties USA', localName: 'Swire Properties USA', address: '98 SE 7th Street, Suite 500, Miami, FL 33131, United States', localAddress: '98 SE 7th Street, Suite 500, Miami, FL 33131', timezone: 'America/New_York', mode: 'driving', source: 'https://www.swireproperties.com/en/contact-us/' }
];

root.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Swire routes home"><span class="brand-mark">S</span><span>SWIRE <strong>ROUTES</strong></span></a>
    <span class="header-note">Executive journey planner</span>
  </header>
  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Plan with confidence</p>
        <h1>Your clearest route<br><em>to Swire.</em></h1>
        <p class="hero-text">From your door to the right office, with local routing and arrival advice built in.</p>
        <div class="network-stat"><strong>${offices.length}</strong><span>verified destinations<br>across the network</span></div>
      </div>
      <form class="planner" id="route-form">
        <div class="step-heading"><span>01</span><div><strong>Where are you starting?</strong><small>Enter an address or share your current location.</small></div></div>
        <label class="field-label" for="origin">Starting point</label>
        <div class="input-row">
          <input id="origin" name="origin" type="text" value="Tung Chung, Hong Kong" autocomplete="street-address" placeholder="Airport, hotel or address" required>
          <button class="locate-button" id="locate" type="button" aria-label="Use current location" title="Use current location"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path></svg></button>
        </div>
        <p class="field-status" id="location-status" aria-live="polite"></p>
        <div class="step-heading destination-heading"><span>02</span><div><strong>Choose your destination</strong><small>Official Swire office and operating-company locations.</small></div></div>
        <label class="field-label" for="destination">Swire location</label>
        <select id="destination" name="destination" required><option value="">Select an office</option></select>
        <button class="primary-button" type="submit">Build my route <span>→</span></button>
      </form>
    </section>
    <section class="results" id="results" hidden aria-live="polite">
      <div class="results-heading"><div><p class="eyebrow">Your journey</p><h2 id="route-title"></h2></div><div class="local-time"><span>Local time</span><strong id="local-time">—</strong></div></div>
      <div class="result-grid">
        <article class="route-card card">
          <div class="card-kicker">Recommended route</div>
          <div class="route-line"><span class="route-dot start"></span><div><small>START</small><strong id="route-origin"></strong></div></div>
          <div class="route-track"></div>
          <div class="route-line"><span class="route-dot finish"></span><div><small>DESTINATION</small><strong id="route-destination"></strong><p id="route-address"></p></div></div>
          <div class="route-advice" id="route-advice"></div><div class="map-actions" id="map-actions"></div>
        </article>
        <article class="context-card card"><div class="card-kicker">Local intelligence</div><div id="context-content"></div></article>
        <article class="brief-card card">
          <div class="card-kicker">Executive arrival card</div><div class="brief-language">SHOW YOUR DRIVER</div>
          <h3 id="brief-name"></h3><p class="local-name" id="brief-local-name"></p><p class="brief-address" id="brief-address"></p>
          <div class="brief-actions"><button class="secondary-button" id="copy-brief" type="button">Copy arrival card</button><a id="source-link" target="_blank" rel="noreferrer">Verify office ↗</a></div>
          <p class="copy-status" id="copy-status" aria-live="polite"></p>
        </article>
      </div>
    </section>
    <section class="directory"><div><p class="eyebrow">The network</p><h2>One directory.<br>Every journey.</h2></div><p>Locations are sourced from official Swire, Swire Properties, Swire Coca-Cola and HAECO pages. Always confirm meeting details with your host before departure.</p></section>
  </main>
  <footer><span>Swire Routes</span><span>Prototype · Office data checked September 2026</span></footer>
`;

const destinationSelect = document.querySelector('#destination');
const originInput = document.querySelector('#origin');
const routeForm = document.querySelector('#route-form');
const results = document.querySelector('#results');
let currentPosition = null;
let activeOffice = null;
let clockTimer = null;

[...new Set(offices.map((office) => office.region))].forEach((group) => {
  const optgroup = document.createElement('optgroup');
  optgroup.label = group;
  offices.filter((office) => office.region === group).forEach((office) => {
    const option = document.createElement('option');
    option.value = office.id;
    option.textContent = `${office.city} — ${office.name}`;
    optgroup.append(option);
  });
  destinationSelect.append(optgroup);
});

function originValue() { return currentPosition ? `${currentPosition.latitude},${currentPosition.longitude}` : originInput.value.trim(); }

function mapLinks(office) {
  const start = encodeURIComponent(originValue());
  const destination = encodeURIComponent(office.address);
  if (office.country === 'China') {
    const query = encodeURIComponent(`${office.localName} ${office.localAddress}`);
    return [
      { label: 'Open in Amap', href: `https://uri.amap.com/search?keyword=${query}&city=${encodeURIComponent(office.city)}&src=swire-routes&callnative=0`, primary: true },
      { label: 'Open in Baidu Maps', href: `https://map.baidu.com/search/${query}`, primary: false }
    ];
  }
  return [
    { label: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${destination}&travelmode=${office.mode}`, primary: true },
    { label: 'Apple Maps', href: `https://maps.apple.com/?saddr=${start}&daddr=${destination}&dirflg=${office.mode === 'driving' ? 'd' : 'r'}`, primary: false }
  ];
}

function getContext(office, origin) {
  const fromTungChung = /tung\s*chung|東涌/i.test(origin);
  const taxiSource = 'https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/taxi/details_of_taxi_operating_areas_/';
  if (office.id === 'haeco-hk' && fromTungChung) return `<div class="taxi-badge blue"><span></span>Blue Lantau taxi</div><h3>Take blue from Tung Chung</h3><p>Both Tung Chung and HAECO at Chek Lap Kok are inside the Lantau taxi operating area. A blue taxi is the most locally appropriate choice. Red urban taxis may also serve the airport area; green New Territories taxis are not the natural option for this trip.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Hong Kong Transport Department guidance ↗</a>`;
  if (office.id === 'haeco-hk') return `<div class="taxi-badge blue"><span></span>Lantau / airport journey</div><h3>Check your taxi colour</h3><p>Blue taxis operate on Lantau and Chek Lap Kok. Red taxis serve most of Hong Kong, including the airport. Green taxis serve specified New Territories areas and designated airport routes.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Official operating areas ↗</a>`;
  if (office.id === 'swire-cocacola-hk') return `<div class="taxi-badge green"><span></span>New Territories destination</div><h3>Red or green?</h3><p>A green taxi is suitable when your pickup is within its permitted New Territories area. From Hong Kong Island or Kowloon, take a red urban taxi directly to Siu Lek Yuen.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Official operating areas ↗</a>`;
  if (office.country === 'China') return `<div class="taxi-badge amber"><span></span>Mainland routing</div><h3>Use a local map provider</h3><p>Amap is recommended for live road and transit conditions in the Chinese Mainland, with Baidu Maps as an alternative. Copy the Chinese address below for your driver.</p>`;
  return `<div class="taxi-badge red"><span></span>Arrival ready</div><h3>Allow a meeting buffer</h3><p>Open the live route before departure and allow extra time for security, building reception and lift access. Confirm the precise entrance with your meeting host.</p>`;
}

function updateClock() {
  if (!activeOffice) return;
  document.querySelector('#local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: activeOffice.timezone, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(new Date());
}

function showRoute(office) {
  activeOffice = office;
  const origin = originInput.value.trim();
  document.querySelector('#route-title').textContent = `${office.city}, ${office.country}`;
  document.querySelector('#route-origin').textContent = origin;
  document.querySelector('#route-destination').textContent = office.name;
  document.querySelector('#route-address').textContent = office.address;
  document.querySelector('#route-advice').innerHTML = `<strong>${office.mode === 'driving' ? 'Road route suggested' : 'Public transport suggested'}</strong><span>Open your preferred provider for live time, traffic and service information.</span>`;
  document.querySelector('#map-actions').innerHTML = mapLinks(office).map((link) => `<a class="map-button ${link.primary ? 'primary' : ''}" href="${link.href}" target="_blank" rel="noreferrer">${link.label} <span>↗</span></a>`).join('');
  document.querySelector('#context-content').innerHTML = getContext(office, origin);
  document.querySelector('#brief-name').textContent = office.name;
  document.querySelector('#brief-local-name').textContent = office.localName;
  document.querySelector('#brief-address').textContent = office.localAddress;
  document.querySelector('#source-link').href = office.source;
  results.hidden = false;
  clearInterval(clockTimer);
  updateClock();
  clockTimer = setInterval(updateClock, 30000);
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

routeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const office = offices.find((item) => item.id === destinationSelect.value);
  if (office) showRoute(office);
});

originInput.addEventListener('input', () => { currentPosition = null; });
document.querySelector('#locate').addEventListener('click', () => {
  const status = document.querySelector('#location-status');
  if (!navigator.geolocation) { status.textContent = 'Location sharing is not supported by this browser.'; return; }
  status.textContent = 'Requesting your location…';
  navigator.geolocation.getCurrentPosition((position) => {
    currentPosition = position.coords;
    originInput.value = 'Current location';
    status.textContent = 'Location shared for this route only.';
  }, () => { status.textContent = 'Location was not shared. Enter your starting point instead.'; }, { enableHighAccuracy: true, timeout: 10000 });
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  if (!activeOffice) return;
  const text = `${activeOffice.name}\n${activeOffice.localName}\n${activeOffice.localAddress}`;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(text); status.textContent = 'Arrival card copied.'; }
  catch { status.textContent = 'Could not copy automatically. Select the address above.'; }
});
