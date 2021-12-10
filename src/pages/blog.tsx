/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import Head from "next/head";
import { Page } from "@/components/Page";
import { Article, Blog } from "@/features/Blog";

export default function BlogPage({ articles }: { articles: Article[] }) {
  return (
    <Page>
      <Head>
        <title>Blog | Joel Warrington</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Blog articles={articles} />
    </Page>
  );
}

interface DevToArticle {
  id: number;
  cover_image?: string;
  title: string;
  url: string;
  tag_list: string[];
  published_at: string;
  reading_time_minutes: number;
  user: {
    name: string;
    username: string;
    profile_image_90: string;
  };
}

export async function getStaticProps() {
  const data: DevToArticle[] = await fetch(
    "https://dev.to/api/articles?username=joelzwarrington",
  ).then((response) => response.json());

  const articles: Article[] = data.map(
    ({
      id,
      cover_image,
      title,
      url,
      tag_list,
      published_at,
      reading_time_minutes,
      user: { name, username, profile_image_90 },
    }) => ({
      id,
      image: cover_image,
      title,
      url,
      tags: tag_list,
      publishedAt: published_at,
      readingTimeMinutes: reading_time_minutes,
      author: { name, username, avatar: profile_image_90 },
    }),
  );

  return {
    props: {
      articles,
    },
    revalidate: 1800, // 30 minutes
  };
}
