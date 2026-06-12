import type { Metadata } from "next";
import "./globals.css";
import KonamiCode from "@/components/KonamiCode";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Bhavishya Tyagi | Investigation Portal",
  description: "Threat Intelligence Analyst dashboard portfolio of Bhavishya Tyagi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <KonamiCode />
        {children}
        <Analytics />
        {/* Console Secret Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            console.log("%c========================================", "color: #00d9ff; font-weight: bold;");
            console.log("%c    INVESTIGATION PORTAL CONSOLE", "color: #ff006e; font-weight: bold; font-size: 16px;");
            console.log("%c========================================", "color: #00d9ff; font-weight: bold;");
            console.log("%cBACKDOOR ACCESSED? Not yet. Try: pentest(), decrypt(), exploit(), patch().", "color: #00d9ff; font-style: italic;");
            console.log("%cCommit breadcrumbs: 0xBHA-001 0xRED-5CAN 0xFUD-MAL", "color: #8338ec;");
            console.log("%cJoke warning: running exploit() may void your imaginary warranty.", "color: #f59e0b;");
            window.__investigationCommand = function(command) {
              window.dispatchEvent(new CustomEvent("investigation:console", { detail: command }));
              console.log("[PORTAL] command received:", command);
            };
            window.pentest = function(){ window.__investigationCommand("pentest"); return "PEN TEST MODE requested"; };
            window.decrypt = function(){ window.__investigationCommand("decrypt"); return "Decrypt routine queued"; };
            window.exploit = function(){ window.__investigationCommand("exploit"); return "Exploit simulation only — stay ethical"; };
            window.patch = function(){ window.__investigationCommand("patch"); return "Patch challenge completed"; };
          `
        }} />
      </body>
    </html>
  );
}
