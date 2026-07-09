// Downscale/compress an image in the browser before upload so it stays well
// under the serverless request-size limit and loads fast on the site. Keeps
// plenty of quality (2400px longest side). Falls back to the original file if
// the browser can't decode it (e.g. some HEIC), so uploads still attempt.
export async function resizeImage(file: File, maxDim = 2400, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  const { width, height } = bitmap;
  const longest = Math.max(width, height);
  // Already small enough and light: keep as-is.
  if (longest <= maxDim && file.size < 3 * 1024 * 1024) {
    bitmap.close?.();
    return file;
  }

  const scale = Math.min(1, maxDim / longest);
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

  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
  if (!blob || blob.size >= file.size) return file;

  const name = file.name.replace(/\.(png|webp|heic|heif|bmp|tiff?)$/i, ".jpg");
  return new File([blob], name.match(/\.jpe?g$/i) ? name : `${name}.jpg`, { type: "image/jpeg" });
}
