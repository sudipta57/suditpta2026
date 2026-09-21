"""
Converts photos into web-ready gallery images.

Usage:
  pip install pillow pillow-heif
  python scripts/build_gallery.py <folder-with-photos>

- Accepts JPG/PNG/HEIC (iPhone), fixes rotation, resizes to 1600px max, saves WebP.
- Files are named by content hash, so re-running never duplicates a photo.
- Writes lib/gallery-images.json (sizes + blur placeholders). Captions live in
  lib/gallery.ts and are never overwritten by this script.
"""
import base64, hashlib, io, json, sys
from pathlib import Path
from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "gallery"
MANIFEST = ROOT / "lib" / "gallery-images.json"
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"}


def taken_at(im: Image.Image) -> str | None:
    exif = im.getexif()
    dt = exif.get_ifd(0x8769).get(36867) or exif.get(306)
    return dt.replace(":", "-", 2) if dt else None


def main(src: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    added = 0
    for path in sorted(src.iterdir()):
        if path.suffix.lower() not in EXTS:
            continue
        raw = path.read_bytes()
        key = hashlib.sha1(raw).hexdigest()[:10]
        if key in manifest:
            continue
        im = Image.open(io.BytesIO(raw))
        date = taken_at(im)
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((1600, 1600), Image.LANCZOS)
        im.save(OUT / f"{key}.webp", "WEBP", quality=78, method=6)
        tiny = im.copy()
        tiny.thumbnail((16, 16))
        buf = io.BytesIO()
        tiny.save(buf, "WEBP", quality=40)
        manifest[key] = {
            "src": f"/gallery/{key}.webp",
            "width": im.width,
            "height": im.height,
            "blur": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode(),
            "takenAt": date,
            "original": path.name,
        }
        added += 1
        print(f"added  {key}  {path.name}")
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\n{added} new, {len(manifest)} total -> {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
