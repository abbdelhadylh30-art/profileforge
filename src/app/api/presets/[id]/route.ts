import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** DELETE /api/presets/[id] — remove a saved preset. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.preset.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Preset not found" }, { status: 404 });
    }
    await db.preset.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[presets:DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete preset" },
      { status: 500 }
    );
  }
}
