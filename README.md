# 🏛️ Portal Layanan Terpusat - Cabang Dinas Pendidikan Wilayah I

Portal Layanan Terpusat Cabang Dinas Pendidikan Wilayah I Provinsi Sumatera Utara adalah platform web terpadu yang dirancang untuk mengintegrasikan berbagai aplikasi internal (seperti E-Arsip, Kepegawaian, Akademik, dan Inventaris) dalam satu pintu dengan sistem autentikasi terpusat (_Single Sign-On_).

---

## ✨ Fitur Utama

- 🔐 **Autentikasi Terpusat**:
  - Login & Registrasi Akun Pegawai dengan alur verifikasi/persetujuan (_approval_).
  - Fitur **Ingat Saya** (_Remember Me_) & **Lupa Password** terhubung langsung dengan Supabase Auth.
- 👥 **Manajemen Peran & Akses (Role-Based Access Control)**:
  - **Super User**: Mengelola persetujuan pendaftaran akun, mengontrol hak akses pengguna ke tiap aplikasi, serta menambah dan menghapus aplikasi dari portal.
  - **Medium User**: Akses terbatas ke aplikasi-aplikasi yang diizinkan oleh Super User.
- 📱 **Manajemen Aplikasi Dinamis**:
  - Super User dapat menambahkan aplikasi baru, mengatur kategori, versi, deskripsi, serta tautan eksternal langsung dari Dashboard.
  - Pengguna dapat membuka aplikasi internal dengan token akses yang terverifikasi.
- 🎨 **Desain Modern & Responsif**:
  - Tampilan UI/UX modern dengan dukungan Dark Mode, animasi halus, dan tata letak yang ramah pengguna.
- 🚀 **Siap Deploy (Production Ready)**:
  - Konfigurasi siap deploy ke **Vercel** (Frontend SPA Rewrite & Backend Serverless Function).

---

## 🛠️ Teknologi yang Digunakan

### **Frontend**

- **Framework / Library**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Custom Vanilla CSS (Design Tokens, Glassmorphism, Dark/Light Theme)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### **Backend & Database**

- **Runtime**: Node.js (ES Modules)
- **Web Framework**: Express.js 5
- **Database & Auth**: Supabase (PostgreSQL + Supabase Auth)
- **Security & Middleware**: Helmet, CORS, Morgan, Dotenv

---

## 📁 Struktur Direktori

```text
Portal-Disdikwilayah1/
├── backend/                  # Server API Express.js
│   ├── api/                  # Serverless Entrypoint (Vercel)
│   ├── src/                  # Source code Express API (routes, controllers, middleware)
│   ├── supabase/             # Skema & Migrasi Database SQL
│   └── package.json
├── frontend/                 # Client Aplikasi Web React Vite
│   ├── public/               # Asset statis
│   ├── src/                  # Komponen, Halaman, Context, & Style CSS
│   ├── vercel.json           # Konfigurasi rewrite SPA Vercel
│   └── package.json
├── .gitignore
└── README.md                 # Dokumentasi Proyek
```

---

## 🚀 Cara Menjalankan Project

### **Prasyarat**

- **Node.js** (v18.x atau yang lebih baru)
- **npm** (v9.x atau yang lebih baru)
- Akun & Proyek **Supabase** (URL & API Key)

---

### **1. Setup Backend**

1. Masuk ke direktori `backend`:

   ```bash
   cd backend
   ```

2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env` di dalam folder `backend` dan sesuaikan nilainya:

   ```env
   PORT=3000
   SUPABASE_URL=https://<your-supabase-id>.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   FRONTEND_URL=http://localhost:5173
   ```

4. Jalankan migrasi SQL di Supabase Query Editor menggunakan berkas SQL yang ada di folder `backend/supabase/`.

5. Jalankan backend server:
   ```bash
   npm run dev
   ```
   _Server backend akan berjalan di `http://localhost:3000`._

---

### **2. Setup Frontend**

1. Buka terminal baru dan masuk ke direktori `frontend`:

   ```bash
   cd frontend
   ```

2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env` di dalam folder `frontend` (opsional jika menggunakan port default):

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Jalankan frontend development server:
   ```bash
   npm run dev
   ```
   _Aplikasi frontend akan berjalan di `http://localhost:5173`._

---

## 📄 Lisensi & Hak Cipta

© 2025 Cabang Dinas Pendidikan Wilayah I Sumatera Utara. All rights reserved.
