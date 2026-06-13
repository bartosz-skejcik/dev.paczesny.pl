import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { ensureTranslation } from "@/lib/translator"
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"

export const runtime = "nodejs"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { targetLang } = await request.json()
    const normalized: SupportedLang | null = normalizeLang(targetLang)

    if (!normalized) {
      return NextResponse.json(
        { error: "Provide a supported targetLang value" },
        { status: 400 }
      )
    }

    const { slug } = await params
    const { filePath } = await ensureTranslation({
      slug,
      targetLang: normalized,
    })
    revalidatePath(`/blog/${normalized}/${slug}`)

    return NextResponse.json({ success: true, filePath })
  } catch (error) {
    console.error("Translation error", error)
    return NextResponse.json(
      { error: (error as Error).message ?? "Translation failed" },
      { status: 500 }
    )
  }
}

function normalizeLang(lang: unknown): SupportedLang | null {
  if (typeof lang !== "string") {
    return null
  }
  const normalized = lang.toLowerCase() as SupportedLang
  return SUPPORTED_LANGS.includes(normalized) ? normalized : null
}
