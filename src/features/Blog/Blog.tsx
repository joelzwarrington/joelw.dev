import React, { useState } from "react";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { useBlogData } from "./useBlogData";
import styles from "./Blog.module.css";
import { Cards } from "./Cards";
import { Article } from "./BlogTypes";
import { TagSelector } from "./TagSelector";

interface BlogProps {
  articles: Article[];
}

export function Blog({ articles: allArticles }: BlogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { articles, tags } = useBlogData({
    allArticles,
    selectedTags,
  });

  return (
    <Content spacing="large">
      <div className={styles.content}>
        <Heading level={1}>Blog</Heading>
        <TagSelector
          selected={selectedTags}
          tags={tags}
          onChange={setSelectedTags}
        />
      </div>
      {allArticles.length > 0 ? (
        <Cards allArticles={allArticles} visibleArticles={articles} />
      ) : (
        <Text>There aren&apos;t any blog posts yet, come back in a bit!</Text>
      )}
    </Content>
  );
}
