import type { Metadata } from "next";
import { Footer, Header } from "@/components/brand";
import TerritoryFlow from "@/components/territory-flow";
export const metadata: Metadata = {
  title: "Check your MedSpa territory",
  robots: { index: false },
};
export default function Territory() {
  return (
    <>
      <Header booking />
      <main id="main" tabIndex={-1} className="flow-wrap">
        <TerritoryFlow />
      </main>
      <Footer />
    </>
  );
}
