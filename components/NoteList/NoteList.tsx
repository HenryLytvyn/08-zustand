// Внесіть зміну у розмітку компонента NoteList.
'use client';

import { Note } from '@/types/note';
import css from './NoteList.module.css';
import NoteItem from '../NoteItem/NoteItem';
import { deleteNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  items: Note[];
};

export default function NoteList({ items }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
      });
    },
  });

  return (
    <ul className={css.list}>
      {items
        // .filter(note => note.id)
        .map(el => (
          <NoteItem
            key={el.id}
            item={el}
            removeItem={removeItem}
            isPending={isPending}
          />
        ))}
    </ul>
  );
}
