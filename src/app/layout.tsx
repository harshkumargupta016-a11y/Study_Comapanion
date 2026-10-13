import { ReactNode } from 'react';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata = {
  title: 'AI Study Companion | IIT Mandi Track D',
  description: 'Source-grounded personalized tutoring and adaptive learning system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
