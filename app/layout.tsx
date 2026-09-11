import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Үндэсний статистикийн хороо",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
