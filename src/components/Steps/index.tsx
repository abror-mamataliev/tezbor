import styles from "./index.module.sass";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Steps() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div className={styles.carSelection}>
      <div className={styles.carSelection__steps}>
        <div className={styles.carSelection__active}>
          {t("Avtomobil tanlash")}
        </div>
        <span
          className={
            pathname === "/choose-place"
              ? styles.carSelection__spanActive
              : styles.carSelection__spanNotActive &&
                  pathname === "/confirmation"
                ? styles.carSelection__spanActive
                : styles.carSelection__spanNotActive
          }
        ></span>
        <div
          className={
            pathname === "/choose-place"
              ? styles.carSelection__active
              : styles.carSelection__notActive && pathname === "/confirmation"
                ? styles.carSelection__active
                : styles.carSelection__notActive
          }
        >
          {t("Joy tanlash")}
        </div>
        <span
          className={
            pathname === "/confirmation"
              ? styles.carSelection__spanActive
              : styles.carSelection__spanNotActive
          }
        ></span>
        <div
          className={
            pathname === "/confirmation"
              ? styles.carSelection__active
              : styles.carSelection__notActive
          }
        >
          {t("Tasdiqlash")}
        </div>
      </div>
    </div>
  );
}
