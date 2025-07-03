'use client';

import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { format, parseISO } from 'date-fns';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  let label = '';
  let formattedDate = 'Date not available';

  if (note?.updatedAt || note?.createdAt) {
    const backendData = note?.updatedAt || note?.createdAt;
    label = note?.updatedAt ? 'Updated at: ' : 'Created at: ';
    const date = parseISO(backendData);
    formattedDate = format(date, "HH:mm, do 'of' MMMM yyyy");
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
          <button
            // onClick={() => {
            //   setIsModalOpen(true);
            // }}
            className={css.editBtn}
          >
            Edit note
          </button>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>
          {label}
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
