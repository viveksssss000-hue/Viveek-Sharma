/**
 * Builds the favicon and app-icon set from the brand mark.
 *
 * WHY THIS SCRIPT EXISTS
 * The brand kit's own favicon-256.png sets the "ACO" letters at 43% of the tile
 * width and 14% of its height, leaving most of the square empty. That is fine
 * for a 256px preview in a brand document and useless at 16px in a browser tab
 * or a Google result, where the letters land under 5px wide and read as a smudge.
 *
 * So this crops the designer's own glyphs to their bounding box and re-pads them
 * on an ink tile at a size chosen for the smallest place each file is used. The
 * letterforms are the brand's - nothing is re-typeset, because re-rendering
 * Archivo here would not match the master. Only the framing changes.
 *
 * Run: node scripts/build-icons.mjs
 * Commit the output. This is not part of the build - icons should not be
 * regenerated on every deploy, and a diff in a binary asset should be a
 * deliberate act someone reviewed.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SOURCE = "public/brand/mark-ink-512.png";
const INK = { r: 0x1b, g: 0x1a, b: 0x17, alpha: 1 }; // --color-ink
// Letters are #e0a95c (--color-ochre-light) on this ground: 8.3:1 contrast.

/**
 * How wide the letters sit, as a fraction of the tile.
 *
 * Small sizes are pushed close to the edge because every pixel of letter counts
 * when there are only sixteen of them. The 180px Apple icon is pulled in - iOS
 * rounds the corners and shows it large, so it can afford to breathe and would
 * look cramped otherwise.
 */
const FILL = { 16: 0.88, 32: 0.84, 48: 0.82, 96: 0.82, 256: 0.72, 180: 0.68, 192: 0.68, 512: 0.68 };

const trimmed = await sharp(SOURCE)
  .trim({ threshold: 20 }) // isolates the glyphs from the flat ink ground
  .toBuffer({ resolveWithObject: true });

console.log(`letters cropped to ${trimmed.info.width}x${trimmed.info.height}`);

/**
 * One square ink tile with the letters centred at the given fill ratio.
 *
 * `palette` is off for the images that go inside the ICO: Next's ICO decoder
 * rejects anything that is not RGBA, and the build fails outright rather than
 * warning. Standalone PNGs keep the palette, which roughly halves them.
 */
async function tile(size, { palette = true } = {}) {
  const fill = FILL[size] ?? 0.8;
  const w = Math.round(size * fill);
  const h = Math.max(1, Math.round((w * trimmed.info.height) / trimmed.info.width));

  const letters = await sharp(trimmed.data)
    .resize(w, h, { fit: "fill", kernel: "lanczos3" })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: INK },
  })
    .composite([
      {
        input: letters,
        left: Math.round((size - w) / 2),
        top: Math.round((size - h) / 2),
      },
    ])
    .png({ compressionLevel: 9, palette })
    .toBuffer();
}

/**
 * Packs PNGs into an ICO container.
 *
 * PNG-inside-ICO rather than BMP: every browser in support has handled it since
 * Vista, and it keeps the file a quarter of the size. Three sizes because the
 * consumers differ - 16 for the tab strip, 32 for retina tabs and bookmarks,
 * 48 for Windows shortcuts and some crawlers.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const dir = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette count, 0 for PNG
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    dir.push(e);
  }

  return Buffer.concat([header, ...dir, ...images.map((i) => i.data)]);
}

/**
 * Share of pixels carrying brand ochre, measured at 48px - the same measurement
 * `scripts/qa.mjs` makes, so the two agree by construction. Printed because it
 * is the only number here that says whether the framing actually works: the
 * brand kit's own favicon scores 1.6% and is a smudge in a tab.
 */
async function ochreShare(buf) {
  const { data, info } = await sharp(buf)
    .resize(48, 48, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let hits = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.abs(r - 0xe0) < 40 && Math.abs(g - 0xa9) < 40 && Math.abs(b - 0x5c) < 40)
      hits += 1;
  }
  return (hits / (48 * 48)) * 100;
}

const OUT = {
  /**
   * 96 rather than 32, which is what a favicon usually is.
   *
   * Google will not use a favicon for a search result unless it is square and
   * its side is a multiple of 48px, so a 32px file is silently ignored and the
   * result falls back to a generic globe. 96 is the smallest multiple that still
   * downscales cleanly to a 16px tab. The crisp 16 and 32 live in favicon.ico
   * alongside it, so browsers still get pixel-exact small sizes.
   */
  "src/app/icon.png": 96,
  "src/app/apple-icon.png": 180,
  "public/brand/icon-192.png": 192,
  "public/brand/icon-512.png": 512,
  "public/brand/favicon-256.png": 256, // kept for the brand doc, now correctly framed
};

for (const [path, size] of Object.entries(OUT)) {
  const buf = await tile(size);
  writeFileSync(path, buf);
  const share = (await ochreShare(buf)).toFixed(1);
  console.log(
    `${path.padEnd(32)} ${`${size}x${size}`.padEnd(9)} ${String(buf.length).padStart(6)}b  ${share}% ochre`
  );
}

const icoSizes = [16, 32, 48];
const icoBuf = ico(
  await Promise.all(
    icoSizes.map(async (size) => ({ size, data: await tile(size, { palette: false }) }))
  )
);
writeFileSync("src/app/favicon.ico", icoBuf);
console.log(
  `${"src/app/favicon.ico".padEnd(32)} ${icoSizes.join("/").padEnd(9)} ${String(icoBuf.length).padStart(6)}b`
);
console.log(
  [
    "",
    "qa.mjs fails below 1% ochre (wrong artwork) and warns below 3% (framed too",
    "loosely to read at 16px). The brand kit's own favicon-256 measured 1.6%.",
  ].join("\n")
);
