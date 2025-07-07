import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Web app to create and manage your own notes by categories',
  description:
    'Create, manage, and organize your notes by categories with a clean and intuitive web app.',
  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Web app to create and manage your own notes by categories',
    description:
      'Create, manage, and organize your notes by categories with a clean and intuitive web app.',
    url: 'https://08-zustand-zeta.vercel.app/',
    images: [
      {
        url: '/notehub-og-meta',
        width: 1200,
        height: 630,
        alt: 'NoteHub styling card',
      },
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub styling card',
      },
    ],
    type: 'website',
    siteName: 'NoteHub',
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

type ChildrenType = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({
  children,
  modal,
}: Readonly<ChildrenType>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main className={css.main}>{children}</main>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
