import { redirect } from "next/navigation";

/** /projects has no index of its own — the homepage section is the index. */
export default function ProjectsIndex() {
  redirect("/#projects");
}
