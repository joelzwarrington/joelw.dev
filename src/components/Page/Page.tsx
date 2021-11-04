import React, { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import styles from "./Page.module.css";

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
