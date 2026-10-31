# AGENTS.md

Panduan untuk agen yang mengerjakan repo ini.

## Proyek

Portofolio satu halaman, React 19 + TypeScript + Vite + Tailwind CSS v4. Tanpa backend. Konten berbahasa Indonesia (`lang="id"`).

- Lint: `npm run lint` (oxlint)
- Format: `npm run format:check`
- Build: `npm run build`
- Pratinjau produksi: `npx vite preview --port <port> --strictPort`

Ketiganya adalah gerbang sebelum menyatakan pekerjaan selesai. Deploy produksi lewat Vercel; lihat `README.md`.

## Arah desain

Baca `DESIGN.md` sebelum menyentuh UI. Isinya identitas, palet, tipografi, dial, dan motif halaman. Jangan menambah warna, font, radius, atau gerak di luar yang tertulis di sana tanpa mengubah `DESIGN.md` lebih dulu.

<!-- antislop:start -->

## antislop

Untuk pekerjaan UI, teks, aksesibilitas, atau layout mobile, baca aturan antislop lebih dulu:

- Inti (filter wajib): skill `antislop`
- UI dan visual: skill `antislop-ui`

Keduanya tersedia di direktori skill agen, bukan di dalam repo ini.

Sebelum mulai, ikuti bagian "Two Usage Modes" di inti dengan urutan ketat: instruksi sesi lebih dulu, lalu preferensi global, lalu tanya. Instruksi sesi selalu menang. Untuk mode yang sudah ditentukan, ucapkan `antislop active: <mode> (session override).` atau `antislop active: <mode> (global preference).` satu kali sebelum menyajikan temuan atau melakukan perubahan.

Hanya pilihan eksplisit atas antislop selama atau setelah sesi yang memilih mode sesi. Permintaan meninjau, mengaudit, atau tidak mengubah berkas tidak memilih mode; baca preferensi global dalam kasus itu. Mode dari skill lain tidak memilih mode antislop.

Jika mode belum ditentukan, tanyakan dan akhiri respons; tunggu jawaban sebelum meninjau UI, merencanakan, atau menyusun konsep. Untuk tugas baca-saja, taruh pemberitahuan mode hanya di awal jawaban akhir, bukan di pesan progres. Untuk tugas yang mengubah berkas, umumkan sebelum perubahan pertama dan hilangkan dari jawaban akhir.
<!-- antislop:end -->

## Konvensi kerja

- Jangan mengarang isi: proyek, angka, testimoni, dan tautan harus berasal dari `src/data/projects.ts` atau dari pemilik.
- Token warna semantik ada di `src/index.css` (`@theme inline`). Jangan menulis warna hex langsung di komponen.
- Setiap kontrol interaktif harus punya perilaku nyata, nama aksesibel, dan indikator fokus.
- Verifikasi di browser untuk kedua tema sebelum melapor, bukan hanya build hijau.
