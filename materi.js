/* Bahan bacaan per jenis soal. Konten HTML sederhana; kode dalam <pre>. */
window.MATERI = [
  {
    id: 0, judul: 'Dasar: input, print, dan tipe data',
    isi: `
<p>Setiap program ujian mengikuti pola <b>input → proses → output</b>.</p>
<ul>
<li><code>input()</code> membaca satu baris ketikan. Hasilnya <b>selalu teks (str)</b>.</li>
<li>Untuk angka, ubah dulu: <code>int(input())</code> untuk bilangan bulat, <code>float(input())</code> untuk bilangan desimal.</li>
<li><code>print()</code> menampilkan hasil. Beberapa nilai dipisah koma akan diberi spasi otomatis.</li>
</ul>
<pre>nama = input()            # teks, misal: Ani
umur = int(input())       # angka, misal: 14
print("Halo", nama)       # Halo Ani
print("Tahun depan", umur + 1)</pre>
<div class="awas"><b>Kesalahan umum:</b> lupa <code>int()</code>. Akibatnya <code>"14" + 1</code> menghasilkan error <i>TypeError</i>, atau <code>"5" * 3</code> menjadi <code>"555"</code>.</div>
<h4>Cara memakai web latihan ini</h4>
<ol>
<li>Tulis program di editor. Tombol <b>Tab</b> membuat 4 spasi.</li>
<li>Untuk mencoba sendiri, isi kotak <b>Input</b> (satu nilai per baris) lalu tekan <b>Jalankan</b>.</li>
<li>Tekan <b>Cek Jawaban</b>: program diuji dengan beberapa data uji, termasuk data tepat di batas.</li>
<li>Kalau masih belum benar, buka <b>Petunjuk</b>. <b>Pembahasan</b> terbuka setelah kamu mencoba Cek Jawaban.</li>
</ol>`
  },
  {
    id: 1, judul: 'Soal 1 – Persen (input – proses – output)',
    isi: `
<p>Persen berarti "per seratus": <b>p% dari x = x × p ÷ 100</b>.</p>
<ul>
<li>Pajak, biaya layanan, asuransi → <b>ditambahkan</b>: total = harga + persen.</li>
<li>Diskon → <b>dikurangkan</b>: total = harga − potongan.</li>
<li>Kalau ada jumlah barang, hitung <b>subtotal = harga × jumlah</b> dulu, baru persennya.</li>
</ul>
<pre>harga = int(input())
jumlah = int(input())
diskon = int(input())
subtotal = harga * jumlah
potongan = subtotal * diskon / 100
total = subtotal - potongan
print("Subtotal:", subtotal)
print("Potongan:", potongan)
print("Total bayar:", total)</pre>
<p>Pembagian <code>/</code> selalu menghasilkan bilangan desimal (float), misalnya <code>5500.0</code>. Itu tidak apa-apa; yang dinilai nilainya.</p>
<div class="awas"><b>Perhatikan:</b> urutan input harus sama dengan soal. Tampilkan <b>semua</b> nilai yang diminta di bagian Output, dengan urutan yang sama.</div>`
  },
  {
    id: 2, judul: 'Soal 2 – Pembagian bulat // dan sisa bagi %',
    isi: `
<ul>
<li><code>a // b</code> = hasil bagi <b>tanpa koma</b> (dibulatkan ke bawah).</li>
<li><code>a % b</code> = <b>sisa</b> pembagian.</li>
</ul>
<pre>menit = 135
print(menit // 60)   # 2  → 2 jam
print(menit % 60)    # 15 → sisa 15 menit</pre>
<p>Pola ini dipakai untuk mengubah satuan: menit → jam, hari → minggu, telur → kotak, uang → lembaran.</p>
<table class="t"><tr><th>Soal</th><th>Pembagi</th><th>Hasil //</th><th>Hasil %</th></tr>
<tr><td>Menit → jam</td><td>60</td><td>jam</td><td>sisa menit</td></tr>
<tr><td>Hari → minggu</td><td>7</td><td>minggu</td><td>sisa hari</td></tr>
<tr><td>Telur → kotak isi 12</td><td>12</td><td>kotak penuh</td><td>sisa telur</td></tr>
<tr><td>Uang → lembar Rp10.000</td><td>10000</td><td>lembar</td><td>sisa uang</td></tr></table>
<div class="awas"><b>Kesalahan umum:</b> memakai <code>/</code> (hasilnya 2.25) padahal yang diminta <code>//</code> (hasilnya 2).</div>`
  },
  {
    id: 3, judul: 'Soal 3 – Percabangan 2 kondisi (if – else)',
    isi: `
<pre>nilai = int(input())
if nilai >= 75:
    print("Tuntas")
else:
    print("Belum tuntas")</pre>
<ul>
<li>Setelah <code>if</code> dan <code>else</code> wajib ada <b>titik dua</b> <code>:</code>.</li>
<li>Baris di dalamnya <b>menjorok 4 spasi</b>.</li>
<li><code>==</code> untuk membandingkan, <code>=</code> untuk mengisi variabel.</li>
</ul>
<table class="t"><tr><th>Kalimat soal</th><th>Ditulis</th></tr>
<tr><td>minimal / paling sedikit / lebih dari atau sama dengan</td><td><code>&gt;=</code></td></tr>
<tr><td>lebih dari</td><td><code>&gt;</code></td></tr>
<tr><td>kurang dari</td><td><code>&lt;</code></td></tr>
<tr><td>kelipatan k (habis dibagi k)</td><td><code>x % k == 0</code></td></tr></table>
<div class="awas"><b>Data batas:</b> program diuji juga dengan angka <b>tepat di batas</b> (misalnya nilai = 75). Salah memilih <code>&gt;</code> atau <code>&gt;=</code> membuat jawaban salah.</div>`
  },
  {
    id: 4, judul: 'Soal 4 – Percabangan 5 kondisi (if – elif – else)',
    isi: `
<p>Untuk banyak kategori, pakai <code>if – elif – elif – elif – else</code>. Python memeriksa dari atas ke bawah dan <b>berhenti di kondisi pertama yang benar</b>.</p>
<p>Aturan: <i>suhu &lt; 10 → Dingin; 10 ≤ suhu &lt; 20 → Sejuk; 20 ≤ suhu &lt; 30 → Hangat; 30 ≤ suhu &lt; 35 → Panas; suhu ≥ 35 → Sangat Panas</i></p>
<pre>suhu = int(input())
if suhu < 10:
    print("Dingin")
elif suhu < 20:
    print("Sejuk")
elif suhu < 30:
    print("Hangat")
elif suhu < 35:
    print("Panas")
else:
    print("Sangat Panas")</pre>
<p>Karena urutannya naik, pada <code>elif suhu &lt; 20</code> kita sudah tahu suhu ≥ 10, jadi tidak perlu menulis <code>suhu &gt;= 10 and</code>.</p>
<div class="awas"><b>Perhatikan:</b> teks kategori harus <b>persis</b> sama dengan soal (huruf besar-kecil dan spasi). Cek angka tepat di batas: suhu = 10 harus masuk "Sejuk", bukan "Dingin".</div>`
  },
  {
    id: 5, judul: 'Soal 5 – Perulangan dan list (rekap data)',
    isi: `
<p>Langkahnya: baca n, baca n data ke dalam list, lalu hitung rekapnya.</p>
<pre>n = int(input())
data = []
for i in range(n):
    data.append(int(input()))

total = 0
jumlah = 0                  # penampung, mulai dari 0
for x in data:
    total = total + x
    if x >= 75:
        jumlah = jumlah + 1

rata = round(total / n, 2)
print("Total:", total)
print("Rata-rata:", rata)
print("Banyak tuntas:", jumlah)
print("Tertinggi:", max(data))</pre>
<ul>
<li><code>range(n)</code> mengulang tepat n kali.</li>
<li><code>list.append(x)</code> menambah data ke list.</li>
<li><code>sum(data)</code>, <code>len(data)</code>, <code>max(data)</code>, <code>min(data)</code> juga boleh dipakai.</li>
<li><code>round(x, 2)</code> membulatkan 2 angka di belakang koma.</li>
</ul>
<div class="awas"><b>Kesalahan umum:</b> <code>total = 0</code> ditulis <b>di dalam</b> perulangan (jadi di-nol-kan terus), syarat <code>&gt;=</code>/<code>&lt;=</code> terbalik, atau data terkecil diminta tetapi memakai <code>max()</code>.</div>`
  },
  {
    id: 6, judul: 'Soal 6 – Memperbaiki program (debugging)',
    isi: `
<p>Setiap soal perbaikan berisi <b>3 kesalahan</b>. Ada dua jenis:</p>
<ul>
<li><b>Kesalahan penulisan</b> → program langsung error. Pesan error menunjukkan <b>nomor baris</b>.</li>
<li><b>Kesalahan logika</b> → program berjalan tetapi hasilnya salah. Bandingkan hasil dengan perhitungan manual.</li>
</ul>
<table class="t"><tr><th>Gejala</th><th>Kemungkinan penyebab</th></tr>
<tr><td>SyntaxError di baris if/for/else</td><td>titik dua <code>:</code> hilang</td></tr>
<tr><td>SyntaxError di baris print</td><td>koma atau tanda kutip hilang</td></tr>
<tr><td>SyntaxError pada <code>if a = b</code></td><td>harus <code>==</code></td></tr>
<tr><td>IndentationError</td><td>baris dalam blok tidak menjorok / salah menjorok</td></tr>
<tr><td>TypeError: can only concatenate str…</td><td>lupa <code>int()</code> pada input</td></tr>
<tr><td>Tidak error tetapi hasil salah</td><td>rumus keliru (misal <code>* 10</code> seharusnya <code>* 100</code>) atau baris berada di blok yang salah</td></tr></table>
<p><b>Strategi:</b> jalankan → baca pesan error → perbaiki satu kesalahan → jalankan lagi. Setelah tidak error, coba input contoh dan hitung manual untuk mencari kesalahan logika.</p>`
  },
];

/* Petunjuk singkat per jenis soal (dibuka sebelum pembahasan). */
window.PETUNJUK = {
  1: ['Baca semua input dengan int(input()) sesuai urutan soal.', 'Hitung nilai persen: nilai × persen / 100.', 'Pajak/layanan/asuransi ditambah; diskon dikurang.'],
  2: ['Gunakan // untuk hasil bagi bulat dan % untuk sisa.', 'Tampilkan kedua hasil dalam satu atau dua print.'],
  3: ['Perhatikan kata "minimal" → >=.', 'Kelipatan k → x % k == 0.', 'Jangan lupa titik dua dan indentasi.'],
  4: ['Urutkan kondisi dari batas terkecil: if x < batas1, elif x < batas2, ...', 'Teks kategori harus persis sama dengan soal.', 'Uji sendiri dengan angka tepat di batas.'],
  5: ['Buat list kosong, lalu append di dalam for i in range(n).', 'Siapkan total = 0 dan jumlah = 0 sebelum perulangan.', 'Rata-rata: round(total / n, 2). Ekstrem: max() atau min().'],
  6: ['Tekan Jalankan dulu dan baca nomor baris pada pesan error.', 'Ada 3 kesalahan: biasanya 2 penulisan dan 1 logika (atau sebaliknya).', 'Setelah tidak error, cek hasilnya dengan hitungan manual.'],
};
