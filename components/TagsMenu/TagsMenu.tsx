'use client';

import css from './TagsMenu.module.css';
import { useEffect, useRef, useState } from 'react';
import TagsItems from '../TagsItems/TagsItems';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function CloseMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        CloseMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <TagsItems tagsMenuClose={CloseMenu} />
        </ul>
      )}
    </div>
  );
}
