import { resizeImage } from "./imageResize";

// Resize each image and upload it on its own request, so we never exceed the
// serverless request-size limit (which was causing "Request Entity Too Large"
// when several photos went up at once). Returns Shopify resourceUrls.
export async function uploadImages(files: File[], onProgress?: (msg: string) => void): Promise<string[]> {
  const imgs = files.filter((f) => f.type.startsWith("image/"));
  const urls: string[] = [];
  for (let i = 0; i < imgs.length; i++) {
    onProgress?.(`Uploading ${i + 1} of ${imgs.length}…`);
    const resized = await resizeImage(imgs[i]);
    const fd = new FormData();
    fd.append("files", resized);
    const up = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!up.ok) {
      let err = `Upload failed (${up.status}). Please try again.`;
      if (up.status === 413) err = "That photo is too large. Try a smaller version.";
      else {
        try {
          const j = await up.json();
          if (j?.error) err = j.error;
        } catch {
          /* non-JSON error body */
        }
      }
      throw new Error(err);
    }
    const uj = await up.json();
    urls.push(...(uj.urls || []));
  }
  return urls;
}
