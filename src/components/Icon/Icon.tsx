import React from "react";
import classname from "classnames";
import GitHubIcon from "./github.svg";
import LinkedinIcon from "./linkedin.svg";
import TwitterIcon from "./twitter.svg";
import styles from "./Icon.module.css";

interface IconProps {
  name: "github" | "linkedin" | "twitter";
  size?: "small" | "base" | "large";
  color?: "base" | "inverted";
  button?: boolean;
}

export function Icon({
  name,
  size = "base",
  color = "base",
  button = false,
}: IconProps) {
  const icon = classname(
    styles.icon,
    styles[`color-${color}`],
    styles[`size-${size}`],
  );

  const Wrapper = button ? "button" : React.Fragment;
  return (
    <div className={icon}>
      <Wrapper>
        <InternalIcon name={name} />
      </Wrapper>
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
    default: {
      return <></>;
    }
  }
}
