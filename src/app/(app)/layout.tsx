import SideBar from "@/components/molecules/side-bar";
import Header from "@/components/molecules/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* SideBar Content  */}
      <div className="sticky top-0 h-full">
        <SideBar />
      </div>

      {/* Main Content  */}
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
