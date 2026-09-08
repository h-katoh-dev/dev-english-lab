import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev English Lab",
  description: "Practical English training for IT engineers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
