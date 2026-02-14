"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reasons", label: "Reasons" },
  { href: "/memory", label: "Memories" },
  { href: "/proposal", label: "Proposal" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-pink-400/30">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="text-romantic" />
          <span className="text-white font-bold text-xl font-headline">
            Eternal Valentine
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors",
                pathname === link.href && "bg-romantic text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
