import React, { PropsWithChildren } from "react";
import { Banner } from "@jobber/components/Banner";
import { ButtonProps } from "@jobber/components/Button";
import styles from "./ErrorBanner.module.css";

interface ErrorBanner {
  action?: ButtonProps;
  dismissible?: boolean;
}

export function ErrorBanner({
  children,
  dismissible = false,
  action,
}: PropsWithChildren<ErrorBanner>) {
  return (
    <div className={styles.banner} style={{ backgroundColor: "#da3633" }}>
      <Banner type="error" dismissible={dismissible} primaryAction={action}>
        {children}
      </Banner>
    </div>
  );
}
