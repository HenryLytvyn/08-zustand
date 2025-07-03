import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from './Home.module.css';

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
      <body>
        <TanStackProvider>
          <Header />
          <main className={css.main}>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
