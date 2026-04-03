import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");   // Authorization Code dari Google
  const error = searchParams.get("error"); // Kalau user cancel

  // Kalau user cancel login
  if (error) {
    return NextResponse.redirect(new URL("/?error=access_denied", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    // Tukar Authorization Code = Access Token + ID Token 
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
    code,
    client_id:     process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,    
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,            
    redirect_uri:  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!, 
    grant_type:    "authorization_code",
    }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(new URL("/?error=token_failed", request.url));
    }

    // tokenData berisi: access_token, id_token (JWT), expires_in, dll
    const { id_token, access_token } = tokenData;

    // ID Token adalah JWT → payload ada di bagian tengah (base64)
    const payload = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64url").toString()
    );

    const userEmail = payload.email;
    const userName  = payload.name;
    const userPicture = payload.picture;

    // Cek apakah email ada pada whitelist
    const whitelist = [
      "farishudaku@gmail.com",
      "fadhil.daffa@ui.ac.id",
      "harizof@gmail.com",
      "gerry.bimaputra@gmail.com"
    ];
    const isMember = whitelist.includes(userEmail);

    // Simpan session di HTTP-only Cookie ──
    const sessionData = JSON.stringify({
      email: userEmail,
      name:  userName,
      picture: userPicture,
      is_member: isMember,
      loggedInAt: Date.now(),
    });

    const response = NextResponse.redirect(new URL("/", request.url));

    // Set cookie: HTTP-only = tidak bisa diakses JS di browser
    response.cookies.set("session", sessionData, {
      httpOnly: true,                       // Proteksi utama dari XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only di production
      sameSite: "lax",                      // Proteksi CSRF
      maxAge: 60 * 60 * 24,                 // 1 hari (dalam detik)
      path: "/",
    });

    return response;

  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL("/?error=server_error", request.url));
  }
}