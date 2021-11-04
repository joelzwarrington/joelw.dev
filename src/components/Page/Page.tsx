import React, { ReactNode } from "react";
import styles from "./Page.module.css";
import { Navigation } from "@/components/Navigation";

export function Page({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <Navigation />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
