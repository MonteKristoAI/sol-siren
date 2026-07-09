// Downscale + convert every uploaded image to WebP in the browser before it
// goes to Shopify (smaller files, faster site, well under the request limit).
// Keeps plenty of quality (2400px longest side). Falls back to JPEG if the
// browser can't encode WebP, and to the original file if it can't decode the
// image at all (e.g. some HEIC).
export async function resizeImage(file: File, maxDim = 2400, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // browser can't decode it, upload as-is
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, maxDim / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close?.();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  let blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));
  let ext = "webp";
  let mime = "image/webp";
  if (!blob) {
    // older browser without webp encode support
    blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
    ext = "jpg";
    mime = "image/jpeg";
  }
  if (!blob) return file;

  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${base}.${ext}`, { type: mime });
}
