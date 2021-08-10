import styles from './page-not-found.module.css';

export function PageNotFound() {
  return (
    <div className={styles.root}>
      <p className="text_type_main-large mt-0">404 page not found...</p>
    </div>
  );
}
