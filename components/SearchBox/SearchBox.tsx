'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      value={value}
      onChange={e => onSearch(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
