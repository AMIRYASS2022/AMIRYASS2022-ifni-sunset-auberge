import fs from 'fs';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

const ROOT = path.resolve(process.cwd());
const HERO_DIR = path.join(ROOT, 'assets', 'originals', 'hero');
const OUT_PATH = path.join(ROOT, 'public', 'hero-loop.webm');

function findFirstImage(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  if (files.length === 0) return null;
  return path.join(dir, files[0]);
}

async function main() {
  const input = findFirstImage(HERO_DIR);
  if (!input) {
    console.error('No hero images found in', HERO_DIR);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

  ffmpeg.setFfmpegPath(ffmpegPath);
  console.log('Generating 12s WebM loop from', input);
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(input)
      .inputOptions(['-loop 1'])
      .videoFilters([
        'scale=1920:-2',
        "zoompan=z='zoom+0.001':d=1:x='iw/2':y='ih/2'",
        'format=yuv420p'
      ])
      .duration(12)
      .outputOptions(['-c:v libvpx-vp9', '-b:v 1M'])
      .on('error', reject)
      .on('end', resolve)
      .save(OUT_PATH);
  });
  console.log('✓ Saved', OUT_PATH);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});