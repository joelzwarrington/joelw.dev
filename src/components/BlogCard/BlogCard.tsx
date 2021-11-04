import React from "react";
import Link from "next/link";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { InlineLabel } from "@jobber/components/InlineLabel";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  slug: string;
  title: string;
  introduction: string;
  date: string;
  length: string;
  categories: string[];
}

export function BlogCard({
  slug,
  title,
  introduction,
  date,
  length,
  categories,
}: BlogCardProps) {
  return (
    <Link href={slug}>
      <Card url={""}>
        <Content spacing="small">
          <Heading level={2}>{title}</Heading>
          <Text>{introduction}</Text>
          <div className={styles.footer}>
            <Text variation="subdued">{date}</Text>
            <Text>·</Text>
            <Text variation="subdued">{length}</Text>
            <Text>·</Text>
            <div className={styles.categories}>
              {categories.map((category) => (
                <InlineLabel key={category}>{category}</InlineLabel>
              ))}
            </div>
          </div>
        </Content>
      </Card>
    </Link>
  );
}
