import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];
  const response = await fetchNotes(1, '', tag);

  return <NotesClient initialData={response} tag={tag} />;
}
