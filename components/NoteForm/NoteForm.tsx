'use client';

import { useId, useState } from 'react';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { FormSchemaValidate } from '../../YupSchemes/FormSchemaValidate';
import { useRouter } from 'next/navigation';
import { NewNote } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { ValidationError } from 'yup';

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<
    Partial<Record<'title' | 'content' | 'tag', string>>
  >({});

  const addNote = useMutation({
    // mutationFn: async (note: NewNote) => createNote(note),
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
      });
      queryClient.refetchQueries({
        queryKey: ['allNotes'],
      });
      router.back();
      clearDraft();
    },
  });

  async function handleSubmit(formData: FormData) {
    try {
      const note: NewNote = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        tag: formData.get('tag') as NewNote['tag'],
      };

      await FormSchemaValidate.validate(note, { abortEarly: false });
      setErrors({});

      addNote.mutate(note);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const formattedErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  }

  function handleCancel() {
    router.back();
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
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
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {(errors.title && <div className={css.error}>{errors.title}</div>) ||
          '\u00A0'}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {(errors.content && (
          <div className={css.error}>{errors.content}</div>
        )) ||
          '\u00A0'}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          {(errors.tag && <div className={css.error}>{errors.tag}</div>) ||
            '\u00A0'}
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
