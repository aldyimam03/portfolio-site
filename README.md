# Aldy Imam Wijaya — Portfolio

Portfolio personal Aldy Imam Wijaya, Full-Stack Web Developer. Dibangun dengan React 19, TypeScript, Vite, dan Tailwind CSS v4.

## Fitur

- Satu halaman dengan navigasi anchor (Beranda, Tentang, Keahlian, Proyek, Kontak)
- Dark mode & light mode, tersimpan di `localStorage` (`portfolio-theme`) tanpa kedip saat reload
- Command palette `Ctrl/Cmd + K` untuk lompat ke bagian, membuka proyek, dan mengunduh CV
- Filter + pencarian proyek, detail proyek dalam modal
- Ikon teknologi dirender inline sebagai SVG (tanpa CDN pihak ketiga)
- Font Inter & JetBrains Mono di-bundle sendiri
- Metadata OG/Twitter, `sitemap.xml`, `robots.txt`, dan JSON-LD `Person`

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (default `http://localhost:5173`).

## Skrip

| Skrip                  | Kegunaan                                             |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Server pengembangan dengan HMR                       |
| `npm run build`        | Type-check (`tsc -b`) lalu build produksi ke `dist/` |
| `npm run preview`      | Menyajikan hasil build untuk uji akhir               |
| `npm run lint`         | Lint dengan oxlint                                   |
| `npm run format`       | Rapikan format dengan Prettier                       |
| `npm run format:check` | Cek format tanpa mengubah file (dipakai CI)          |

Sebelum push, jalankan `npm run lint && npm run format:check && npm run build`.

## Struktur

```
index.html                  # shell HTML: anti-FOUC, meta, JSON-LD
public/                     # aset statis (gambar, CV, favicon, robots, sitemap)
scripts/                    # skrip sekali pakai: generator ikon & favicon
src/
  main.tsx                  # entry React + impor font
  App.tsx                   # komposisi section, state tema & command palette
  index.css                 # token desain (light/dark), utilitas kustom, animasi
  lib/asset.ts              # helper URL aset yang sadar BASE_URL
  data/projects.ts          # data proyek (dipakai kartu, modal, palette)
  components/               # Navbar, Hero, About, Skills, Projects, Contact, …
```

## Sistem tema

Warna tidak ditulis langsung di komponen. Semua memakai token semantik yang didefinisikan di `src/index.css`:

- `@theme inline` memetakan `--color-bg`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-accent`, dan kawan-kawan ke variabel CSS runtime.
- Tema gelap adalah nilai default di `:root`; tema terang menimpa variabel yang sama di `:root[data-theme='light']`.

Menambah warna baru cukup dengan mendaftarkan satu pasang variabel (gelap & terang) — tidak perlu menulis ulang `className` di komponen.

## Aset gambar

- `public/me-001.webp` — foto hero (dipakai juga untuk `preload`)
- `public/me-002.webp` — foto kontak
- `public/og-image.jpg` — kartu 1200×630 untuk pratinjau tautan

Ganti gambar lalu sesuaikan `width`/`height` di komponen agar tidak ada layout shift.

## Regenerasi ikon & favicon

```bash
python scripts/gen-tech-icons.py   # data SVG dari Simple Icons -> src/components/tech-icons.ts
python scripts/gen-favicons.py     # favicon.ico, apple-touch-icon, ikon PWA
```

Keduanya hanya perlu dijalankan bila ingin memperbarui aset, bukan saat build.

## Deploy (Vercel)

Situs ini dideploy ke Vercel: **https://portfolio-site-theta-gilt.vercel.app/**

- Framework terdeteksi sebagai Vite; `vercel.json` mematok `buildCommand` dan `outputDirectory` agar konsisten.
- Push ke `main` memicu deploy produksi; branch lain menjadi preview deployment.
- Aset `/assets/*` di-cache permanen (nama file ber-hash), gambar publik di-cache 1 hari.

Deploy manual:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # produksi
```

Bila domain berubah, perbarui URL absolut di `index.html` (`og:url`, `og:image`, `twitter:image`, JSON-LD), `public/robots.txt`, dan `public/sitemap.xml`.

## Teknologi

React 19 · TypeScript · Vite · Tailwind CSS v4 · oxlint · Prettier

## Lisensi

Konten portfolio dan CV milik Aldy Imam Wijaya.
