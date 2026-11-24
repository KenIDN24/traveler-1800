// One Sentence for a Traveler from 1800.
// Writes a single sentence (<=200 chars) explaining the modern internet to a
// time traveler from 1800, using only words they could know: post office,
// library, roads, light, letters, books. No post-1800 words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "It is a post office and a library in one, its roads made of light, where any letter arrives in a breath and any book ever printed waits for any reader.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const chars = [...SENTENCE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`sentence must be 1-200 characters, got ${chars.length}`);
}
if (SENTENCE.trim() !== SENTENCE || SENTENCE.includes("\n")) {
  throw new Error("sentence must be a single line with no surrounding whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, SENTENCE, "utf8");

// Round-trip check: read the file back and verify it is byte-for-byte the
// sentence, so a truncated or altered write can never slip through.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== SENTENCE) {
  throw new Error("round-trip check failed: entry.txt differs from sentence");
}
