# Tugas 2 - Kelompok Authentication & Authorization
**Matakuliah:** Pengantar Keamanan Perangkat Lunak - Genap 2025/2026   

// TODO :
List Anggota

## Deskripsi Proyek
Proyek ini adalah implementasi website biodata kelompok yang mendemonstrasikan mekanisme keamanan tingkat lanjut melalui protokol OAuth 2.0 (Google Provider). Fokus utama adalah pada pemisahan antara fase Autentikasi (verifikasi identitas) dan Otorisasi (pembatasan hak akses fitur berdasarkan role).

## Pembagian Tugas (Sekuensial 1-2-3-4)

### Anggota 1: UI/UX, State Management, & Infrastructure
**Fokus:** Menyiapkan infrastruktur dasar, antarmuka publik, dan deployment.
- **Setup Repository:** Menginisialisasi repositori GitHub kelompok dan mengatur branch utama.
- **Deployment:** Melakukan setup deployment awal ke Vercel agar progres dapat dipantau secara live.
- **Template Tugas:** Menyusun struktur folder proyek (Next.js/React) dan boilerplate awal.
- **Frontend Dasar:** Membuat halaman statis untuk Biodata Kelompok.
- **Komponen Auth:** Membuat komponen tombol "Login with Google".
- **Logika Tema:** Mengimplementasikan state untuk fitur ganti warna/font website (masih dapat diakses publik pada tahap ini).

### Anggota 2: Setup GCP & Authorization Request
**Fokus:** Fase pertama OAuth (Meminta izin ke pengguna).
- **GCP Configuration:** Membuat proyek di Google Cloud Console, mengatur OAuth Consent Screen, dan mengamankan Client ID.
- **Auth Construction:** Merakit URL endpoint Google (`https://accounts.google.com/o/oauth2/v2/auth`) beserta parameter wajib (`client_id`, `redirect_uri`, `response_type=code`, `scope=email`).
- **Redirect Logic:** Memodifikasi tombol login agar mengarahkan pengguna secara benar ke halaman login Google.

### Anggota 3: Token Exchange & Session Backend
**Fokus:** Fase kedua OAuth dan Keamanan Sesi (Implementasi teknis inti).
- **Callback Endpoint:** Membuat API route `/api/auth/callback` sebagai `redirect_uri` untuk menangkap Authorization Code.
- **Token Exchange:** Mengimplementasikan pertukaran kode secara aman dengan Google Token API menggunakan Client Secret untuk mendapatkan Access Token & ID Token (JWT).
- **Session Management:** Mengekstrak email pengguna dan mengelola sesi menggunakan HTTP-only cookie lokal untuk menandakan status login.

### Anggota 4: Eksekusi Otorisasi & Packaging
**Fokus:** Mengunci fitur berdasarkan role dan finalisasi administrasi.
- **Logic Authorization:** Membuat pengecekan pada backend/middleware untuk memvalidasi apakah email pengguna terdapat dalam whitelist anggota kelompok (`is_member = true`).
- **Frontend Integration:** Menghubungkan status otorisasi untuk memunculkan/menyembunyikan fitur ganti tema bagi pengguna non-anggota.
- **Deliverables:** Melakukan testing akhir, menyusun laporan PDF, memproduksi video presentasi, dan membungkus source code ke dalam format ZIP sesuai ketentuan.

## Panduan Instalasi & Jalankan
1. Clone repositori ini.
2. Jalankan `npm install` untuk mengunduh dependensi.
3. Masukkan kredensial OAuth ke dalam file `.env.local`.
4. Jalankan aplikasi dengan `npm run dev`.

---
**Catatan:** Pastikan file `.env` tidak diunggah ke repositori publik demi keamanan Client Secret.