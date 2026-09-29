import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "NSO statcate intro dashboards",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
