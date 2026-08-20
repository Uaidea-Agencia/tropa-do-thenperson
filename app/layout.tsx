import type { Metadata, Viewport } from "next";
import { anton, montserrat, poppins } from "./fonts";
import { site } from "@/content/site";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.candidateName} — ${site.role}`,
  description: site.metaDescription,
  openGraph: {
    title: `${site.candidateName} — ${site.role}`,
    description: site.metaDescription,
    locale: "pt_BR",
    type: "website",
    images: ["/images/institucionais/institucional-02.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06214F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${montserrat.variable} ${poppins.variable}`}>
      <body className="font-body antialiased" suppressHydrationWarning>
        <CustomCursor>{children}</CustomCursor>
      </body>
    </html>
  );
}
