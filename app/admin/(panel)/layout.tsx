import { redirect } from "next/navigation";
import pkg from "../../../package.json";
import { sql, ensureSchema, dbReady } from "../../lib/db";
import { isLoggedIn } from "../../lib/auth";
import AdminShell from "../admin-shell";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isLoggedIn())) redirect("/admin/login");

  // Alt çubuktaki rozet için: yanıtlanmamış mesaj sayısı
  let unread = 0;
  if (dbReady) {
    try {
      await ensureSchema();
      const [c] = (await sql`SELECT COUNT(*)::int AS n FROM contacts WHERE status = 'new'`) as unknown as { n: number }[];
      unread = c?.n ?? 0;
    } catch {
      unread = 0;
    }
  }
  return (
    <AdminShell version={pkg.version} nextVersion={pkg.dependencies?.next?.replace(/^[\^~]/, "")} unread={unread}>
      {children}
    </AdminShell>
  );
}
