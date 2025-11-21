import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Vibe - Connect, Engage, Thrive",
  description: "A vibrant campus community application connecting students, events, and resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
