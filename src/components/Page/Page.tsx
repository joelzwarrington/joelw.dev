import React, { ReactNode } from "react";
import styles from "./Page.module.css";

export function Page({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.page}>{children}</div>
    </div>
  );
}
