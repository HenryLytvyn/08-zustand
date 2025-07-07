'use client';

import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
// import { useLayoutEffect } from 'react';

interface NoteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: NoteModalProps) {
  // useLayoutEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function handleBackdrop(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
