/**
 * Menyusun URL aset di `public/` yang aman untuk deploy di root maupun subpath.
 *
 * Vite mengisi `BASE_URL` sesuai `base` di vite.config.ts (`'./'`), sehingga
 * `asset('me-001.webp')` menghasilkan `./me-001.webp` — bekerja baik di
 * `https://domain.com/` maupun `https://user.github.io/portfolio-site/`.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
