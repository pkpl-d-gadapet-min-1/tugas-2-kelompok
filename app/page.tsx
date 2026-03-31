"use client";

import { useState } from "react";

export default function Home() {
  // State untuk Tema dan Font (Tugas Anggota 1)
  const [theme, setTheme] = useState("theme-default");
  const [font, setFont] = useState("font-sans");

  // Data Kelompok
  const members = [
    { name: "Muhammad Hariz Albaari", npm: "2406428775", role: "UI/UX & Infrastructure" },
    { name: "Anggota 2", npm: "2XXXXXX", role: "Auth Request (GCP)" },
    { name: "Anggota 3", npm: "2XXXXXX", role: "Token Exchange & Session" },
    { name: "Anggota 4", npm: "2XXXXXX", role: "Authorization & Packaging" },
  ];

  return (
    <main className={`min-h-screen p-8 ${theme} ${font}`}>
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="border-b pb-6 mb-8 border-current/20">
          <h1 className="text-3xl font-bold mb-2">Tugas 2: Auth & Authorization</h1>
          <p className="opacity-70">Pengantar Keamanan Perangkat Lunak - Genap 2025/2026</p>
        </header>

        {/* Section Biodata (Publik) */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 underline">Biodata Kelompok</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-current/20">
                  <th className="py-2">Nama</th>
                  <th className="py-2">NPM</th>
                  <th className="py-2">Peran</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i} className="border-b border-current/10">
                    <td className="py-3">{m.name}</td>
                    <td className="py-3">{m.npm}</td>
                    <td className="py-3 text-sm opacity-80">{m.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section Login (Tugas Anggota 2) */}
        <section className="p-6 border border-current/20 rounded-lg mb-8 text-center">
          <h2 className="text-lg mb-4">Akses Khusus Anggota</h2>
          
          {/* Tombol Login Placeholder */}
          <button 
            className="px-6 py-2 border border-current hover:bg-current hover:text-[var(--background)] transition-colors"
            onClick={() => alert("Redirecting to Google... (Tugas Anggota 2)")}
          >
            LOGIN WITH GOOGLE
          </button>
          
          <p className="mt-4 text-xs opacity-50 italic">
            Status: Belum Login (Placeholder)
          </p>
        </section>

        {/* Section Dashboard / Theme Switcher (Tugas Anggota 1 & 4) */}
        {/* TODO: Anggota 4 akan memberikan logic agar section ini hanya muncul jika is_member = true */}
        <section className="p-6 bg-current/5 border border-current/10 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Panel Otorisasi Anggota</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Control Warna */}
            <div>
              <p className="font-semibold mb-3">Ubah Warna Background:</p>
              <div className="flex gap-3">
                <button onClick={() => setTheme("theme-default")} className="px-3 py-1 border border-current text-xs">PUTIH</button>
                <button onClick={() => setTheme("theme-sepia")} className="px-3 py-1 border border-current text-xs">SEPIA</button>
                <button onClick={() => setTheme("theme-ocean")} className="px-3 py-1 border border-current text-xs">OCEAN</button>
              </div>
            </div>

            {/* Control Font */}
            <div>
              <p className="font-semibold mb-3">Ubah Jenis Font:</p>
              <div className="flex gap-3">
                <button onClick={() => setFont("font-sans")} className="px-3 py-1 border border-current text-xs">SANS</button>
                <button onClick={() => setFont("font-serif")} className="px-3 py-1 border border-current text-xs">SERIF</button>
                <button onClick={() => setFont("font-mono")} className="px-3 py-1 border border-current text-xs">MONO</button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs opacity-40">
            Catatan: Fitur di atas hanya akan dapat diakses oleh akun anggota kelompok yang terverifikasi.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-current/10 text-center text-sm opacity-50">
          <p>&copy; 2026 Kelompok Fasilkom UI. No icons used as requested.</p>
        </footer>

      </div>
    </main>
  );
}