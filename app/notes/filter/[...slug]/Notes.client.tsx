// Notes.client.tsx

'use client';

import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { ResponseGetData } from '@/types/ResponseGetData';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
  initialData: ResponseGetData;
  tag: string;
};

export default function NotesClient({ initialData, tag }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isNewEditOpen, setIsNewEditOpen] = useState(false);
  const [debouncedQuery] = useDebounce(search, 1000);

  const allNotes = useQuery({
    queryKey: ['allNotes', debouncedQuery, page, tag],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData: page === 1 && search === '' ? initialData : undefined,
  });

  function handleSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />

        {allNotes.isSuccess && allNotes.data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={allNotes.data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsNewEditOpen(true);
          }}
        >
          Create note +
        </button>
      </div>
      {allNotes.isSuccess && allNotes.data.notes.length > 0 && (
        <NoteList items={allNotes.data.notes} />
      )}
      {isNewEditOpen && (
        <Modal onClose={() => setIsNewEditOpen(false)}>
          <NoteForm onClose={() => setIsNewEditOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
