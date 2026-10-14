const main = document.querySelector("main");
const euros = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const parse = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const pretty = (s) =>
  parse(s).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
let month = new Date(2027, 3, 1),
  start = "",
  end = "",
  guests = 2;
const nightly = 240,
  cleaning = 95;
const blocked = (s) => {
  const d = parse(s),
    n = d.getDate(),
    m = d.getMonth();
  return (
    (m === 3 && n >= 10 && n <= 16) ||
    (m === 4 && n >= 21 && n <= 27) ||
    (m === 5 && n >= 5 && n <= 11) ||
    (m === 6 && n >= 17 && n <= 24) ||
    (m === 7 && n >= 7 && n <= 21) ||
    (m === 8 && n >= 11 && n <= 17)
  );
};
function nights() {
  return start && end ? Math.round((parse(end) - parse(start)) / 86400000) : 0;
}
const home =
  () => `<section class="hero"><img src="assets/house.png" alt="Imagined honey-stone farmhouse, olive trees and a pool above the Umbrian hills" fetchpriority="high"><div class="hero-content"><div class="eyebrow">YOUR LITTLE CORNER OF UMBRIA</div><h1>A slower<br>kind of <em>Italy.</em></h1><p>Olive trees. Long lunches. A home in the hills.<br>Come for a week. Feel like you could stay forever.</p><a class="btn light" href="#stay">Find your Italian escape <span>↗</span></a></div><div class="hero-bottom"><span>43°22′ N &nbsp; 12°20′ E &nbsp; · &nbsp; Montone</span><span>Imagined property · Concept imagery</span></div></section>
<div class="ribbon"><span><b>⌂</b> A home, all to yourselves</span><span><b>♧</b> In the green heart of Italy</span><span><b>☼</b> Made for unhurried days</span><span><b>♡</b> A taste of local life</span></div>
<section class="section intro"><div><div class="eyebrow">BENVENUTI A CASA</div><h2>Some places invite you<br>to do a little <em>less.</em></h2></div><div><p>Above the olive groves, near the medieval village of Montone, our imagined Casa delle Olive is a place to settle into the Italian rhythm. Open the shutters. Put the coffee on. Let the day unfold.</p><p>Spend your mornings exploring cobbled streets, your afternoons with a book, and your evenings around a table that nobody is in a hurry to leave.</p><a class="text-link" href="#discover">Get to know our corner of Italy &nbsp; ↗</a></div></section>
<section class="section split" style="padding-top:10px"><div><button class="image-button" data-gallery="assets/interior.png"><img class="feature-image" src="assets/interior.png" alt="Imagined farmhouse kitchen with timber beams, linen and morning light" loading="lazy"><span>Take a closer look &nbsp; ↗</span></button><div class="image-label">An imagined interior, to set the mood.</div></div><div class="copy"><div class="eyebrow">THE HOUSE</div><h2>Old stone.<br>New memories.</h2><p>Cool stone floors under bare feet. Linen on the table. Sunlight finding its way through the shutters. A welcoming country home designed around the simple pleasure of being together.</p><div class="facts"><div><strong>6</strong><small>Sample guest capacity</small></div><div><strong>3</strong><small>Sample bedrooms</small></div><div><strong>1</strong><small>Imagined private pool</small></div></div><a class="text-link" href="#guide">Make yourself at home &nbsp; ↗</a><p class="small">These are illustrative house details. The real layout and amenities will be added by your host.</p></div></section>
<div class="tint"><section class="section"><div class="section-title"><div><div class="eyebrow">JUST BEYOND THE DOOR</div><h2>A little wander.<br>A lovely discovery.</h2></div><a class="text-link" href="#discover">Explore Umbria &nbsp; ↗</a></div><div class="editorial-grid"><article class="destination"><span class="number">01 / VILLAGE LIFE</span><h3>Get lost in Montone</h3><p>Stone archways, narrow lanes and a piazza made for watching the world go by. Start with a coffee. See where the streets take you.</p><a href="#discover" class="text-link">Meet the village &nbsp; ↗</a></article><article class="destination"><span class="number">02 / AT THE TABLE</span><h3>Follow your appetite</h3><p>Truffles, local olive oil and a glass of Umbrian wine. Shop for something seasonal, then turn lunch into the main event.</p><a href="#discover" class="text-link">Taste the region &nbsp; ↗</a></article><article class="destination"><span class="number">03 / FURTHER AFIELD</span><h3>Take the scenic route</h3><p>Gubbio's medieval streets, Perugia's art and the open skies of Lake Trasimeno. Leave room for a detour.</p><a href="#discover" class="text-link">Plan a day out &nbsp; ↗</a></article></div></section></div>
<section class="cta"><div><div class="eyebrow">YOUR UMBRIAN CHAPTER</div><h2>Leave a little space<br>for the <em>dolce vita.</em></h2><p>Find a week that feels like yours.</p></div><a class="btn light" href="#stay">Explore availability <span>↗</span></a></section>`;
const places = [
  {
    cat: "Villages & culture",
    title: "Montone",
    tag: "Start close to home",
    text: "Wander the medieval lanes, pause in Piazza Fortebraccio and seek out the church of San Francesco. The pleasure here is in the small details: stone arches, hillside views and a quiet coffee.",
    q: "Montone Umbria Italy",
  },
  {
    cat: "Villages & culture",
    title: "Gubbio",
    tag: "A day for medieval streets",
    text: "Explore the steep streets around Piazza Grande and the Palazzo dei Consoli. Wear comfortable shoes and allow plenty of time for a relaxed lunch.",
    q: "Gubbio Italy",
  },
  {
    cat: "Villages & culture",
    title: "Perugia",
    tag: "Art, architecture & a passeggiata",
    text: "Walk along Corso Vannucci, discover the historic centre and consider the Galleria Nazionale dell’Umbria. Check museum opening times before travelling.",
    q: "Perugia Italy",
  },
  {
    cat: "Nature & slow days",
    title: "Lake Trasimeno",
    tag: "Wide skies & waterside lunches",
    text: "Head towards the lake for lakeside walks and a change of pace. Castiglione del Lago makes a lovely starting point. Check seasonal boat services before planning an island visit.",
    q: "Castiglione del Lago Lake Trasimeno",
  },
  {
    cat: "Food & wine",
    title: "An Umbrian table",
    tag: "Seasonal, simple, delicious",
    text: "Look for local olive oil, truffles when in season, pecorino and handmade pasta. Ask what is fresh today. Restaurant recommendations and our favourite local shops will be added by the host.",
    q: "restaurants Montone Umbria",
  },
  {
    cat: "Food & wine",
    title: "Wine country",
    tag: "A longer day out",
    text: "Explore the wines around Montefalco and discover Sagrantino. Book tastings ahead and arrange a designated driver or transport for the return journey.",
    q: "Montefalco wine Umbria",
  },
  {
    cat: "Nature & slow days",
    title: "An olive-grove morning",
    tag: "Make room for doing very little",
    text: "Take a quiet countryside walk on marked public paths, then return for coffee and a long breakfast. Your host will add verified walking routes from the house.",
    q: "walking routes Montone Umbria",
  },
  {
    cat: "Villages & culture",
    title: "Città di Castello",
    tag: "A different side of Umbria",
    text: "Visit the historic centre and look into the Alberto Burri collections for a day of modern art. Check current exhibition hours and ticket arrangements before you go.",
    q: "Alberto Burri Citta di Castello",
  },
];
function destination(p) {
  return `<article class="destination"><span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.text}</p><a class="map-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q)}">Explore on Maps ↗</a></article>`;
}
const discover = () =>
  `<div class="pagehead"><div class="eyebrow">THE GREEN HEART OF ITALY</div><h1>Follow your curiosity.</h1><p>A guide to village mornings, generous tables and days that take the scenic route.</p></div><section class="discover-lead"><img src="assets/house.png" alt="Imagined countryside retreat among Umbrian hills"><div><div class="eyebrow">MONTONE, UMBRIA</div><h2>Small village.<br>A whole world.</h2><p>Montone is a medieval hilltop village in northern Umbria. Let it be your starting point for exploring the Upper Tiber Valley, nearby towns and the region's slower pleasures.</p><a class="text-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Montone+Umbria+Italy">Find Montone on the map ↗</a><p class="small">Check current opening hours and routes before setting out. Travel times from the house will follow once its exact location is confirmed.</p></div></section><section class="section tint" style="padding-top:45px"><div class="tabs" aria-label="Filter discoveries">${["All discoveries", "Villages & culture", "Food & wine", "Nature & slow days"].map((x, i) => `<button class="${i ? "" : "active"}" data-filter="${x}" aria-pressed="${i ? "false" : "true"}">${x}</button>`).join("")}</div><div id="places" class="editorial-grid">${places.map(destination).join("")}</div></section>`;
const detail = (title, text) =>
  `<details><summary>${title}</summary><p>${text}</p></details>`;
const guide = () =>
  `<div class="pagehead"><div class="eyebrow">MAKE YOURSELF AT HOME</div><h1>Your house companion.</h1><p>The small things that make a stay feel easy. House-specific instructions below are placeholders until your host provides the real details.</p><div class="notice">Draft guest guide · Arrival arrangements, Wi-Fi, appliance instructions and host contacts still need to be confirmed.</div></div><div class="guide-layout"><aside class="guide-aside" aria-label="Guide contents"><a href="#guide/arrival">01 · Arriving</a><a href="#guide/living">02 · Life in the house</a><a href="#guide/local">03 · Local essentials</a><a href="#guide/departure">04 · Leaving</a></aside><div><section class="guide-section" id="arrival"><h2>A lovely arrival</h2>${detail("Getting here & parking", "Montone is in northern Umbria. A car can make countryside exploring easier. The exact address, final approach, parking location and verified travel directions will be provided by your host. Do not use the concept imagery to locate the house.")}${detail("Check-in & keys", "Sample check-in: from 16:00. Your host will confirm the real arrival time, key collection method and any access instructions before your visit. No access codes are published here.")}${detail("Your first evening", "A simple first-night plan: settle in, pick up groceries and enjoy dinner at home. Your host will add the nearest shop, opening hours and any welcome provisions.")}</section><section class="guide-section" id="living"><h2>The rhythm of the house</h2>${detail("Wi-Fi & working from here", "Network name, password and connection details will be shared privately by your host. Internet speed and suitability for work have not yet been confirmed.")}${detail("Kitchen & laundry", "Appliance models and operating instructions will be added after the house details are supplied. Follow the instructions provided at the property; do not assume these concept descriptions match the equipment.")}${detail("Heating, cooling & hot water", "Your host will add thermostat locations, seasonal advice and hot-water instructions. Specific heating and cooling amenities are not yet confirmed.")}${detail("Pool & outdoor spaces", "The pool is part of the imagined property concept and is not a confirmed amenity. If the house has a pool, the host will provide opening dates, safety rules, operating information and child-supervision guidance.")}${detail("Rubbish & recycling", "Local collection arrangements, bin locations and the correct sorting instructions will be supplied by your host. Follow the labelled bins and confirmed collection schedule at the property.")}${detail("House etiquette", "Illustrative guidelines: be considerate of neighbours, keep noise down late at night and look after the furnishings. Pet, smoking, visitor and event policies are awaiting confirmation.")}</section><section class="guide-section" id="local"><h2>The useful little things</h2>${detail("Groceries, pharmacy & restaurants", "Explore Montone and nearby Umbertide for local services. Verified shop names, pharmacy details, recommended restaurants and current hours will be added by your host. Use the Discover Umbria page to start planning.")}${detail("Getting around", "Check restricted traffic zones (ZTL) and parking signs before driving into historic centres. Plan transport in advance for wine tastings and check seasonal schedules for public services.")}${detail("Help & emergencies", "For emergencies in Italy, call 112. The exact house address, host telephone number, local medical services and emergency meeting point must be added before this guide is used for a real stay.")}<div class="notice">Host contact and precise property address: awaiting details. This draft guide is not yet ready for arriving guests.</div></section><section class="guide-section" id="departure"><h2>Until next time</h2>${detail("Check-out checklist", "Sample check-out: by 10:00. Confirm the actual time with your host. Suggested checklist: check for belongings, follow the confirmed rubbish instructions, close windows and return keys as directed. The final departure instructions will be added here.")}</section></div></div>`;
const stay = () =>
  `<div class="pagehead"><div class="eyebrow">MAKE TIME FOR ITALY</div><h1>A week to call your own.</h1><p>Choose your arrival and departure dates. Your only other plan can be to slow down.</p><div class="notice">Sample availability · April–October 2027 · €240 per night + €95 cleaning · Minimum 3 nights. All dates, rates and policies are illustrative.</div></div><div class="booking-layout"><div class="panel"><div class="cal-head"><button id="prev" aria-label="Previous month">←</button><h3 id="month"></h3><button id="next" aria-label="Next month">→</button></div><div id="calendar" class="calendar"></div><div class="legend"><span><i></i>Available</span><span><i class="busy"></i>Unavailable</span><span><i class="selected"></i>Your dates</span></div><div id="date-status" class="status" aria-live="polite">Select an arrival date, then a departure date.</div><button class="text-link" id="reset" style="background:none;border:0;border-bottom:1px solid;padding:0">Clear dates</button></div><div class="panel"><div class="eyebrow">YOUR STAY AT CASA DELLE OLIVE</div><h3>Room to unwind.</h3><label for="guests">Guests · sample capacity 6</label><select id="guests">${[1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}" ${guests === n ? "selected" : ""}>${n} ${n === 1 ? "guest" : "guests"}</option>`).join("")}</select><div id="quote"></div><a class="btn full" id="continue" href="#payment">Continue to payment demo <span>↗</span></a><p class="small">This preview does not reserve dates. Real booking terms, taxes, security deposit and cancellation policy will be added later.</p></div></div>`;
function quote() {
  let n = nights();
  return `<div class="price-row"><span>Arrival</span><span>${start ? pretty(start) : "Choose a date"}</span></div><div class="price-row"><span>Departure</span><span>${end ? pretty(end) : "Choose a date"}</span></div><div class="price-row"><span>€240 × ${n || "—"} nights</span><span>${n ? euros(n * nightly) : "—"}</span></div><div class="price-row"><span>Sample cleaning fee</span><span>${euros(cleaning)}</span></div><div class="price-row total"><span>Sample total</span><strong>${n ? euros(n * nightly + cleaning) : "—"}</strong></div>`;
}
function draw() {
  document.querySelector("#month").textContent = month.toLocaleDateString(
    "en-GB",
    { month: "long", year: "numeric" },
  );
  const c = document.querySelector("#calendar");
  c.innerHTML = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    .map((x) => `<div class="weekday">${x}</div>`)
    .join("");
  let offset = (month.getDay() + 6) % 7;
  for (let i = 0; i < offset; i++)
    c.insertAdjacentHTML("beforeend", "<div></div>");
  for (
    let d = 1;
    d <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    d++
  ) {
    const s = iso(new Date(month.getFullYear(), month.getMonth(), d, 12)),
      busy = blocked(s),
      selected = s === start || s === end,
      range = start && end && s > start && s < end;
    c.insertAdjacentHTML(
      "beforeend",
      `<button class="day ${busy ? "busy" : ""} ${selected ? "selected" : ""} ${range ? "range" : ""}" data-date="${s}" ${busy ? "disabled" : ""} aria-label="${pretty(s)}, ${busy ? "unavailable" : selected ? "selected" : "available"}" aria-pressed="${selected}">${d}</button>`,
    );
  }
  document.querySelector("#prev").disabled = month.getMonth() === 3;
  document.querySelector("#next").disabled = month.getMonth() === 9;
  document.querySelector("#quote").innerHTML = quote();
  let link = document.querySelector("#continue");
  link.setAttribute("aria-disabled", String(nights() < 3));
  link.style.opacity = nights() < 3 ? ".45" : "1";
  c.querySelectorAll("[data-date]").forEach(
    (b) => (b.onclick = () => choose(b.dataset.date)),
  );
}
function choose(s) {
  const status = document.querySelector("#date-status");
  if (!start || end || s <= start) {
    start = s;
    end = "";
    status.textContent =
      "Arrival: " + pretty(s) + ". Now select your departure.";
  } else {
    let d = parse(start),
      conflict = false;
    while (iso(d) < s) {
      if (blocked(iso(d))) conflict = true;
      d.setDate(d.getDate() + 1);
    }
    if (conflict) {
      status.textContent =
        "This stay includes unavailable nights. Choose an earlier departure or a new arrival.";
      return;
    }
    if (Math.round((parse(s) - parse(start)) / 86400000) < 3) {
      status.textContent =
        "Please choose at least 3 nights for this sample stay.";
      return;
    }
    end = s;
    status.textContent = `${nights()} nights · ${pretty(start)} to ${pretty(end)}.`;
  }
  draw();
}
const payment = () =>
  `<div class="pagehead"><div class="eyebrow">YOUR ITALIAN ESCAPE</div><h1>One step closer.</h1><p>Review your stay and explore the sample checkout.</p><div class="notice">Payment demo · No money is charged, no card details are collected and no reservation is created. Live payments require your host's payment provider and confirmed booking terms.</div></div><div class="booking-layout"><div class="panel" id="payment-panel"><div class="pay-head"><h3>Guest details</h3><span class="pill">DEMO CHECKOUT</span></div>${nights() ? `<form id="payform"><div class="form-row"><div><label for="name">Full name</label><input id="name" name="name" autocomplete="name" required maxlength="100"></div><div><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="150"></div></div><label for="note">Arrival note (optional)</label><input id="note" name="note" maxlength="300" placeholder="For example, arriving in the evening"><label for="method">Payment method</label><select id="method"><option>Demo card payment</option><option>Demo bank transfer</option></select><p class="small">For this preview, do not enter bank or card details. Guest information stays in this page and is not submitted or saved.</p><label class="check"><input type="checkbox" required><span>I understand this is a demonstration and does not create a booking or take payment.</span></label><button class="btn full" type="submit">Complete demo checkout <span>↗</span></button></form>` : `<p>Choose your stay dates before trying the payment demo.</p><a class="btn" href="#stay">Choose your dates ↗</a>`}</div><aside class="panel"><div class="eyebrow">YOUR STAY</div><h3>Casa delle Olive</h3><p class="small">Montone, Umbria · ${guests} ${guests === 1 ? "guest" : "guests"}</p>${quote()}<a class="text-link" href="#stay">Edit dates & guests ↗</a><p class="small">The sample total excludes any unconfirmed taxes or deposits. Final payment schedule and cancellation terms are awaiting host details.</p></aside></div>`;
function render() {
  const route = (location.hash.slice(1) || "home").split("/")[0],
    page = ["home", "discover", "guide", "stay", "payment"].includes(route)
      ? route
      : "home";
  main.innerHTML = { home, discover, guide, stay, payment }[page]();
  document.title =
    {
      home: "A slower kind of Italy",
      discover: "Discover Umbria",
      guide: "Your guest guide",
      stay: "Availability & rates",
      payment: "Payment demo",
    }[page] + " · Casa delle Olive";
  document.querySelectorAll("nav a").forEach((a) => {
    a.removeAttribute("aria-current");
    if (a.hash === "#" + page) a.setAttribute("aria-current", "page");
  });
  document.querySelector("nav").classList.remove("open");
  document.querySelector(".menu").setAttribute("aria-expanded", "false");
  if (page === "stay") {
    draw();
    document.querySelector("#prev").onclick = () => {
      month.setMonth(month.getMonth() - 1);
      draw();
    };
    document.querySelector("#next").onclick = () => {
      month.setMonth(month.getMonth() + 1);
      draw();
    };
    document.querySelector("#reset").onclick = () => {
      start = "";
      end = "";
      draw();
      document.querySelector("#date-status").textContent =
        "Select an arrival date, then a departure date.";
    };
    document.querySelector("#guests").onchange = (e) =>
      (guests = +e.target.value);
    document.querySelector("#continue").onclick = (e) => {
      if (nights() < 3) {
        e.preventDefault();
        document.querySelector("#date-status").textContent =
          "Select arrival and departure dates for at least 3 nights first.";
      }
    };
  }
  if (page === "discover")
    document.querySelectorAll("[data-filter]").forEach(
      (b) =>
        (b.onclick = () => {
          document.querySelectorAll("[data-filter]").forEach((x) => {
            x.classList.toggle("active", x === b);
            x.setAttribute("aria-pressed", String(x === b));
          });
          document.querySelector("#places").innerHTML = places
            .filter(
              (p) =>
                b.dataset.filter === "All discoveries" ||
                p.cat === b.dataset.filter,
            )
            .map(destination)
            .join("");
        }),
    );
  if (page === "payment" && document.querySelector("#payform"))
    document.querySelector("#payform").onsubmit = (e) => {
      e.preventDefault();
      document.querySelector("#payment-panel").innerHTML =
        `<div class="success" role="status"><div class="eyebrow">DEMO COMPLETE</div><h3>A taste of what's to come.</h3><p>You explored checkout for ${nights()} nights in Umbria.</p><p><strong>No payment was taken and no booking was created.</strong> Your details have not been saved or sent.</p><a class="btn" href="#guide">Explore your guest guide ↗</a></div>`;
    };
  document.querySelectorAll("[data-gallery]").forEach(
    (b) =>
      (b.onclick = () => {
        const dialog = document.querySelector("#gallery");
        dialog.querySelector("img").src = b.dataset.gallery;
        dialog.querySelector("img").alt = "Imagined farmhouse interior";
        dialog.showModal();
      }),
  );
  const anchor = location.hash.split("/")[1];
  if (anchor) document.getElementById(anchor)?.scrollIntoView();
  else window.scrollTo(0, 0);
}
document.querySelector(".menu").onclick = () => {
  const nav = document.querySelector("nav");
  nav.classList.toggle("open");
  document
    .querySelector(".menu")
    .setAttribute("aria-expanded", String(nav.classList.contains("open")));
};
document.querySelector(".close").onclick = () =>
  document.querySelector("#gallery").close();
document.querySelector("#gallery").onclick = (e) => {
  if (e.target === e.currentTarget) e.currentTarget.close();
};
window.addEventListener("hashchange", render);
render();
