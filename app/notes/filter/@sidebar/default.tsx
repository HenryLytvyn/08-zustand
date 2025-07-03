import css from './SidebarNotes.module.css';
import TagsItems from '@/components/TagsItems/TagsItems';

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <TagsItems></TagsItems>
    </ul>
  );
}
