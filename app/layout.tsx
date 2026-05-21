import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import KonamiCode from "@/components/KonamiCode";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhavishya Tyagi | Portfolio",
  description: "Portfolio of Bhavishya Tyagi, Cyber Security Professional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jetbrainsMono.className}>
        <KonamiCode />
        {children}
        {/* Console Secret Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            console.log("%c========================================", "color: #10b981; font-weight: bold;");
            console.log("%c    UNAUTHORIZED ACCESS DETECTED", "color: #ef4444; font-weight: bold; font-size: 16px;");
            console.log("%c========================================", "color: #10b981; font-weight: bold;");
            console.log("%cJust kidding. Welcome to the console, fellow dev/hacker.", "color: #10b981; font-style: italic;");
            console.log("%cYou clearly know your way around. Let's connect: hanutyagi9@gmail.com", "color: #3b82f6;");
            console.log("%cTry typing the Konami Code anywhere on the site...", "color: #64748b; font-size: 10px;");
          `
        }} />
      </body>
    </html>
  );
}
