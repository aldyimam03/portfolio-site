# DESIGN.md

Arah visual portofolio Aldy Imam Wijaya. Isi diambil dari jawaban pemilik (identitas, kepribadian, palet, tipografi), lalu diformat menjadi spesifikasi yang bisa dipakai ulang. Dokumen ini arah, bukan filter; aturan anti-slop ada di `AGENTS.md`.

## Identitas

Software engineer dengan fokus full-stack: web dan backend. Yang ditampilkan adalah cara kerja dan hasil kerja, bukan slogan.

## Kepribadian

Tenang dan presisi. Banyak ruang kosong. Halaman terasa seperti dokumen teknis yang disusun rapi, bukan halaman pemasaran.

## Dial

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

- ENERGY 2: nama dan judul terasa tegas, tetapi tidak ada elemen yang berteriak.
- RHYTHM 2: satu pola halaman yang konsisten, dengan beberapa jeda yang disengaja (baris proyek unggulan, potret di kolom margin).
- MOTION 1: hanya transisi hover dan fokus. Tidak ada animasi masuk, tidak ada gerakan berulang.

## Palet

Tiga warna: kertas, tinta, satu aksen. Warna netral (garis, teks sekunder) diturunkan dari tinta, bukan warna keempat.

| Peran  | Terang    | Gelap     |
| ------ | --------- | --------- |
| Kertas | `#f4ede3` | `#16110d` |
| Tinta  | `#241d17` | `#f2e9dc` |
| Aksen  | `#a8412a` | `#ef8f72` |

Alasan: kertas gading dan tinta gelap adalah bahasa dokumen cetak, cocok dengan kepribadian tenang dan presisi. Aksen merah bata dipakai hemat: penanda status, garis bawah item navigasi yang aktif, satu tombol utama per layar, sorotan fokus, dan label "Fokus utama". Tidak dipakai sebagai latar dekoratif.

## Tipografi

- Judul dan angka besar: **Newsreader** (serif variabel). Alasan: serif membaca sebagai tulisan yang disusun manusia, dan bentuknya tidak dipakai sebagai default antarmuka.
- Teks, label, dan kontrol: **IBM Plex Sans** (sans variabel). Alasan: Plex dirancang untuk konteks teknis, netral tanpa terasa seperti font bawaan.
- Angka: Plex Sans dengan `font-variant-numeric: tabular-nums` supaya kolom nomor sejajar.

Keduanya di-host sendiri lewat `@fontsource-variable`, tanpa permintaan ke domain pihak ketiga.

## Motif identitas

Margin kiri bernomor, seperti lembar spesifikasi: setiap bagian punya indeks `01` sampai `04` di kolom margin, garis rambut memisahkan bagian, dan konten duduk di kolom kanan dengan lebar baca terbatas. Di layar kecil margin turun menjadi baris label di atas konten.

Motif ini yang membuat halaman terasa milik proyek ini: kalau nama dan logo ditukar, strukturnya tetap terbaca sebagai dokumen kerja, bukan templat landing page.

## Aturan turunan

- Radius: `2px` untuk kontrol, `4px` untuk panel. Tidak ada bentuk pil. Dokumen bersudut tegas.
- Bayangan: hanya pada panel modal, sebagai penanda elevasi di atas halaman. Elemen lain rata.
- Garis: `1px` rambut sebagai pemisah utama, bukan kartu berbingkai.
- Latar: polos. Tanpa grid, tanpa blob, tanpa glow, tanpa tekstur.
- Ikon: hanya logo teknologi yang benar-benar mewakili isi, ukuran kecil, digambar satu warna (`currentColor`) supaya tetap di dalam palet. Merek dikenali dari bentuk, bukan dari warna.
- Foto: potret tampil tanpa bingkai tebal; garis rambut 1px hanya untuk memisahkan latar putih foto dari kertas. Di tema gelap foto diredupkan dan dihangatkan (`brightness .82`, `sepia .16`) supaya tidak jadi kotak paling terang di halaman.
- Gerak: transisi `150ms` untuk hover dan fokus. Menghormati `prefers-reduced-motion`.
- Tema: terang (kertas) sebagai default karena identitasnya dokumen. Tema gelap tetap disediakan dan harus sama lengkapnya.

## Yang sengaja tidak dipakai

Gradient teks, halo foto, marquee, kursor berkedip, badge pil di atas judul, kartu seragam, animasi masuk per bagian, dan angka statistik tanpa sumber. Semua itu sudah dicoba di versi sebelumnya dan tidak mendukung arah ini.
