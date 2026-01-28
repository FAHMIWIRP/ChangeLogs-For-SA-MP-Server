let nomor = 1;

window.onload = () => {
  const data = JSON.parse(localStorage.getItem("logs")) || [];
  data.forEach(item => tampilkanLog(item));
  nomor = data.length + 1;
};

function tambahLog() {
  const log = {
    tanggal: tanggal.value,
    jam: jam.value,
    jenis: jenis.value,
    detail: detail.value
  };

  tampilkanLog(log);

  const data = JSON.parse(localStorage.getItem("logs")) || [];
  data.push(log);
  localStorage.setItem("logs", JSON.stringify(data));

  nomor++;
  detail.value = "";
}

function iconJenis(jenis) {
  if (jenis === "Update") return "bi-arrow-up-circle text-success";
  if (jenis === "Fix Bug") return "bi-bug text-warning";
  if (jenis === "Hapus") return "bi-trash text-danger";
  if (jenis === "Perbaikan") return "bi-tools text-primary";
}

function tampilkanLog(log) {
  const tbody = document.querySelector("#tabelLog tbody");
  const row = tbody.insertRow();

  row.insertCell(0).innerText = nomor;
  row.insertCell(1).innerHTML = `<i class="bi bi-calendar"></i> ${log.tanggal}`;
  row.insertCell(2).innerHTML = `<i class="bi bi-clock"></i> ${log.jam}`;
  row.insertCell(3).innerHTML = `<i class="bi ${iconJenis(log.jenis)}"></i> ${log.jenis}`;

  const detailCell = row.insertCell(4);
  detailCell.innerText = log.detail;

  if (log.jenis === "Update") detailCell.className = "update";
  if (log.jenis === "Fix Bug") detailCell.className = "fixbug";
  if (log.jenis === "Hapus") detailCell.className = "hapus";
  if (log.jenis === "Perbaikan") detailCell.className = "perbaikan";
}

function cariLog() {
  const input = search.value.toLowerCase();
  document.querySelectorAll("#tabelLog tbody tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
  });
}
function loadPlayerLogs() {
  const data = JSON.parse(localStorage.getItem("logs")) || [];
  const container = document.getElementById("logPlayerList");

  container.innerHTML = "";

  data.reverse().forEach(log => {
    const warna = getWarna(log.jenis);
    const icon = iconJenis(log.jenis);

    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="card modern-card h-100">
        <div class="card-body">
          <h5><i class="bi ${icon}"></i> ${log.jenis}</h5>
          <small class="text-muted"><i class="bi bi-calendar"></i> ${log.tanggal} | <i class="bi bi-clock"></i> ${log.jam}</small>
          <p class="mt-2 fw-semibold" style="color:${warna}">${log.detail}</p>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function getWarna(jenis) {
  if (jenis === "Update") return "#16a34a";
  if (jenis === "Fix Bug") return "#f59e0b";
  if (jenis === "Hapus") return "#dc2626";
  if (jenis === "Perbaikan") return "#2563eb";
}

function cariLogPlayer() {
  const input = searchPlayer.value.toLowerCase();
  document.querySelectorAll("#logPlayerList .card").forEach(card => {
    card.parentElement.style.display =
      card.innerText.toLowerCase().includes(input) ? "" : "none";
  });
}
function logoutDev() {
  localStorage.removeItem("devLogin");
  window.location.href = "login.html";
}