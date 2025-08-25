"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchBar({ initialValue = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("q")) {
      router.replace(pathname);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(params.toString());
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    router.push("?" + newParams.toString());
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        id="searchBar"
        defaultValue={initialValue}
        onChange={handleChange}
        placeholder="Search..."
        className=" rounded-md border border-border bg-background pl-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
      />
    </div>
  );
}
