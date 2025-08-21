async function loadKategori(kategoriTarget) {
  const res = await fetch("data.json");
  const data = await res.json();

  const listEl = document.getElementById("karyaList");

  const filtered = data.filter(item => item.kategori === kategoriTarget);

  if (filtered.length === 0) {
    listEl.innerHTML = "<p>Belum ada karya di kategori ini.</p>";
    return;
  }

  filtered.sort((a, b) => b.tahun - a.tahun);

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.tahun]) grouped[item.tahun] = [];
    grouped[item.tahun].push(item);
  });

  for (const tahun of Object.keys(grouped).sort((a, b) => b - a)) {
    const yearBlock = document.createElement("div");
    yearBlock.className = "year-block";
    yearBlock.innerHTML = `<h2 class="year-title">📅 ${tahun}</h2>`;

    grouped[tahun].forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.judul}</h3>
        <p>${item.ringkasan}</p>
        <a href="${item.link}" target="_blank">Baca Selengkapnya →</a>
      `;
      yearBlock.appendChild(card);
    });

    listEl.appendChild(yearBlock);
  }
}
