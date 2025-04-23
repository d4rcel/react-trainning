import { useEffect, useState } from "react";


type Card = {
    id: number;
    content: String;

}

const Memory = () => {
    const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const [cards, setCard] = useState<Card[]>([])
    const [flippedIndices, setFlippedIndices] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<String[]>([])


    const initGame = () => {
        const newCard = [...cardEmojis, ...cardEmojis].
            sort(() => Math.random() - 0.5).
            map((el, index) => (
                {
                    id: index,
                    content: el
                }
            ))

        setCard(newCard)
    }

    useEffect(() => {
        initGame()
    }, [])


    useEffect(() => {
        console.log("MAMAMA ::: 111", flippedIndices);
        
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices
            if (cards[firstIndex].content === cards[secondIndex].content) {
                console.log("MAMAMA ::: 222");
                setMatchedPairs([...matchedPairs, cards[firstIndex].content])
                setFlippedIndices([])
            } else {
                console.log("MAMAMA ::: 333");
                setTimeout(() => {
                    setFlippedIndices([])
                }, 1000)
            }

        }
    }, [flippedIndices])


    const handleCardClick = (index: number) => {

        if (flippedIndices.length === 2 || matchedPairs.length === cardEmojis.length) return
        setFlippedIndices([...flippedIndices, index])

    }

    return (
        <div className="grid grid-cols-4 gap-y-6">
            {cards.map((card, index) => (
                <div onClick={() => handleCardClick(index)} className={`shadow-lg w-24 h-24 rounded-2xl flex justify-center items-center cursor-pointer ${flippedIndices.includes(index) || matchedPairs.includes(card.content) ? 'bg-white' : 'bg-blue-400'}`} >
                    {`${flippedIndices.includes(index) || matchedPairs.includes(card.content) ? card.content : '?'}`}
                </div>
            ))}
        </div>
    )
}


export default Memory