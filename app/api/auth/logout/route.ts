import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Hapus cookie session
  response.cookies.set("session", "", {
    httpOnly: true,
    maxAge: 0,   // Langsung expired
    path: "/",
  });

  return response;
}