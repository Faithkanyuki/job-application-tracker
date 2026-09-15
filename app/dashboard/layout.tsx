"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface SessionUser {
  name: string;
  email: string;
  image?: string | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/signin");
        return;
      }
      setUser(data.user);
    });
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/signin");
  }

  const navItems = [
    { href: "/dashboard", label: "All applications" },
    { href: "/dashboard/new", label: "Add a job" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-hairline bg-paper hidden md:flex md:flex-col">
        <div className="px-6 py-5 border-b border-hairline">
          <span className="font-serif text-lg text-ink">Tracker</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "block px-3 py-2 rounded-md text-sm " +
                  (active
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-hairline")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b border-hairline flex items-center justify-end px-4 md:px-6 relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 text-sm text-ink"
          >
            <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-xs font-medium">
              {user ? user.name.charAt(0).toUpperCase() : "?"}
            </span>
            <span className="hidden sm:inline">{user?.name}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-4 md:right-6 top-14 w-48 bg-white border border-hairline rounded-md shadow-sm py-1 z-10">
              <div className="px-4 py-2 text-xs text-stone border-b border-hairline">
                {user?.email}
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-ink hover:bg-hairline"
              >
                Sign out
              </button>
            </div>
          )}
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}