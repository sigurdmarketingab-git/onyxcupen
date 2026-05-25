import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getInstallningar } from "@/lib/sanity";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const inst = await getInstallningar();
  const anmalningsOppen = inst?.anmalningsOppen ?? false;
  const anmalningsUrl = inst?.anmalningsUrl ?? null;

  return (
    <>
      <Navbar anmalningsOppen={anmalningsOppen} anmalningsUrl={anmalningsUrl} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
