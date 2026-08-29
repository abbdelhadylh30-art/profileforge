import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const bioSchema = z.object({
  name: z.string().trim().max(120).optional().default(""),
  role: z.string().trim().max(200).optional().default(""),
  workingOn: z.string().trim().max(200).optional().default(""),
  learning: z.string().trim().max(200).optional().default(""),
  funFact: z.string().trim().max(300).optional().default(""),
});

/** POST /api/ai-bio — generate a punchy first-person GitHub profile bio. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bioSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }
    const { name, role, workingOn, learning, funFact } = parsed.data;

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const context = [
      name && `Name: ${name}`,
      role && `Role: ${role}`,
      workingOn && `Currently working on: ${workingOn}`,
      learning && `Currently learning: ${learning}`,
      funFact && `Fun fact: ${funFact}`,
    ]
      .filter(Boolean)
      .join("\n");

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a witty senior developer who writes GitHub profile bios. Write a punchy, friendly, first-person GitHub profile bio. Requirements: 1-2 sentences, max 220 characters, at most one tasteful emoji, no markdown, no quotes around the output, no preamble — return ONLY the bio text.",
        },
        {
          role: "user",
          content: context
            ? `Write a GitHub profile bio for this developer:\n${context}`
            : "Write a GitHub profile bio for a passionate full-stack developer.",
        },
      ],
      temperature: 0.8,
    });

    const bio = completion?.choices?.[0]?.message?.content?.trim() ?? "";
    if (!bio) {
      return NextResponse.json(
        { error: "AI returned an empty bio" },
        { status: 502 }
      );
    }
    return NextResponse.json({ bio: bio.replace(/^["'`]|["'`]$/g, "") });
  } catch (error) {
    console.error("[ai-bio:POST]", error);
    return NextResponse.json(
      { error: "AI is unavailable right now — write your own bio!" },
      { status: 500 }
    );
  }
}
