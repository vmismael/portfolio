import type { Metadata } from "next";
import { ThemeProvider } from "@/hooks/useTheme";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitor Montemor Ismael — Portfolio",
  description:
    "Software engineering student with background in healthcare and business administration. Based in São Paulo, BR.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark" defaultAccent="terracotta" defaultDensity="comfortable">
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
