import React, { useEffect, useState } from 'react'

// Types et interfaces
type Card = {
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
};

const MemoryGame = () => {
    const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

    const [cards, setCards] = useState<Card[]>([]); // Toutes les cartes du jeu
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]); // Cartes actuellement retournées
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // Paires trouvées
    const [moves, setMoves] = useState(0); // Nombre de coups joués

    //Initialisation du jeu
    const initializeGame = () => {
        // Dupliquer les emojis pour créer les paires
        const shuffledCards = [...cardEmojis, ...cardEmojis]
            // Mélanger aléatoirement
            .sort(() => Math.random() - 0.5)
            // Transformer en objets Card
            .map((emoji, index) => ({
                id: index,
                content: emoji,
                isFlipped: false,
                isMatched: false
            }));
        setCards(shuffledCards);
    };

    const handleCardClick = (index: number) => {
        // Vérifications de sécurité
        if (flippedIndices.length === 2) return; // Déjà 2 cartes retournées
        if (flippedIndices.includes(index)) return; // Carte déjà retournée
        if (matchedPairs.includes(cards[index].content)) return; // Carte déjà matchée

        // Logique de jeu
        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        // Vérification des paires
        if (newFlippedIndices.length === 2) {
            setMoves(m => m + 1);
            
            const [firstIndex, secondIndex] = newFlippedIndices;
            if (cards[firstIndex].content === cards[secondIndex].content) {
              setMatchedPairs([...matchedPairs, cards[firstIndex].content]);
              setFlippedIndices([]);
            } else {
              setTimeout(() => {
                console.log("LAMAR ::: 111");
                
                setFlippedIndices([]);
              }, 1000);
            }
          }
    };

    const resetGame = () => {
        setFlippedIndices([]);
        setMatchedPairs([]);
        setMoves(0);
        initializeGame();
    };

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        console.log("VANBRAUN ::: 111 ::: ", flippedIndices);
        console.log("VANBRAUN ::: 222 ::: ", matchedPairs);
    }, [flippedIndices]);


    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <div className="mb-4 flex justify-between items-center">
                <div className="text-lg font-bold">Coups: {moves}</div>
                <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Réinitialiser
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(index)}
                        className={`h-24 w-24 flex items-center justify-center text-4xl cursor-pointer rounded-lg transition-all duration-300 transform
              ${(flippedIndices.includes(index) || matchedPairs.includes(card.content))
                                ? 'bg-white shadow-lg'
                                : 'bg-blue-500'
                            }
              ${matchedPairs.includes(card.content) ? 'opacity-50' : ''}
              hover:scale-105
            `}
                    >
                        {(flippedIndices.includes(index) || matchedPairs.includes(card.content))
                            ? card.content
                            : '?'
                        }
                    </div>
                ))}
            </div>

            {matchedPairs.length === cardEmojis.length && (
                <div className="mt-4 text-center text-xl font-bold text-green-500">
                    Félicitations ! Vous avez gagné en {moves} coups !
                </div>
            )}
        </div>
    )
}

export default MemoryGame