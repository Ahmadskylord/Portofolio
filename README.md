# Portofolio Ahmad Danial Hariadi

Website portofolio personal **Ahmad Danial Hariadi** — Fresh Graduate Full Stack Web Developer.
Dibangun dengan **React + Vite + Tailwind CSS** (React Router berbasis hash untuk halaman detail project).

## Menjalankan

```bash
npm install
npm run dev        # development
npm run build      # production build (output ke dist/)
npm run preview    # preview hasil build
```

## Struktur

```
src/
  data/portfolio.js        # SEMUA konten terpusat (ganti data di sini)
  components/              # Navbar, Footer, CommandPalette, Icon, Reveal, SectionHeading
  components/sections/     # Hero, About, WhatIDo, Skills, Projects, ProjectDetail, dll
  context/ThemeContext.jsx # Dark/Light mode
```

## Fitur

- Dark Tech Editorial theme (default dark, toggle light)
- Sticky navbar + active section indicator + mobile menu
- Command Palette (Ctrl + K)
- Projects dengan filter & halaman detail
- Experience, Education, Certifications (modal preview), Journey timeline
- GitHub repo, Blog/Notes dengan search & filter kategori
- Contact form (masuk ke inbox admin)
- Download CV
- Scroll reveal animation, responsive

## Admin / CMS

Akses panel admin: buka `#/admin` (atau klik "Admin" di footer / Command Palette Ctrl+K).

- **Login demo:** `admin` / `admin123`
- Dashboard statistik (Projects, Skills, Certificates, Blog, Messages)
- **CRUD Projects** — tambah/edit/hapus project
- **Messages inbox** — baca, tandai dibaca, hapus (pesan dari form kontak masuk ke sini)
- **Editor konten** — Profile, Skills, Experience, Education, Certifications, Blog, Journey, Social Links (editor JSON + form)
- Data tersimpan di `localStorage` browser (database sederhana tanpa backend).
  Untuk produksi multi-user, sambungkan ke backend (Laravel + Sanctum) + MySQL sesuai brief.

## Ganti Data

Buka `src/data/portfolio.js` dan ubah semua konten awal: profil, project, skill, sertifikasi,
pengalaman, blog, tautan sosial, dll. Edit lewat panel admin akan menyimpannya di
`localStorage` dan langsung tampil di situs.

## Ganti CV

Tempatkan file PDF CV Anda di folder `public/` lalu ubah nama file pada
`src/data/portfolio.js` (variabel `cvs[].file`). Saat ini `public/cv-ahmad-danial.pdf`
adalah placeholder.


