import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Falcon 7 — Painel de Campanhas',
  description: 'Painel de campanhas de anúncios da Falcon Colégio & Curso.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
