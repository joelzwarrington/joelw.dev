import React, { PropsWithChildren } from "react";
import NextLink from "next/link";
import styles from "./Link.module.css";

interface LinkProps {
  href: string;
  external?: boolean;
}
export function Link({
  href,
  external = false,
  children,
}: PropsWithChildren<LinkProps>) {
  return (
    <div className={styles.link}>
      {!external ? (
        <NextLink href={href}>
          <a>{children}</a>
        </NextLink>
      ) : (
        <a href={href}>{children}</a>
      )}
    </div>
  );
}
