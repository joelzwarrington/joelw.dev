import React from "react";
import { Button } from "@jobber/components/Button";
import styles from "./Footer.module.css";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <Link href="https://github.com/joelzwarrington" external>
          <Icon name="github" />
        </Link>
        <Link href="https://www.linkedin.com/in/joelwarrington" external>
          <Icon name="linkedin" />
        </Link>
        <Link href="mailto:joelwarrington@gmail.com" external>
          <Icon name="email" />
        </Link>
      </div>
      <Link href="https://github.com/joelzwarrington/joelw.dev" external>
        <Button
          label="built with ♥"
          variation="subtle"
          type="tertiary"
          size="small"
        />
      </Link>
    </footer>
  );
}
