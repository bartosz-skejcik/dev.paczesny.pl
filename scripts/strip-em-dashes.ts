import fs from "fs"
import { stripEmDashes } from "@/lib/em-dash"

/**
 * Deterministic em dash guard for generated text, chiefly open-post-pr's PR body.
 * Reads a file, strips every U+2014 (replacing each with a comma), writes it back,
 * and reports the count. The end state is a guarantee, not a request: after this
 * runs the file cannot contain an em dash, so a PR body can never carry one to
 * GitHub regardless of how the prose was written.
 *
 * Usage: bun run fix:em-dash --file <path>
 */
function parseArgs() {
  const argv = process.argv.slice(2)
  let file: string | undefined

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token) {
      continue
    }

    if (token === "--file" || token === "-f") {
      file = argv[i + 1]
      i += 1
      continue
    }

    if (token.startsWith("--file=")) {
      file = token.split("=")[1]
      continue
    }
  }

  return { file }
}

function main() {
  const { file } = parseArgs()
  if (!file) {
    throw new Error(
      "Missing --file argument. Usage: bun run fix:em-dash --file path/to/body.md"
    )
  }

  const raw = fs.readFileSync(file, "utf-8")
  const result = stripEmDashes(raw)

  if (!result.changed) {
    console.log(`✓ ${file}: no em dashes`)
    return
  }

  fs.writeFileSync(file, result.text, "utf-8")
  console.log(
    `✓ ${file}: stripped ${result.count} em dash(es), replaced with commas`
  )
}

try {
  main()
} catch (error) {
  console.error(`✗ Failed stripping em dashes:`, (error as Error).message)
  process.exitCode = 1
}
