import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zidaan Haneef — Artist",
  description: "Official website of Zidaan Haneef — singer, performer and artist.",
  keywords: ["Zidaan Haneef", "Zidaan", "singer", "artist", "musician", "performer"],
  openGraph: {
    title: "Zidaan Haneef",
    description: "sometimes i sing....",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}