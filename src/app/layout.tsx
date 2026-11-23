import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MedSpa Booking Engine | Ads That Converts",
    template: "%s | Ads That Converts",
  },
  description:
    "See how treatment-specific ads, faster follow-up and calendar booking can fill your MedSpa's consultation schedule. Request a free local growth audit.",
  openGraph: {
    title: "The MedSpa Booking Engine",
    description:
      "A closer look at how patients find your clinic, book a consultation and show up.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
