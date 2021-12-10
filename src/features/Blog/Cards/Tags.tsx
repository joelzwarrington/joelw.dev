import { InlineLabel } from "@jobber/components/InlineLabel";
import React from "react";
import styles from "./Tags.module.css";

interface TagsProps {
  tags?: string[];
}

export function Tags({ tags = [] }: TagsProps) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <InlineLabel key={tag}>{tag}</InlineLabel>
      ))}
    </div>
  );
}
