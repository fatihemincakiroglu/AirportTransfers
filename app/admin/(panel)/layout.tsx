import { redirect } from "next/navigation";
import pkg from "../../../package.json";
import { isLoggedIn } from "../../lib/auth";
import AdminShell from "../admin-shell";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  return (
    <AdminShell version={pkg.version} nextVersion={pkg.dependencies?.next?.replace(/^[\^~]/, "")}>
      {children}
    </AdminShell>
  );
}
