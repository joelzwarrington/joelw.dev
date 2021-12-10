import React, { useMemo } from "react";
import { Card as InternalCard } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Avatar } from "@jobber/components/Avatar";
import { formatDistance } from "date-fns";
import { Heading } from "@jobber/components/Heading";
import { Emphasis } from "@jobber/components/Emphasis";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Card.module.css";
import { Tags } from "./Tags";
import { Article } from "../BlogTypes";

interface CardProps extends Article {
  visible: boolean;
}

export function Card({
  id,
  image,
  author: { name, avatar },
  title,
  url,
  tags,
  publishedAt,
  readingTimeMinutes,
  visible,
}: CardProps) {
  const daysSince = useMemo(
    () =>
      formatDistance(new Date(publishedAt), new Date(), { addSuffix: true }),
    [publishedAt],
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className={styles.container}>
            <InternalCard url={url} external>
              {image && (
                <img
                  src={image}
                  alt={`Article ${title} cover image`}
                  className={styles.cover}
                />
              )}
              <div
                className={styles.content}
                {...(image || {
                  style: { paddingTop: "var(--space-base)" },
                })}
              >
                <Avatar imageUrl={avatar} name={name} size="large" />
                <Content spacing="small">
                  <div>
                    <Text>
                      <Emphasis variation="bold">{name}</Emphasis>
                    </Text>
                    <Text>
                      <Emphasis variation="italic">{daysSince}</Emphasis>
                    </Text>
                  </div>
                  <Content spacing="small">
                    <Heading level={2}>{title}</Heading>
                    <div className={styles.extra}>
                      <Tags tags={tags} />
                      <Text>{readingTimeMinutes} min read</Text>
                    </div>
                  </Content>
                </Content>
              </div>
            </InternalCard>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
