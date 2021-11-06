import React from "react";
import { Icon as AtlantisIcon } from "@jobber/components/Icon";
import classname from "classnames";
import GitHubIcon from "./github.svg";
import LinkedinIcon from "./linkedin.svg";
import TwitterIcon from "./twitter.svg";
import styles from "./Icon.module.css";

interface IconProps {
  name: "github" | "linkedin" | "twitter" | "email";
  color?: "base" | "inverted";
}

export function Icon({ name, color = "base" }: IconProps) {
  const icon = classname(styles.icon, styles[`color-${color}`]);

  return (
    <div className={icon}>
      <InternalIcon name={name} />
    </div>
  );
}

export function InternalIcon({ name }: IconProps) {
  switch (name) {
    case "github": {
      return <GitHubIcon />;
    }
    case "linkedin": {
      return <LinkedinIcon />;
    }
    case "twitter": {
      return <TwitterIcon />;
    }
    case "email": {
      return <AtlantisIcon name="email" size="large" />;
    }
    default: {
      return <></>;
    }
  }
}
