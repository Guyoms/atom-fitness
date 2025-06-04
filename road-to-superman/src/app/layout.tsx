import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getUserProfile } from '@/actions/profile.actions';
import { getUser } from '@/actions/auth.actions';
import { Providers } from "./providers";
import PwaRegister from "./pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Road to Superman",
  description: "Suivez votre progression vers votre objectif fitness",
  manifest: "/manifest.json",
  themeColor: "#1d273a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Road to Superman",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const profile = user != null ? await getUserProfile(user) : null;

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <PwaRegister />
        <Providers initialUser={user} initialProfile={profile}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
