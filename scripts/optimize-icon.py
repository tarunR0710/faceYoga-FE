#!/usr/bin/env python3
"""Prepare a downloaded 3D icon PNG for use in public/problem/.

Iconscout-style 3D renders arrive as multi-megabyte 3000px squares with a lot
of empty transparent margin. Shipping one straight into public/ costs ~7 MB for
something displayed at 46px. This does three things, in order:

  1. Trims to the opaque content, so icons with different built-in margins end
     up optically the same size on the page instead of one looking shrunken.
  2. Re-pads by 6%, because these renders carry a soft contact shadow in the
     alpha channel that a tight crop would clip.
  3. Resizes to 320px — enough for a 46px slot at 3x with headroom.

Usage:  python3 scripts/optimize-icon.py ~/Downloads/scissors.png scissors
"""
import os
import sys
from PIL import Image

DEST_DIR = 'public/problem'
TARGET_PX = 384  # covers next/image's largest candidate (2x of width=144)
PAD_RATIO = 0.06


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 1

    src_path, name = sys.argv[1], sys.argv[2]
    src_path = os.path.expanduser(src_path)
    if not os.path.exists(src_path):
        print(f'not found: {src_path}')
        return 1

    img = Image.open(src_path).convert('RGBA')
    bbox = img.getbbox()
    if bbox is None:
        print(f'{src_path} is fully transparent')
        return 1

    core = img.crop(bbox)
    pad = int(max(core.size) * PAD_RATIO)
    canvas = Image.new('RGBA', (core.width + pad * 2, core.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(core, (pad, pad))

    # Square it off so every icon occupies its box identically.
    side = max(canvas.size)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    square.paste(canvas, ((side - canvas.width) // 2, (side - canvas.height) // 2))

    out_path = os.path.join(DEST_DIR, f'{name}.png')
    os.makedirs(DEST_DIR, exist_ok=True)
    square.resize((TARGET_PX, TARGET_PX), Image.LANCZOS).save(out_path, optimize=True)

    before = os.path.getsize(src_path) / 1024
    after = os.path.getsize(out_path) / 1024
    print(f'{name}: {before:,.0f} KB -> {after:,.0f} KB  ({out_path})')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
