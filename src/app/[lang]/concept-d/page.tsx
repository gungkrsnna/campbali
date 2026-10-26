import { permanentRedirect } from "next/navigation";
import { getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";

// Keep links from the design review pointing to the selected home page.
export default async function LegacyConceptPage() {
  permanentRedirect(localePath(await getLocale()));
}
