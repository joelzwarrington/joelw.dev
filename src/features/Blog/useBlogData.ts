import { useMemo } from "react";
import { Article } from "./BlogTypes";

interface UseBlogDataArgs {
  allArticles: Article[];
  selectedTags: string[];
}

export function useBlogData({
  allArticles,
  selectedTags,
}: UseBlogDataArgs): { articles: Article[]; tags: string[] } {
  const tags = useMemo(() => {
    const mappedTags = new Array<string>()
      .concat(...allArticles.map((article) => article.tags))
      .reduce(
        (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
        new Map<string, number>(),
      );
    const commonTags = [...mappedTags.entries()]
      .slice(0, 5)
      .map((tag) => tag[0]);
    return commonTags;
  }, [allArticles]);

  const articles = useMemo(
    () =>
      allArticles.filter((article) =>
        selectedTags.length > 0
          ? article.tags.some((tag) => selectedTags?.includes(tag))
          : allArticles,
      ),
    [allArticles, selectedTags],
  );

  return {
    articles,
    tags,
  };
}
