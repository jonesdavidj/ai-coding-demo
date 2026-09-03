const root = document.querySelector<HTMLDivElement>('#root');

if (!root) {
  throw new Error('App root element was not found.');
}

root.innerHTML = `
  <main class="app-shell">
    <p class="eyebrow">New app</p>
    <h1>Ready for your next idea.</h1>
    <p class="intro">This clean starter is ready for a new app experience.</p>
  </main>
`;
