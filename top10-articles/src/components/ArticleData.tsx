import { useEffect, useState } from "react";
import { useApi } from "../utils/useApi";
import ArticleItem from "./ArticleItem";

type Entry = {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
};

function ArticleData() {
  const {
    data: ids,
    loading,
    error,
    refetch: fetchIds,
  } = useApi<number[]>({
    url: "https://hacker-news.firebaseio.com/v0/topstories.json",
    method: "get",
    manual: true,
  });

  const [articles, setArticles] = useState<Entry[] | null>(null);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(true);
  const [articlesError, setArticlesError] = useState<Error | null>(null);

  useEffect(() => {
    fetchIds();
  }, []);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      return;
    }

    const fetchArticles = async () => {
      setLoadingArticles(true);
      try {
        const top10 = ids?.slice(0, 10);
        const responses = await Promise.all(
          top10.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (res) => res.json() as Promise<Entry>
            )
          )
        );
        setArticles(responses);
      } catch (err) {
        setArticlesError(err as Error);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, [ids]);

  if (loading || loadingArticles) return <div>loading</div>;
  if (error || articlesError)
    return <div>Error: {(error || articlesError)?.message}</div>;

  return (
    <ul>
      {articles?.map((entry) => (
        <ArticleItem key={entry.id} article={entry} />
      ))}
    </ul>
  );
}

export default ArticleData;
