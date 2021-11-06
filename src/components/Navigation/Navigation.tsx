import React from "react";
import { Button } from "@jobber/components/Button";
import styles from "./Navigation.module.css";
import { Link } from "@/components/Link";

export function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.heading}>
        <Link href="/">
          <Button label="joelw.dev" type="tertiary" variation="subtle" />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/blog">
          <Button label="Blog" type="tertiary" variation="subtle" />
        </Link>
        <Link href="/about">
          <Button label="About" type="tertiary" variation="subtle" />
        </Link>
        <Link href="/contact">
          <Button label="Contact" type="tertiary" variation="subtle" />
        </Link>
      </div>
    </nav>
  );
}
