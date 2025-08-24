import CreateApiForm from "@/feature/createApi/components/create-api-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-10">
      {/* header section  */}
      <div id="heading" className="space-y-2">
        <h2 className="font-semibold text-2xl">Create API</h2>
        <div>
          <span className="text-md text-foreground/50">
            Design and generate your ghost API endpoint
          </span>
        </div>
        <CreateApiForm />
      </div>
    </div>
  );
}
