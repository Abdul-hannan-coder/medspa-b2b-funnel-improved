import Link from "next/link";
import { Header, Footer } from "@/components/brand";
export default function NotFound() {
  return (
    <>
      <Header booking />
      <main id="main" className="flow-wrap">
        <section className="booking-panel">
          <p className="eyebrow">Page unavailable</p>
          <h1>We couldn’t find this page.</h1>
          <Link className="action" href="/">
            Return to the MedSpa booking engine
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
