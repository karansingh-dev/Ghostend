import { SignedIn, UserButton } from "@clerk/nextjs";
import BreadCrumb from "../atoms/bread-crumb";

export default function Header() {
  return (
    <div className="h-14 z-10 px-4 sticky top-0 py-2 bg-background border-b shadow-md flex justify-between">
      <BreadCrumb />
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
