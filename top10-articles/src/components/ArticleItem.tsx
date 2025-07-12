type Entry = {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
};

function ArticleItem(props: { article: Entry }) {
  const { article } = props;

  return (
    <li>
      <div>
        <a href={article?.url}>{article?.title}</a>
      </div>
      <div>
        <span>
          {article?.score} by {article?.by}
        </span>
      </div>
    </li>
  );
}

export default ArticleItem;
