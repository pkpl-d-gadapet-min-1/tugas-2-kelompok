import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  try {
    const user = JSON.parse(session.value);
    return NextResponse.json({ loggedIn: true, user });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}