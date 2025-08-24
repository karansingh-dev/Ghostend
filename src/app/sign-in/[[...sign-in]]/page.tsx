import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="mt-20">
        <SignIn />
      </div>
    </div>
  );
}
