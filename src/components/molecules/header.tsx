import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-40 h-40",
      userButtonPopoverCard: "bg-primary/10",
    },
  };

  return (
    <div className="h-14 px-4 sticky top-0 py-2 bg-background border-b shadow-md flex justify-between">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          id="searchBar"
          placeholder="Search..."
          className="w-xs rounded-md border border-border bg-background pl-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>
      <div className="border-none">
        <SignedIn>
          <div className="border-6 border-foreground/20 flex items-center  rounded-full">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
