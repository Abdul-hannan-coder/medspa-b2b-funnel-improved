import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/brand";
export const metadata: Metadata = {
  title: "Your growth call",
  robots: { index: false },
};
export default function Confirmed() {
  return (
    <>
      <Header booking />
      <main id="main" className="flow-wrap">
        <section className="booking-panel">
          <p className="eyebrow">Before your call</p>
          <h1>Your growth call is booked.</h1>
          <p>
            Your confirmation email has the meeting details. Here’s how to make
            the most of the 30 minutes.
          </p>
          <ol className="prep-list">
            <li>
              <b>Accept the calendar invite.</b> Keep the meeting link handy.
            </li>
            <li>
              <b>Join from a laptop.</b> We’ll be sharing your local results and
              website on screen.
            </li>
            <li>
              <b>Bring two priority treatments.</b> Include the devices and
              treatment rooms you want to fill first.
            </li>
          </ol>
          <Link className="text-link" href="/">
            Back to the booking engine
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
