"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);

  const formatLabel = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-foreground/80">
      <Link
        href="/dashboard"
        className="hover:text-foreground transition-colors"
      >
        Home
      </Link>

      {parts.map((part, index) => {
        const href = "/" + parts.slice(0, index + 1).join("/");

        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
            <Link
              href={href}
              className={`hover:text-foreground transition-colors ${
                index === parts.length - 1
                  ? "text-foreground font-semibold"
                  : ""
              }`}
            >
              {formatLabel(part)}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
