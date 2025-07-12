interface Card {
  id: number;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function GameCard(props: {
  card: Card;
  handleClickOnImage: (cardId: number) => void;
}) {
  const { card } = props;
  const { handleClickOnImage } = props;
  return (
    <>
      {card.isFlipped || card.isMatched ? (
        <img
          src={card.url}
          style={{
            width: "130px",
            height: "130px",
          }}
        />
      ) : (
        <div
          style={{
            width: "130px",
            height: "130px",
            backgroundColor: "gray",
          }}
          onClick={() => {
            handleClickOnImage(card.id);
          }}
        ></div>
      )}
    </>
  );
}

export default GameCard;
