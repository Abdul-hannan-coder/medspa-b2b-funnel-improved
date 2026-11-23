import StickyHeader from "./sticky-header";
import Image from "next/image";
import Link from "next/link";
import { landingCopy } from "@/lib/landing-copy";

export type IconName =
  | "pin"
  | "calendar"
  | "clock"
  | "play"
  | "close"
  | "check"
  | "chat"
  | "tag"
  | "target"
  | "plus"
  | "growth"
  | "people"
  | "layers"
  | "handshake"
  | "funnel"
  | "sheet"
  | "shield"
  | "back"
  | "expand";
const paths: Record<IconName, React.ReactNode> = {
  growth: (
    <>
      <path d="M3 3v17h18M7 14l5-5 4 2 5-7M16 4h5v5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20v-2a7 7 0 0 1 14 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 4 5" />
    </>
  ),
  layers: (
    <>
      <path d="m2 8 10-5 10 5-10 5zM2 12l10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  handshake: (
    <>
      <path d="m2 10 4-6 4 2 3-1 5 1 4 6-3 2M2 10l4 4m2-6 3-2m6 3-3-1-3 3c-1.6 1.2-3.4-.2-2.2-1.9L11 6m2 7 4 3m-7-1 4 3m-7-1 3 2c1.3 1 2.6.8 3.2-.6 1.6 1 3.1-.1 3.1-1.5 1.7.5 3-.9 2.2-2.3l-4-4" />
    </>
  ),
  funnel: (
    <>
      <rect x="3" y="3" width="18" height="5" rx="1.5" />
      <path d="m5 11 5 5v4l4 2v-6l5-5Z" />
    </>
  ),
  sheet: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 14h18M9 9v11" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M7.5 3v5M16.5 3v5M4 10h16m-11 5 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  play: <path d="m8 5 12 7-12 7z" strokeLinejoin="round" fill="currentColor" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  chat: (
    <>
      <path d="M20.5 14.5a2 2 0 0 1-2 2H10l-5.5 4v-4h-1V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
      <path d="M7.5 8h9m-9 4h5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 4h8l10 10-8 8L3 12Z" />
      <circle cx="7.5" cy="8" r="1.1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
    </>
  ),
  plus: <path d="M5 12h14M12 5v14" />,
  shield: (
    <>
      <path d="M12 2.5 20 6v5.5c0 4-3 7.5-8 10-5-2.5-8-6-8-10V6Z" />
      <path d="m8.5 12 2.2 2.3 4.8-5" />
    </>
  ),
  back: <path d="m14.5 5-7 7 7 7" />,
  expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />,
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
export function Logo() {
  return (
    <Link href="/" aria-label="Ads That Converts home" className="logo">
      <Image
        src="/media/wordmark.webp"
        alt="Ads That Converts"
        width={424}
        height={152}
        priority
      />
    </Link>
  );
}
export function BookLink({
  children = "Check my ZIP code",
  quiet = false,
}: {
  children?: React.ReactNode;
  quiet?: boolean;
}) {
  return (
    <Link
      className={quiet ? "action action-outline" : "action"}
      href="/territory"
    >
      <Icon name="pin" size={18} />
      {children}
    </Link>
  );
}
export function Header({ booking = false }: { booking?: boolean }) {
  const [label, message] = landingCopy.alert.split(": ");
  return (
    <>
      <aside className="territory-bar">
        <Icon name="pin" size={15} />
        <span className="territory-full">
          <b>{label}:</b> {message}
        </span>
        <span className="territory-short">{landingCopy.mobileAlert}</span>
      </aside>
      <StickyHeader>
        <div className="container header-inner">
          <Logo />
          {booking ? (
            <Link className="action action-outline back-home" href="/">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to overview</span>
            </Link>
          ) : (
            <BookLink quiet>
              <span className="btn-text-desktop">Check My Territory</span>
              <span className="btn-text-mobile">Check Territory</span>
            </BookLink>
          )}
        </div>
      </StickyHeader>
    </>
  );
}
export function Footer() {
  const [brand, address, phone, website, privacy, terms] = landingCopy.footer;
  return (
    <footer>
      <div className="container footer-inner">
        <Logo />
        <address className="footer-address">
          <strong>{brand}</strong>
          <span>{address}</span>
          <a href="tel:+14582701968">{phone}</a>
        </address>
        <div className="footer-links">
          <a href="https://adsthatconverts.com">{website}</a>
          <a href="https://adsthatconverts.com/privacy-policy">{privacy}</a>
          <a href="https://adsthatconverts.com/terms-and-conditions">{terms}</a>
        </div>
      </div>
    </footer>
  );
}
