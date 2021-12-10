/* eslint-disable no-null/no-null */
import React from "react";
import { Chip, Chips } from "@jobber/components/Chips";
import styles from "./TagSelector.module.css";

interface TagSelectorProps {
  tags: string[];
  selected: string[];
  onChange(value: string[]): void;
}

export function TagSelector({ tags, selected, onChange }: TagSelectorProps) {
  // @jobber component `Chips` causes issues with server rendering
  if (typeof window == "undefined") return null;

  return (
    <div className={styles.container}>
      <Chips type="multiselect" selected={selected} onChange={onTagChange}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} value={tag} />
        ))}
      </Chips>
    </div>
  );

  function onTagChange(value: string[]) {
    onChange(value);
  }
}
