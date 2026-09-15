// ============================================================
// DATA CENTER — Website Portofolio Ahmad Danial Hariadi
// Semua konten dikelola di satu tempat agar mudah dipelihara.
// Ganti data di sini; UI akan mengikuti secara otomatis.
// ============================================================

export const profile = {
  name: 'Ahmad Danial Hariadi',
  firstName: 'Ahmad Danial',
  role: 'Full Stack Web Developer',
  status: 'Fresh Graduate 2026',
  tagline: 'Fresh Graduate 2026 — Full Stack Web Developer',
  statement: "Fresh graduate Program Studi Teknologi Informasi dengan pengalaman freelance sejak 2023. Berfokus pada pengembangan website dan solusi digital menggunakan Laravel, React.js, PHP, dan Node.js.",
  location: 'Indonesia',
  email: 'ahmaddanihariadi@gmail.com',
  openToWork: true,
  openToWorkTags: ['Full-Time', 'Freelance', 'Collaboration'],
  avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQE2rghHU6aQ_g/profile-displayphoto-crop_800_800/B4EaBDkU.0JUAI-/0/1787839992129?e=1790208000&v=beta&t=AQeU5CC5y2IOAZM_5tvBJUP741qJ_ukLTZZUonO901s',
  quickInfo: [
    { label: 'Status', value: 'Fresh Graduate 2026' },
    { label: 'Role', value: 'Full Stack Developer' },
    { label: 'Fokus', value: 'Web Development & Information System' },
    { label: 'Lokasi', value: 'Indonesia' },
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com/Ahmadskylord', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ahmad-danial-hariadi', icon: 'linkedin' },
    { name: 'WhatsApp', url: 'https://wa.me/628596116579', icon: 'whatsapp' },
    { name: 'Email', url: 'mailto:ahmaddanihariadi@gmail.com', icon: 'mail' },
  ],
  github: { username: 'Ahmadskylord', url: 'https://github.com/Ahmadskylord' },
  cvs: [
    {
      name: 'CV Ahmad Danial Hariadi',
      file: '/cv-ahmad-danial.pdf',
      updated: '2026',
      active: true,
    },
  ],
  stats: [
    { label: 'Projects', value: 5 },
    { label: 'Technologies', value: 10 },
    { label: 'Experience', value: '2+ Years' },
    { label: 'Open to Work', value: 'Yes' },
  ],
}

export const about = {
  heading: 'More Than Just a Developer',
  paragraphs: [
    'Ahmad Danial Hariadi adalah fresh graduate Program Studi Teknologi Informasi dari Institut Teknologi dan Kesehatan Aspirasi (ITKA) yang berfokus pada pengembangan website, sistem informasi, dan solusi digital.',
    'Memiliki pengalaman freelance sejak 2023 dalam membangun aplikasi web dari sisi frontend maupun backend. Terbiasa menggunakan Laravel, Blade, React.js, PHP, JavaScript, MySQL, dan Git. Aktif dalam kegiatan organisasi sebagai Wakil Presiden Mahasiswa BEM ITKA dan Sekretaris Umum HMI Komisariat Teknik.',
  ],
}

export const whatIdo = [
  {
    title: 'Web Development',
    desc: 'Membangun website responsif, cepat, dan mudah digunakan dari halaman landing hingga aplikasi kompleks.',
    icon: 'code',
  },
  {
    title: 'Full Stack Development',
    desc: 'Mengelola seluruh lapisan aplikasi — frontend, backend, database, dan deployment — secara utuh.',
    icon: 'layers',
  },
  {
    title: 'Information System',
    desc: 'Merancang dan membangun sistem informasi untuk arsip, pendaftaran, dan manajemen data organisasi.',
    icon: 'database',
  },
  {
    title: 'UI Implementation',
    desc: 'Menerjemahkan desain menjadi antarmuka yang presisi, konsisten, dan interaktif dengan teknologi web.',
    icon: 'layout',
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    items: ['PHP', 'Laravel', 'Node.js', 'REST API'],
  },
  {
    category: 'Database',
    items: ['MySQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Canva'],
  },
]

export const projects = [
  {
    slug: 'e-arsip-itka',
    title: 'E-Arsip ITKA',
    fullTitle: 'Sistem Manajemen Arsip Digital - E-Arsip ITKA',
    category: ['Information System'],
    type: 'Digital Archive Management System',
    year: 2026,
    role: 'Full Stack Web Developer',
    stack: ['Laravel 10', 'PHP', 'MySQL', 'Blade'],
    short: 'Sistem pengelolaan arsip digital berbasis website untuk membantu penyimpanan, pencarian, pengelolaan, dan distribusi dokumen.',
    overview:
      'Sistem pengelolaan arsip digital berbasis website untuk membantu penyimpanan, pencarian, pengelolaan, dan distribusi dokumen.',
    problem:
      'Pengelolaan arsip sebelumnya bersifat manual dan tersebar, sehingga sulit dicari, tidak efisien, dan sulit mendistribusikan dokumen.',
    solution:
      'Membangun sistem arsip terpusat dengan fitur penyimpanan, pencarian, kategori, dan manajemen dokumen yang mudah digunakan.',
    features: [
      'Authentication',
      'Dashboard',
      'Archive Management',
      'Search & Filter',
      'Document Management',
      'Document Distribution',
    ],
    demo: '#',
    github: '',
  },
  {
    slug: 'jejakte-parfum',
    title: 'Jejakte Parfum',
    fullTitle: 'Jejakte Parfum - Sistem Penjualan Online',
    category: ['E-Commerce'],
    type: 'Web-Based Online Store',
    year: 2026,
    role: 'Full Stack Web Developer',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    short: 'Sistem penjualan online untuk pengelolaan produk dan proses pemesanan secara digital.',
    overview:
      'Sistem penjualan online untuk pengelolaan produk dan proses pemesanan secara digital.',
    problem:
      'Penjualan sebelumnya mengandalkan media sosial tanpa katalog terstruktur, sulit menampilkan produk dan mengelola pesanan.',
    solution:
      'Membangun toko online dengan katalog produk terstruktur, keranjang belanja, dan proses checkout yang lebih profesional.',
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Checkout Process',
      'Order Management',
      'Product Management',
    ],
    demo: '#',
    github: '',
  },
  {
    slug: 'pmb-online',
    title: 'PMB Online',
    fullTitle: 'Sistem Pendaftaran Mahasiswa - PMB Online',
    category: ['Web Application'],
    type: 'Online Student Registration System',
    year: 2026,
    role: 'Full Stack Web Developer',
    stack: ['Node.js', 'JavaScript', 'Excel', 'WhatsApp Integration'],
    short: 'Sistem pendaftaran mahasiswa berbasis web dengan pengelolaan data, export Excel, dan integrasi notifikasi WhatsApp.',
    overview:
      'Sistem pendaftaran mahasiswa berbasis web untuk membantu proses registrasi dan pengelolaan data calon mahasiswa.',
    problem:
      'Proses pendaftaran manual memakan waktu, data mudah tercecer, komunikasi lambat, dan sulit mencetak laporan.',
    solution:
      'Membangun sistem pendaftaran online dengan input data digital, ekspor ke Excel, dan notifikasi otomatis via WhatsApp.',
    features: [
      'Online Registration',
      'Data Management',
      'Excel Export',
      'WhatsApp Notification',
      'Dashboard Admin',
    ],
    demo: '#',
    github: '',
  },
  {
    slug: 'sistem-pengajuan-bbm',
    title: 'Sistem Pengajuan BBM',
    fullTitle: 'Sistem Pengajuan BBM dengan QR Code',
    category: ['Information System'],
    type: 'Web-Based Submission System',
    year: 2026,
    role: 'Full Stack Web Developer',
    stack: ['Laravel', 'MySQL', 'QR Code'],
    short: 'Sistem pengajuan berbasis web dengan validasi dokumen dan verifikasi menggunakan QR code.',
    overview:
      'Sistem pengajuan berbasis web dengan validasi dokumen dan verifikasi menggunakan QR code untuk memastikan keabsahan proses.',
    problem:
      'Proses pengajuan BBM secara manual membutuhkan verifikasi yang lama dan rentan kesalahan.',
    solution:
      'Membangun sistem pengajuan web dengan validasi dokumen otomatis dan verifikasi menggunakan QR code.',
    features: [
      'Document Upload & Validation',
      'QR Code Verification',
      'Submission Tracking',
      'Admin Dashboard',
      'Approval Workflow',
    ],
    demo: '#',
    github: '',
  },
  {
    slug: 'sistem-pengaduan-ks',
    title: 'Sistem Pengaduan KS',
    fullTitle: 'Sistem Pengaduan Kekerasan Seksual Civitas Akademika',
    category: ['Information System'],
    type: 'Web-Based Reporting Platform',
    year: 2026,
    role: 'Full Stack Web Developer',
    stack: ['Laravel 10', 'Bootstrap', 'MySQL'],
    short: 'Platform berbasis web untuk mendukung proses pengajuan dan pengelolaan laporan secara digital.',
    overview:
      'Platform berbasis web untuk mendukung proses pengajuan dan pengelolaan laporan pengaduan kekerasan seksual secara digital bagi civitas akademika.',
    problem:
      'Proses pengaduan secara manual belum memberikan rasa aman dan anonimitas bagi pelapor, serta proses penanganan belum terstruktur.',
    solution:
      'Membangun platform pengaduan digital dengan fitur pelaporan yang aman, anonim, dan proses penanganan yang terstruktur.',
    features: [
      'Anonymous Reporting',
      'Case Management',
      'Status Tracking',
      'Admin Moderation',
      'Confidentiality System',
    ],
    demo: '#',
    github: '',
  },
]

export const projectFilters = ['All', 'Information System', 'E-Commerce', 'Web Application']

export const experiences = [
  {
    role: 'Freelance Web Developer',
    org: 'Independent',
    period: '2023 — Present',
    type: 'Freelance',
    desc: 'Mengembangkan website dan sistem informasi sesuai kebutuhan pengguna.',
    tasks: [
      'Mengembangkan website dan sistem informasi sesuai kebutuhan pengguna',
      'Mengembangkan frontend dan backend secara penuh',
      'Merancang struktur database dan fitur aplikasi',
      'Melakukan integrasi API dan pengelolaan data',
      'Debugging, testing, dan deployment aplikasi',
    ],
  },
]

export const organizations = [
  {
    role: 'Wakil Presiden Mahasiswa',
    org: 'BEM ITKA',
  },
  {
    role: 'Sekretaris Umum',
    org: 'HMI Komisariat Teknik',
  },
]

export const strengths = [
  'Problem Solving',
  'Web Development',
  'System Analysis',
  'Database Management',
  'Team Collaboration',
  'Communication',
  'Continuous Learning',
]

export const careerObjective =
  'Membangun karier di bidang software engineering dan web development dengan mengembangkan solusi digital yang fungsional, terukur, dan memberikan manfaat nyata bagi pengguna maupun organisasi.'

export const educations = [
  {
    school: 'Institut Teknologi dan Kesehatan Aspirasi',
    major: 'Teknologi Informasi',
    degree: 'Sarjana Teknologi Informasi',
    period: '2022 — 2026',
    focus: 'Pengembangan perangkat lunak, basis data, sistem informasi, dan teknologi web.',
    projects: '',
  },
]

export const certifications = []

export const journey = [
  {
    year: '2022',
    title: 'Memulai Studi TI',
    desc: 'Masuk Program Studi Teknologi Informasi di Institut Teknologi dan Kesehatan Aspirasi.',
  },
  {
    year: '2023',
    title: 'Freelance Web Developer',
    desc: 'Mulai mengembangkan website dan sistem informasi secara freelance.',
  },
  {
    year: '2026',
    title: 'Fresh Graduate',
    desc: 'Menyelesaikan studi dan siap berkarier sebagai Full Stack Web Developer.',
  },
]

export const blogPosts = []

export const blogCategories = ['Semua']

export const github = {
  username: 'Ahmadskylord',
  url: 'https://github.com/Ahmadskylord',
  repos: [],
}


