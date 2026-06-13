import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WellnessProvider } from "@/hooks/useWellnessEngine";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "WellDone - Academic Wellness",
  description: "A mental wellness companion for students facing extreme academic exam stress.",
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming to maintain mobile app feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <WellnessProvider>
            {children}
          </WellnessProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
