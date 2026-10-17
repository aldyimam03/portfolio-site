export type ProjectCategory = 'web' | 'api'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string[]
  tech: string[]
  category: ProjectCategory
  featured: boolean
  /** Link repositori GitHub — diisi hanya bila repo terverifikasi */
  repo?: string
  /** URL demo/live — diisi saat ada hosting */
  demo?: string
}

/** Data proyek portofolio — sumber kebenaran untuk section Proyek. */
export const projects: Project[] = [
  {
    id: 'freelance-design-platform',
    title: 'Freelance Design Platform',
    tagline: 'Platform pemesanan jasa desain dengan alur guest-to-order yang aman.',
    description: [
      'Aplikasi web full-stack untuk mengelola bisnis jasa desain: landing page publik, katalog layanan, formulir brief yang dinamis, hingga konversi inquiry menjadi order dengan quotation dan pipeline pembayaran.',
      'Keamanan jadi fokus utama: akses guest per-order lewat magic link & OTP yang disimpan ter-hash dan sekali pakai, session dengan scope tunggal, file privat dengan signed URL berumur pendek, verifikasi signature webhook pembayaran, serta audit log untuk aksi sensitif.',
      'Bagian internal mencakup dashboard admin untuk mengelola inquiry, order, pembayaran, dan penugasan. Dikembangkan bertahap mengikuti PRD, sistem desain, dan dokumentasi arsitektur/database yang lengkap, dengan test otomatis untuk setiap slice.',
    ],
    tech: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'web',
    featured: true,
  },
  {
    id: 'ksm-insentif',
    title: 'KSM Insentif',
    tagline: 'Aplikasi internal HR untuk mengelola karyawan, absensi, BPJS, izin/cuti, dan laporan operasional.',
    description: [
      'Aplikasi internal SDM berbasis Laravel untuk dashboard karyawan dan aktivitas absensi.',
      'Mencakup pengelolaan data karyawan, absensi, BPJS, master data, form izin/cuti, denda, jam kerja tambahan, serta berbagai laporan operasional.',
      'Terhubung ke SQL Server existing dan menyediakan endpoint lookup serta integrasi data internal. Aplikasi digunakan di lingkungan organisasi melalui deployment production.',
    ],
    tech: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'SQL Server', 'Laravel Mix', 'Laravel Excel', 'PhpSpreadsheet'],
    category: 'web',
    featured: true,
    repo: 'https://github.com/Kartikasari-2025/KSM-INSENTIF-WEB',
    demo: 'https://hr.kartikasari.co.id/',
  },
  {
    id: 'didx',
    title: 'DIDX',
    tagline: 'Platform operasional dealer terintegrasi untuk booking servis, pelanggan, order, dan proses after-sales.',
    description: [
      'Platform internal berbasis Laravel untuk mengelola alur operasional dealer dari customer, booking service, test drive, tracking order, hingga pengiriman unit.',
      'Modul yang tersedia mencakup finance simulation, Get Offer, insurance claim, One Access, WAC, appraisal booking, survey, VTS, PSM, dan bulk data.',
      'Menggunakan authentication, API/AJAX internal, Laravel Sanctum, serta RabbitMQ untuk mendukung integrasi dan pemrosesan event antar sistem.',
    ],
    tech: ['Laravel', 'PHP', 'Blade', 'MySQL', 'Laravel Sanctum', 'RabbitMQ', 'Laravel Mix', 'Axios', 'Bootstrap', 'SCSS'],
    category: 'web',
    featured: true,
    repo: 'https://github.com/Kartikasari-2025/DIDX',
    demo: 'https://didx.kartikasari.co.id/',
  },
  {
    id: 'service-app-api',
    title: 'Service-App-API',
    tagline: 'REST API booking servis kendaraan dengan autentikasi JWT dan validasi ketat.',
    description: [
      'API pemesanan servis kendaraan dengan arsitektur ala MVC: pelanggan dapat memesan servis secara online, mengecek status pemesanan cukup dengan nomor telepon, dan melihat jadwal servis yang tersedia.',
      'Sisi dealer: login/logout dengan JWT, mengelola jadwal servis (CRUD), mengubah status pemesanan, dan dashboard statistik pemesanan.',
      'Dilengkapi validasi input dengan Joi, hashing password menggunakan bcryptjs, rate limiting, dan security headers via Helmet.',
    ],
    tech: ['Node.js', 'Express.js', 'MySQL', 'JWT', 'Joi', 'Helmet', 'bcryptjs'],
    category: 'api',
    featured: true,
    repo: 'https://github.com/aldyimam03/service-app-api',
  },
  {
    id: 'store-market',
    title: 'Store-Market API',
    tagline: 'API manajemen toko dengan dukungan multi-database dan unit test.',
    description: [
      'REST API manajemen toko yang dibangun dengan Sequelize ORM, mendukung MySQL, PostgreSQL, SQLite, dan dialek lain lewat konfigurasi — sehingga aplikasi mudah berpindah database.',
      'Mencakup autentikasi (JWT + bcrypt), migrasi dan seed data lewat CLI, serta struktur yang rapi untuk dikembangkan.',
      'Ditulis dengan unit test menggunakan Jest untuk menjaga kualitas dan mencegah regresi.',
    ],
    tech: ['Node.js', 'Express.js', 'Sequelize', 'MySQL', 'PostgreSQL', 'SQLite', 'JWT', 'Jest'],
    category: 'api',
    featured: false,
    repo: 'https://github.com/aldyimam03/store-market',
  },
]

export const categoryLabel: Record<ProjectCategory, string> = {
  web: 'Web App',
  api: 'API',
}
