/**
 * Latihan ASKA Praktik Informatika Kelas IX – SMP Labschool Jakarta
 * Backend Google Sheet: daftar murid, catatan latihan, dan rekap untuk guru.
 *
 * Tab yang dibuat oleh setup():
 *   Murid  : Kelas | Absen | Nama
 *   Log    : Waktu | Kelas | Absen | Nama | Aktivitas | Soal | Judul | Lolos | Total | Hasil | Lihat pembahasan
 *   Rekap  : satu baris per murid (rumus otomatis)
 *
 * Data murid diisi dari file Murid.gs (konstanta MURID) atau ditempel langsung di tab Murid.
 */

const TZ = 'Asia/Jakarta';
const KELAS = ['IX-A', 'IX-B', 'IX-C', 'IX-D', 'IX-E', 'IX-F', 'IX-G'];

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const murid = sheet_(ss, 'Murid', ['Kelas', 'Absen', 'Nama']);
  if (murid.getLastRow() < 2 && typeof MURID !== 'undefined') {
    const rows = MURID.map(m => [m.kelas, m.absen, m.nama]);
    murid.getRange(2, 1, rows.length, 3).setValues(rows);
  }
  const log = sheet_(ss, 'Log', ['Waktu', 'Kelas', 'Absen', 'Nama', 'Aktivitas', 'Soal', 'Judul', 'Lolos', 'Total', 'Hasil', 'Lihat pembahasan']);
  log.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm:ss');
  buatRekap_(ss);
  ss.toast('Setup selesai. Lanjutkan dengan Deploy → New deployment → Web app.');
}

function sheet_(ss, nama, header) {
  let sh = ss.getSheetByName(nama);
  if (!sh) sh = ss.insertSheet(nama);
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold').setBackground('#d9d9d9');
  sh.setFrozenRows(1);
  return sh;
}

function buatRekap_(ss) {
  const head = ['Kelas', 'Absen', 'Nama', 'Total cek', 'Soal 1 benar', 'Soal 2 benar', 'Soal 3 benar', 'Soal 4 benar', 'Soal 5 benar', 'Soal 6 benar',
    'Jenis soal tuntas (≥5x benar)', 'Buka pembahasan', 'Buka materi', 'Terakhir latihan'];
  const sh = sheet_(ss, 'Rekap', head);
  const murid = ss.getSheetByName('Murid');
  const n = Math.max(0, murid.getLastRow() - 1);
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, head.length).clearContent();
  if (!n) return;
  const f = [];
  for (let i = 0; i < n; i++) {
    const r = i + 2;
    const k = `Murid!A${r}`, a = `Murid!B${r}`;
    const base = `Log!$B:$B,${k},Log!$C:$C,${a}`;
    const row = [`=${k}`, `=${a}`, `=Murid!C${r}`, `=COUNTIFS(${base},Log!$E:$E,"cek")`];
    for (let s = 1; s <= 6; s++) row.push(`=COUNTIFS(${base},Log!$E:$E,"cek",Log!$F:$F,${s},Log!$J:$J,"Benar")`);
    row.push(`=COUNTIF(E${r}:J${r},">=5")`);
    row.push(`=COUNTIFS(${base},Log!$E:$E,"pembahasan")`);
    row.push(`=COUNTIFS(${base},Log!$E:$E,"materi")`);
    row.push(`=IFERROR(1/(1/MAXIFS(Log!$A:$A,${base})),"")`);
    f.push(row);
  }
  sh.getRange(2, 1, n, head.length).setFormulas(f.map(r => r.map(String)));
  sh.getRange(2, 14, n, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  sh.setColumnWidth(3, 240);
}

/* ---------- Web app ---------- */
function doGet(e) {
  const p = e.parameter || {};
  try {
    if (p.aksi === 'murid') return json_({ ok: true, data: daftarMurid_(p.kelas) });
    if (p.aksi === 'ping') return json_({ ok: true });
    return json_({ ok: false, pesan: 'aksi tidak dikenal' });
  } catch (err) { return json_({ ok: false, pesan: String(err) }); }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.aksi !== 'log' || !Array.isArray(body.data)) return json_({ ok: false, pesan: 'format salah' });
    const valid = indexMurid_();
    const rows = [];
    body.data.slice(0, 300).forEach(d => {
      const key = d.kelas + '|' + d.absen;
      if (!valid[key]) return;                         // abaikan data yang bukan murid terdaftar
      const akt = ['masuk', 'cek', 'materi', 'pembahasan'].indexOf(d.aktivitas) >= 0 ? d.aktivitas : 'lain';
      rows.push([
        new Date(Number(d.t) || Date.now()), d.kelas, Number(d.absen), valid[key], akt,
        d.soal === undefined || d.soal === null ? '' : Number(d.soal), String(d.judul || '').slice(0, 80),
        d.lolos === undefined ? '' : Number(d.lolos), d.total === undefined ? '' : Number(d.total),
        akt === 'cek' ? (d.benar ? 'Benar' : 'Belum') : '', akt === 'cek' ? (d.pembahasan ? 'Ya' : '') : '',
      ]);
    });
    if (rows.length) {
      const lock = LockService.getScriptLock(); lock.waitLock(20000);
      try {
        const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
        sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      } finally { lock.releaseLock(); }
    }
    return json_({ ok: true, masuk: rows.length });
  } catch (err) { return json_({ ok: false, pesan: String(err) }); }
}

function daftarMurid_(kelas) {
  if (KELAS.indexOf(kelas) < 0) return [];
  const cache = CacheService.getScriptCache();
  const c = cache.get('murid_' + kelas); if (c) return JSON.parse(c);
  const v = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Murid').getDataRange().getValues().slice(1);
  const out = v.filter(r => r[0] === kelas).map(r => ({ absen: Number(r[1]), nama: String(r[2]) })).sort((a, b) => a.absen - b.absen);
  cache.put('murid_' + kelas, JSON.stringify(out), 600);
  return out;
}

function indexMurid_() {
  const v = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Murid').getDataRange().getValues().slice(1);
  const o = {}; v.forEach(r => { o[r[0] + '|' + Number(r[1])] = String(r[2]); }); return o;
}

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
