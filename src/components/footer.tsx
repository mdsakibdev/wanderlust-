import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "My Profile", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socialLinks = [
  { label: "X", icon: <XIcon /> },
  { label: "LinkedIn", icon: <LinkedinIcon /> },
  { label: "Instagram", icon: <InstagramIcon /> },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 py-14 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-heading text-5xl font-bold text-white md:text-6xl">
            Wanderlast
          </p>
          <p className="mt-4 text-sm text-white/60">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-4 max-w-xs">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-10 w-full rounded-md bg-neutral-800 pl-3 pr-10 text-sm text-white outline-none placeholder:text-white/50 focus:ring-1 focus:ring-white/30"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <p>786 901 1622</p>
              <p>info@wanderlast.com</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href="#"
                aria-label={social.label}
                className="text-white/70 transition-colors hover:text-white"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
