import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K8 Automation Solutions',
  description: 'Enterprise-grade workflow automation powered by n8n and AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
