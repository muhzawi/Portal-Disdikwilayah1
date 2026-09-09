# Portal Disdik Wilayah 1

Portal web terpusat untuk Cabang Dinas Pendidikan Wilayah 1 Sumatera Utara.
Aplikasi ini membantu pengguna menemukan dan mengakses berbagai layanan
pendidikan dari satu portal, tanpa perlu berpindah-pindah tempat.

## Fitur Utama

- Halaman landing page dengan informasi portal dan cara kerja layanan.
- Login demo untuk masuk ke dashboard pengguna.
- Katalog aplikasi layanan pendidikan, seperti E-Arsip, Akademik, Inventaris,
  dan Kepegawaian.
- Penandaan aplikasi favorit dan daftar aplikasi yang baru diakses.
- Pencarian aplikasi serta filter berdasarkan kategori dan status layanan.
- Pengaturan tema tampilan terang dan gelap.
- Tampilan responsif untuk perangkat desktop dan mobile.

> Catatan: versi saat ini merupakan frontend prototype. Data pengguna,
> favorit, riwayat akses, dan tema disimpan di `localStorage` browser. URL
> pada katalog aplikasi masih berupa URL contoh dan dapat diganti saat layanan
> backend sudah tersedia.

## Tech Stack

- **React 19** - library untuk membangun antarmuka pengguna.
- **React Router 7** - routing halaman landing page, login, dashboard, dan
  detail aplikasi.
- **Vite 8** - development server dan build tool.
- **Tailwind CSS 4** - utilitas styling yang digunakan bersama CSS aplikasi.
- **Lucide React** - ikon antarmuka.
- **clsx** - utilitas untuk menyusun class name secara kondisional.
- **Vitest** dan **Testing Library** - dukungan pengujian frontend.
- **Oxlint** - pemeriksaan kualitas kode.

## Persyaratan

- Node.js versi 20 atau lebih baru.
- npm versi 10 atau lebih baru.

## Menjalankan Aplikasi

1. Masuk ke folder frontend:

   ```bash
   cd frontend
   ```

2. Pasang dependency:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

4. Buka alamat yang ditampilkan Vite, biasanya
   [http://localhost:5173](http://localhost:5173).

## Perintah yang Tersedia

Jalankan perintah berikut dari folder `frontend`:

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan development server dengan hot module replacement. |
| `npm run build` | Membuat build production di folder `dist`. |
| `npm run preview` | Menjalankan preview dari hasil build production. |
| `npm run lint` | Memeriksa kode menggunakan Oxlint. |

## Build Production

Untuk membuat dan memeriksa build production:

```bash
npm run build
npm run preview
```

Setelah perintah `preview` berjalan, buka alamat lokal yang ditampilkan pada
terminal.
