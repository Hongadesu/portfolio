import { useCursorContext } from './useCursorContext';
import styles from './cursor.module.css';

export function Cursor() {
  const { pointer, enabled } = useCursorContext();

  if (!enabled) return null;

  return (
    <div ref={pointer} className={styles.pointer}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
