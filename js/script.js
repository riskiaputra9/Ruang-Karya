async function loadKarya() {
  const res = await fetch("data.json");
  const data = await res.json();

  const listEl = document.getElementById("karyaList");
  const searchInput = document.getElementById("searchInput");
  const filterKategori = document.getElementById("filterKategori");

  function renderList() {
    const searchText = searchInput.value.toLowerCase();
    const filter = filterKategori.value;

    listEl.innerHTML = "";

    const filtered = data.filter(item => {
      const cocokSearch = item.judul.toLowerCase().includes(searchText) || item.ringkasan.toLowerCase().includes(searchText);
      const cocokFilter = filter === "All" || item.kategori === filter;
      return cocokSearch && cocokFilter;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = "<p>Tidak ada karya ditemukan.</p>";
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.judul}</h3>
        <p><strong>${item.kategori}</strong> - ${item.tahun}</p>
        <p>${item.ringkasan}</p>
        <a href="${item.link}" target="_blank">Baca Selengkapnya →</a>
      `;
      listEl.appendChild(card);
    });
  }

  searchInput.addEventListener("input", renderList);
  filterKategori.addEventListener("change", renderList);

  renderList();
}

document.addEventListener("DOMContentLoaded", loadKarya);
