import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fahadansari.online"),
  title: {
    default: "Fahad Bin Ansari | Software Engineer & AI Developer",
    template: "%s | Fahad Bin Ansari",
  },
  description: "Official portfolio of Fahad Bin Ansari, a Full Stack Developer and AI Developer specializing in modern web applications and scalable solutions.",
  keywords: [
    "Fahad Bin Ansari",
    "Fahad Ansari",
    "Fahad Bin Ansari Portfolio",
    "Fahad's Portfolio",
    "Fahad Portfolio",
    "Full Stack Developer Fahad Bin Ansari",
    "AI Developer Fahad Bin Ansari",
    "Software Engineer Fahad Bin Ansari",
    "Web Developer",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Fahad Bin Ansari" }],
  creator: "Fahad Bin Ansari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fahadansari.online",
    title: "Fahad Bin Ansari | Software Engineer",
    description: "Official portfolio of Fahad Bin Ansari, a Full Stack Developer and AI Developer.",
    siteName: "Fahad Bin Ansari Portfolio",
    images: [
      {
        url: "/mypic.png",
        width: 1200,
        height: 630,
        alt: "Fahad Bin Ansari - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahad Bin Ansari | Software Engineer",
    description: "Official portfolio of Fahad Bin Ansari, a Full Stack Developer and AI Developer.",
    images: ["/mypic.png"],
  },
  alternates: {
    canonical: "https://fahadansari.online",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://fahadansari.online/#person",
      "name": "Fahad Bin Ansari",
      "url": "https://fahadansari.online",
      "image": "https://fahadansari.online/mypic.png",
      "jobTitle": ["Software Engineer", "Full Stack Developer", "AI Developer"],
      "sameAs": [
        "https://github.com/fahadansari2004",
        "https://www.linkedin.com/in/fahad-bin-ansari/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://fahadansari.online/#website",
      "url": "https://fahadansari.online",
      "name": "Fahad Bin Ansari Portfolio",
      "publisher": {
        "@id": "https://fahadansari.online/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white/30">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
