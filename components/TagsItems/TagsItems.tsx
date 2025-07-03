'use client';

import { tagsList } from '@/constants/constants';
import css from '../TagsMenu/TagsMenu.module.css';
import Link from 'next/link';

type Props = {
  tagsMenuClose?: () => void;
};

export default function TagsItems({ tagsMenuClose }: Props) {
  return (
    <>
      {tagsList.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag.split(' ')[0]}`}
            className={css.menuLink}
            onClick={tagsMenuClose}
          >
            {tag}
          </Link>
        </li>
      ))}
    </>
  );
}
