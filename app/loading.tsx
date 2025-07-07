'use client';

import Modal from '@/components/Modal/Modal';

export default function Loading() {
  return (
    <Modal onClose={() => {}}>
      <p>Loading, please wait...</p>
    </Modal>
  );
}
