import React from "react";
import { Avatar } from "@jobber/components/Avatar";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";
import styles from "./Author.module.css";

interface AuthorProps {
  image: string;
  name: string;
}

export function Author({ image, name }: AuthorProps) {
  return (
    <div className={styles.author}>
      <Avatar imageUrl={image} name={name} />

      <Text>
        <Emphasis variation="bold">{name}</Emphasis>
      </Text>
    </div>
  );
}
