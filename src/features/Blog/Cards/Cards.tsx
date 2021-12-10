import React from "react";
import { Card } from "./Card";
import { Article } from "../BlogTypes";

interface CardsProps {
  allArticles: Article[];
  visibleArticles: Article[];
}
export function Cards({ allArticles, visibleArticles }: CardsProps) {
  return (
    <>
      {allArticles.map((article) => (
        <Card
          key={article.id}
          {...article}
          visible={visibleArticles.includes(article)}
        />
      ))}
    </>
  );
}
