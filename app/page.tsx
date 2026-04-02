"use client";

import { useState, useEffect } from "react"; // ← tambah useEffect

export default function Home() {
  const [theme, setTheme] = useState("theme-default");
  const [font, setFont] = useState("font-sans");
  const [user, setUser] = useState<any>(null); // ← tambah ini

  // ← Tambah ini: cek session saat halaman dibuka
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) setUser(data.user);
      });
  }, []);

  const handleGoogleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
      response_type: 'code',
      scope: 'email profile', // ← tambah profile
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  };

  // ← Tambah ini: fungsi logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const members = [
    { name: "Muhammad Hariz Albaari", npm: "2406428775", role: "UI/UX & Infrastructure" },
    { name: "Gerry Bima Putra", npm: "2406495464", role: "Auth Request (GCP)" },
    { name: "Fadhil Daffa Putra irawan", npm: "2406438271", role: "Token Exchange & Session" },
    { name: "Faris Huda", npm: "2406421970", role: "Authorization & Packaging" },
  ];

  return (
    <main className={`min-h-screen p-8 ${theme} ${font}`}>
      <div className="max-w-3xl mx-auto">
        
        {/* Header — tidak diubah */}
        <header className="border-b pb-6 mb-8 border-current/20">
          <h1 className="text-3xl font-bold mb-2">Tugas 2: Auth & Authorization</h1>
          <p className="opacity-70">Pengantar Keamanan Perangkat Lunak - Genap 2025/2026</p>
        </header>

        {/* Biodata — tidak diubah */}
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

        {/* Section Login — tampilan sama, hanya status & tombol yang berubah */}
        <section className="p-6 border border-current/20 rounded-lg mb-8 text-center">
          <h2 className="text-lg mb-4">Akses Khusus Anggota</h2>
          
          <button 
            className="px-6 py-2 border border-current hover:bg-[black] hover:text-[white] transition-colors"
            onClick={user ? handleLogout : handleGoogleLogin} // ← toggle login/logout
          >
            {user ? "LOGOUT" : "LOGIN WITH GOOGLE"} {/* ← teks berubah */}
          </button>
          
          <p className="mt-4 text-xs opacity-50 italic">
            {/* ← status berubah sesuai kondisi */}
            {user ? `Status: Login sebagai ${user.email}` : "Status: Belum Login"}
          </p>
        </section>

        {/* Panel — tidak diubah sama sekali */}
        <section className="p-6 bg-current/5 border border-current/10 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Panel Otorisasi Anggota</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-3">Ubah Warna Background:</p>
              <div className="flex gap-3">
                <button onClick={() => setTheme("theme-default")}
                  disabled={!user?.is_member}
                  className="px-3 py-1 border border-current text-xs">PUTIH</button>
                <button onClick={() => setTheme("theme-sepia")}
                  disabled={!user?.is_member}
                  className="px-3 py-1 border border-current text-xs">SEPIA</button>
                <button onClick={() => setTheme("theme-ocean")}
                 disabled={!user?.is_member}
                 className="px-3 py-1 border border-current text-xs">OCEAN</button>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3">Ubah Jenis Font:</p>
              <div className="flex gap-3">
                <button onClick={() => setFont("font-sans")}
                  disabled={!user?.is_member}
                  className="px-3 py-1 border border-current text-xs">SANS</button>
                <button onClick={() => setFont("font-serif")}
                  disabled={!user?.is_member}
                  className="px-3 py-1 border border-current text-xs">SERIF</button>
                <button onClick={() => setFont("font-mono")}
                  disabled={!user?.is_member}
                  className="px-3 py-1 border border-current text-xs">MONO</button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs opacity-40">
            Catatan: Fitur di atas hanya akan dapat diakses oleh akun anggota kelompok yang terverifikasi.
          </p>
        </section>

        {/* Footer — tidak diubah */}
        <footer className="mt-16 pt-8 border-t border-current/10 text-center text-sm opacity-50">
          <p>&copy; 2026 Kelompok Fasilkom UI. No icons used as requested.</p>
        </footer>

      </div>
    </main>
  );
}