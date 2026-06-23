import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";

export async function GET() {
  try {
    const conn = await dbConnect();
    return NextResponse.json({
      ok: true,
      db: "connected",
      state: conn.connection.readyState, // 1 = connected
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
