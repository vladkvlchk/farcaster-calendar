"use client";

import { sdk } from "@farcaster/frame-sdk";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { useEffect } from "react";

const config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="fc:frame"
          content='{"version":"next","imageUrl":"https://farcaster-calendar.vercel.app/preview.jpeg","aspectRatio":"3:2","button":{"title":"Book a meet","action":{"type":"launch_frame","name":"Booked!","url":"https://farcaster-calendar.vercel.app","splashImageUrl":"https://farcaster-calendar.vercel.app/logo.png","splashBackgroundColor":"#000"}}}'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
      >
        <AuthKitProvider config={config}>{children}</AuthKitProvider>
      </body>
    </html>
  );
}
