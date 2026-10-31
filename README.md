# Aldy Imam Wijaya — Portfolio

Portfolio personal Aldy Imam Wijaya, Full-Stack Web Developer. Dibangun dengan React 19, TypeScript, Vite, dan Tailwind CSS v4.

[![CI](https://github.com/aldyimam03/portfolio-site/actions/workflows/ci.yml/badge.svg)](https://github.com/aldyimam03/portfolio-site/actions/workflows/ci.yml)
[![Deploy](https://github.com/aldyimam03/portfolio-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/aldyimam03/portfolio-site/actions/workflows/deploy.yml)

## Fitur

- Satu halaman dengan navigasi anchor (Beranda, Tentang, Keahlian, Proyek, Kontak)
- Dark mode & light mode, tersimpan di `localStorage` (`portfolio-theme`) tanpa kedip saat reload
- Command palette `Ctrl/Cmd + K` untuk lompat ke bagian, membuka proyek, dan mengunduh CV
- Filter + pencarian proyek, detail proyek dalam modal
- Ikon teknologi dirender inline sebagai SVG (tanpa CDN pihak ketiga)
- Font Newsreader (judul) & IBM Plex Sans (teks) di-bundle sendiri
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
  index.css                 # token desain (kertas/gelap), tipografi dokumen, utilitas kustom
  lib/asset.ts              # helper URL aset yang sadar BASE_URL
  data/projects.ts          # data proyek (dipakai kartu, modal, palette)
  components/               # Navbar, Hero, About, Skills, Projects, Contact, …
```

## Arah desain

Halaman ini mengikuti arah yang ditulis di `DESIGN.md`: dokumen kerja berkertas gading, tinta gelap, satu aksen merah bata, judul serif Newsreader, teks IBM Plex Sans, dan margin kiri bernomor untuk setiap bagian. Dial-nya `ENERGY 2 / RHYTHM 2 / MOTION 1` — hanya transisi hover dan fokus, tanpa animasi masuk.

Baca `DESIGN.md` sebelum mengubah tampilan. `AGENTS.md` memuat perintah proyek dan aturan kerja untuk agen.

## Sistem tema

Warna tidak ditulis langsung di komponen. Semua memakai token semantik yang didefinisikan di `src/index.css`:

- `@theme inline` memetakan `--color-paper`, `--color-ink`, `--color-rule`, `--color-accent`, dan kawan-kawan ke variabel CSS runtime.
- Tema kertas adalah nilai default di `:root`; tema gelap menimpa variabel yang sama di `:root[data-theme='dark']`.

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

## CI/CD

| Lapis                          | Pemicu                                  | Yang dikerjakan                                                    |
| ------------------------------ | --------------------------------------- | ------------------------------------------------------------------ |
| `.github/workflows/ci.yml`     | push & pull request                     | lint → format:check → build → unggah artifact `dist`               |
| `.github/workflows/deploy.yml` | setelah CI hijau di `main`, atau manual | `vercel pull` → `vercel build` → `vercel deploy --prebuilt --prod` |
| Integrasi Git Vercel           | push ke `main` / pull request           | deploy produksi atau preview otomatis + status check di PR         |

Deploy lewat Actions hanya aktif bila secret `VERCEL_TOKEN`, `VERCEL_ORG_ID`, dan
`VERCEL_PROJECT_ID` tersedia (nilai org/project ada di `.vercel/project.json`).
Tanpa secret tersebut job dilewati dan deploy tetap ditangani integrasi Git
Vercel. Kalau deploy Actions diaktifkan, matikan auto-deploy Git di dashboard
Vercel supaya tidak ada dua deploy per push.

`vercel.json` mengatur beberapa hal sekaligus:

- `ignoreCommand` — Vercel melewati build bila push hanya menyentuh `*.md` atau `.github/`.
- `github.autoJobCancelation` — deploy lama dibatalkan saat ada push baru.
- header keamanan dan aturan cache untuk `/assets/*` serta aset gambar/CV.

## Teknologi

React 19 · TypeScript · Vite · Tailwind CSS v4 · oxlint · Prettier

## Lisensi

Konten portfolio dan CV milik Aldy Imam Wijaya.
