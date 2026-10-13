const root = document.querySelector('#root');

if (!root) {
  throw new Error('App root element was not found.');
}

root.innerHTML = `
  <main class="app-shell">
    <h1>Hello World</h1>
  </main>
`;
