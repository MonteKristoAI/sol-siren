import { redirect } from "next/navigation";

// The Journal is hidden for now (placeholder entries Erin doesn't want public).
// Send any /blog visit back to the homepage until real editorial is ready.
export default function BlogIndex() {
  redirect("/");
}
