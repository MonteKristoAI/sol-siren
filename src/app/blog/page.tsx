import { redirect } from "next/navigation";

// The Journal is hidden for now (placeholder entries Erin doesn't want public).
// Send any /blog visit back to the homepage until real editorial is ready.
// force-dynamic so the redirect runs at request time and emits a proper 307;
// statically prerendering an unconditional redirect renders an error page instead.
export const dynamic = "force-dynamic";

export default function BlogIndex() {
  redirect("/");
}
