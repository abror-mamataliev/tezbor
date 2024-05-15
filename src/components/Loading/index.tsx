import styles from "./index.module.sass";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__threeBody}>
        <div className={styles.loading__threeBody__dot}></div>
        <div className={styles.loading__threeBody__dot}></div>
        <div className={styles.loading__threeBody__dot}></div>
      </div>
    </div>
  );
}
