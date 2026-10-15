const search = document.getElementById('faq-search');
const count = document.getElementById('faq-count');
const empty = document.getElementById('faq-empty');
const printButton = document.getElementById('print');
const rows = [...document.querySelectorAll('#faq-list details')];

if (!(search instanceof HTMLInputElement) || !count || !empty || !printButton) {
  throw new Error('USM page controls are missing.');
}

function filterFaqs() {
  if (!(search instanceof HTMLInputElement) || !count || !empty) return;
  const query = search.value.trim().toLowerCase();
  let matches = 0;
  for (const row of rows) {
    if (!(row instanceof HTMLDetailsElement)) continue;
    const match = (row.textContent || '').toLowerCase().includes(query);
    row.hidden = !match;
    if (match) matches += 1;
  }
  count.textContent = `${matches} of ${rows.length} questions`;
  empty.hidden = matches > 0;
}

search.addEventListener('input', filterFaqs);
printButton.addEventListener('click', () => window.print());
filterFaqs();
