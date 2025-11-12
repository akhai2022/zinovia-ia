import { NextRequest, NextResponse } from "next/server";
import { getChatBaseUrl } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const target = `${getChatBaseUrl()}/chat`;

    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errorBody = await upstream.text();
      return NextResponse.json(
        {
          message: "Chat service unavailable",
          detail: errorBody || upstream.statusText,
        },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Chat service unavailable",
        detail:
          error instanceof Error ? error.message : "Unknown chat proxy error",
      },
      { status: 502 }
    );
  }
}

