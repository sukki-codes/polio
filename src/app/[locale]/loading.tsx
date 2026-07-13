import styles from './loading.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <div aria-label="Loading" className={styles.dots} role="status">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </main>
  );
}
