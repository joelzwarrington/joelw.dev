import React, { ReactNode } from "react";
import styles from "./Page.module.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export function Page({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div>
          <Navigation />
          <div className={styles.content}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
