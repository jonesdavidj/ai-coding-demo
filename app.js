const API_URL =
  "https://api.erg.ic.ac.uk/AirQuality/Daily/MonitoringIndex/Latest/LocalAuthorityId=20/Json";
const STORE_KEY = "kensington-chelsea-air-quality-latest";

const fallbackReadings = [
  {
    site: "Kensington and Chelsea",
    pollutant: "Nitrogen Dioxide",
    code: "NO2",
    index: 2,
    status: "Low",
  },
  {
    site: "Kensington and Chelsea",
    pollutant: "PM10 Particulate",
    code: "PM10",
    index: 3,
    status: "Low",
  },
  {
    site: "Kensington and Chelsea",
    pollutant: "PM2.5 Particulate",
    code: "PM25",
    index: 2,
    status: "Low",
  },
];

const refreshButton = document.querySelector("#refresh-data");
const chart = document.querySelector("#air-chart");
const statusMessage = document.querySelector("#data-status");
const updatedAt = document.querySelector("#updated-at");
const sourceLink = document.querySelector("#source-link");
const maxIndex = 10;

function readStore() {
  const savedSnapshot = localStorage.getItem(STORE_KEY);

  if (!savedSnapshot) {
    return null;
  }

  try {
    return JSON.parse(savedSnapshot);
  } catch {
    localStorage.removeItem(STORE_KEY);
    return null;
  }
}

function writeStore(snapshot) {
  localStorage.setItem(STORE_KEY, JSON.stringify(snapshot));
}

function getValue(record, ...keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return "";
}

function normaliseStatus(index) {
  if (index <= 3) return "Low";
  if (index <= 6) return "Moderate";
  if (index <= 9) return "High";
  return "Very high";
}

function collectSiteSpecies(value, readings = []) {
  if (!value || typeof value !== "object") {
    return readings;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectSiteSpecies(item, readings));
    return readings;
  }

  if (value.SiteSpecies) {
    collectSiteSpecies(value.SiteSpecies, readings);
  }

  const index = Number(
    getValue(value, "@AirQualityIndex", "AirQualityIndex", "airQualityIndex"),
  );
  const pollutant = getValue(
    value,
    "@SpeciesDescription",
    "SpeciesDescription",
    "speciesDescription",
    "@SpeciesCode",
    "SpeciesCode",
    "speciesCode",
  );

  if (pollutant && Number.isFinite(index)) {
    readings.push({
      site: getValue(value, "@SiteName", "SiteName", "siteName") || "Unknown site",
      pollutant,
      code: getValue(value, "@SpeciesCode", "SpeciesCode", "speciesCode") || pollutant,
      index,
      status:
        getValue(value, "@AirQualityBand", "AirQualityBand", "airQualityBand") || normaliseStatus(index),
    });
  }

  Object.entries(value)
    .filter(([key]) => key !== "SiteSpecies")
    .forEach(([, child]) => collectSiteSpecies(child, readings));

  return readings;
}

function parseAirQualityJson(data) {
  const readings = collectSiteSpecies(data)
    .filter((reading) => reading.pollutant && Number.isFinite(reading.index))
    .sort((a, b) => b.index - a.index);

  if (readings.length === 0) {
    throw new Error("The air-quality JSON feed did not include chartable readings.");
  }

  return readings;
}

async function fetchAirQuality() {
  const response = await fetch(API_URL, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`The air-quality feed returned ${response.status}.`);
  }

  return parseAirQualityJson(await response.json());
}

function buildSnapshot(readings, source = "live") {
  return {
    source,
    sourceUrl: API_URL,
    fetchedAt: new Date().toISOString(),
    readings,
  };
}

function getBarClass(index) {
  if (index <= 3) return "bar--low";
  if (index <= 6) return "bar--moderate";
  if (index <= 9) return "bar--high";
  return "bar--very-high";
}

function renderChart(snapshot) {
  chart.replaceChildren();

  snapshot.readings.forEach((reading) => {
    const row = document.createElement("li");
    row.className = "chart-row";

    const label = document.createElement("div");
    label.className = "chart-label";

    const code = document.createElement("strong");
    code.textContent = reading.code;

    const pollutant = document.createElement("span");
    pollutant.textContent = reading.pollutant;

    label.append(code, pollutant);

    const track = document.createElement("div");
    track.className = "chart-track";

    const bar = document.createElement("div");
    bar.className = `chart-bar ${getBarClass(reading.index)}`;
    bar.style.width = `${Math.max((reading.index / maxIndex) * 100, 8)}%`;
    bar.textContent = reading.index;

    const status = document.createElement("span");
    status.className = "chart-status";
    status.textContent = reading.status;

    track.append(bar);
    row.append(label, track, status);
    chart.append(row);
  });

  const date = new Date(snapshot.fetchedAt);
  updatedAt.textContent = `Stored ${date.toLocaleString()} from ${snapshot.source} data`;
  sourceLink.href = snapshot.sourceUrl;
  sourceLink.textContent = "Imperial College London Air Quality API";
}

function setStatus(message) {
  statusMessage.textContent = message;
}

async function refreshData() {
  refreshButton.disabled = true;
  setStatus("Fetching the latest Kensington & Chelsea monitoring index...");

  try {
    const readings = await fetchAirQuality();
    const snapshot = buildSnapshot(readings);
    writeStore(snapshot);
    renderChart(snapshot);
    setStatus("Latest readings fetched, stored locally, and charted.");
  } catch (error) {
    const cachedSnapshot = readStore();

    if (cachedSnapshot) {
      renderChart(cachedSnapshot);
      setStatus(`${error.message} Showing the last stored snapshot instead.`);
    } else {
      const fallbackSnapshot = buildSnapshot(fallbackReadings, "sample fallback");
      writeStore(fallbackSnapshot);
      renderChart(fallbackSnapshot);
      setStatus(`${error.message} Showing sample data so the chart remains usable.`);
    }
  } finally {
    refreshButton.disabled = false;
  }
}

function initialise() {
  const cachedSnapshot = readStore();

  if (cachedSnapshot) {
    renderChart(cachedSnapshot);
    setStatus("Loaded stored readings. Refresh to update from the public feed.");
    return;
  }

  refreshData();
}

refreshButton.addEventListener("click", refreshData);
initialise();
