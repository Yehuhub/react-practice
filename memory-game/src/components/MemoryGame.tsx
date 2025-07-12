import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import _ from "lodash";

interface Card {
  id: number;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGame(props: { images: string[] }) {
  const [currentlySelected, setCurrentlySelected] = useState<number[]>([]);

  const { images } = props;
  const duplicated: string[] = [];
  images.forEach((image) => duplicated.push(image, image));

  const shuffled = _.shuffle(duplicated);

  const [cards, setCards] = useState<Card[]>(
    shuffled.map((image, index) => ({
      id: index,
      url: image,
      isFlipped: false,
      isMatched: false,
    }))
  );

  const handleClickOnImage = (cardId: number): void => {
    const newSelection =
      currentlySelected.length < 2 ? [...currentlySelected, cardId] : [cardId];

    setCurrentlySelected(newSelection);

    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isFlipped: newSelection.includes(card.id) || card.id === cardId,
      }))
    );
  };

  useEffect(() => {
    if (currentlySelected.length === 2) {
      const firstCard = cards.find((c) => c.id === currentlySelected[0]);
      const secondCard = cards.find((c) => c.id === currentlySelected[1]);

      if (!firstCard || !secondCard) return;

      if (firstCard.url === secondCard.url) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? {
                  ...card,
                  isMatched: true,
                }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
    }
  }, [currentlySelected]);

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Memory game</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            padding: "50px",
            gap: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
          }}
        >
          {cards.map((entry) => (
            <GameCard
              key={entry.id}
              card={entry}
              handleClickOnImage={handleClickOnImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
