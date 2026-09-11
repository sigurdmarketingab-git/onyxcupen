export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getInstallningar, getAllCupinfo } from "@/lib/sanity";
import { isAnmalningOppen } from "@/lib/registration";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [inst, cupinfoItems] = await Promise.all([
    getInstallningar(),
    getAllCupinfo(),
  ]);
  const anmalningsOppen = isAnmalningOppen(inst?.anmalningStangerDatum);
  const anmalningsUrl = inst?.anmalningsUrl ?? null;

  return (
    <>
      <ScrollToTop />
      <Navbar
        anmalningsOppen={anmalningsOppen}
        anmalningsUrl={anmalningsUrl}
        cupinfoItems={cupinfoItems ?? []}
      />
      <main className="flex-1">{children}</main>
      <Footer cupinfoItems={cupinfoItems ?? []} />
    </>
  );
}
