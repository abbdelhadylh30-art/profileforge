import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const presetSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name too long"),
  config: z.string().min(2),
});

/** GET /api/presets — list all saved presets (newest first). */
export async function GET() {
  try {
    const presets = await db.preset.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, config: true, createdAt: true },
    });
    return NextResponse.json({ presets });
  } catch (error) {
    console.error("[presets:GET]", error);
    return NextResponse.json(
      { error: "Failed to load presets" },
      { status: 500 }
    );
  }
}

/** POST /api/presets — create a preset { name, config }. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = presetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 }
      );
    }
    // Validate that config is well-formed JSON before persisting.
    try {
      JSON.parse(parsed.data.config);
    } catch {
      return NextResponse.json(
        { error: "config must be a JSON string" },
        { status: 400 }
      );
    }
    const preset = await db.preset.create({
      data: { name: parsed.data.name, config: parsed.data.config },
    });
    return NextResponse.json({ preset }, { status: 201 });
  } catch (error) {
    console.error("[presets:POST]", error);
    return NextResponse.json(
      { error: "Failed to save preset" },
      { status: 500 }
    );
  }
}
