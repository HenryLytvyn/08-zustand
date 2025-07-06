import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    "The page you're looking for doesn't exist or has been moved. Try going back to the homepage or explore other notes.",
  openGraph: {
    title: 'Page not found',
    description:
      "The page you're looking for doesn't exist or has been moved. Try going back to the homepage or explore other notes.",
    images: [
      {
        url: '/page-note-found.jpeg',
        width: 1200,
        height: 630,
        alt: 'page not found',
      },
    ],
    siteName: 'NoteHub',
    url: 'https://08-zustand-zeta.vercel.app/not-found',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
