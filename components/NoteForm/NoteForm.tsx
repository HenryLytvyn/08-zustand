'use client';

import { useId } from 'react';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
// import { FormSchema } from '../../YupSchemes/FormSchema';
import { useRouter } from 'next/navigation';
import { NewNote } from '@/types/note';

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  // let note: NewNote = {
  //   title: '',
  //   content: '',
  //   tag: 'Todo',
  // }

  const addNote = useMutation({
    // mutationFn: (newNote: Note) => createNote(newNote),
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
        exact: false,
      });
      handleCancel();
    },
  });

  function handleSubmit(formData: FormData) {
    const note: NewNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NewNote['tag'],
    };
    addNote.mutate(note);
    // actions.resetForm();
  }

  function handleCancel() {
    router.push('/notes/filter/All');
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select}>
          <option value="Todo" defaultChecked>
            Todo
          </option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={addNote.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
