import { redirect } from "next/navigation";

// Journal entries are hidden for now. Redirect individual posts home too,
// so old/shared links don't surface placeholder content.
export default function BlogPostPage() {
  redirect("/");
}
