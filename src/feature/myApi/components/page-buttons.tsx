"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PageButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (!params.get("page")) {
      const newParams = new URLSearchParams(params.toString());
      newParams.set("page", "1");
      router.replace(pathname + "?" + newParams.toString());
    }
  }, []);

  const currentPage = Number(params.get("page")) || 1;

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());

    if (page >= 1) {
      newParams.set("page", String(page));
    } else {
      newParams.delete("page");
    }

    router.push(pathname + "?" + newParams.toString());
  };

  return (
    <div id="footer" className="flex justify-end">
      <div className="flex justify-between items-center gap-6">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </Button>
        <span className="text-sm">Page {currentPage}</span>
        <Button variant="outline" onClick={() => goToPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
