'use client';

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './NoteForm.module.css';
import type { NewNote } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { FormSchema } from '../../YupSchemes/FormSchema';

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const addNote = useMutation({
    // mutationFn: (newNote: Note) => createNote(newNote),
    mutationFn: createNote,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
      });
    },
  });

  function handleSubmit(values: NewNote, actions: FormikHelpers<NewNote>) {
    addNote.mutate(values);
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
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
      </Form>
    </Formik>
  );
}
