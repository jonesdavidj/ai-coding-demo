# Kensington & Chelsea Air Quality Demo

A Vercel-ready static app that proves a browser-only development workflow using
GitHub Codespaces and Vercel while doing useful work with a public datastore.

The app fetches the latest daily monitoring index as JSON for Kensington & Chelsea from
the Imperial College London Air Quality API, stores the response in
`localStorage`, and renders the stored readings as a bar chart.

## Run in GitHub Codespaces

1. Open this repository in GitHub.
2. Select **Code** > **Codespaces** > **Create codespace on current branch**.
3. In the Codespaces terminal, run:

   ```bash
   python3 -m http.server 3000
   ```

4. Open the forwarded port shown by Codespaces to view the air-quality chart.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Sign in to Vercel.
3. Choose **Add New...** > **Project**.
4. Import this GitHub repository.
5. Keep the default settings. This is a static site with no build command required.
6. Select **Deploy**.

The result is a public Vercel URL showing the Kensington & Chelsea air-quality
app.

## Data flow

1. Fetch JSON from `https://api.erg.ic.ac.uk/AirQuality/Daily/MonitoringIndex/Latest/LocalAuthorityId=20/Json`.
2. Parse the JSON monitoring-site pollutant readings in the browser.
3. Store the latest parsed snapshot in `localStorage`.
4. Build the bar chart from the stored snapshot.
5. Fall back to the last stored snapshot if the live feed is unavailable.
