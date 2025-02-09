import React, { useEffect, useState } from 'react'

type Card = {
    id: number;
    content: String;

}

const NewMemoryGame = () => {
    const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

    const [cards, setCard] = useState<Card[]>([])
    const [flippedIndices, setFlippedIndices] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<String[]>([])

    const initGame = () => {
        const neoCard = [...cardEmojis, ...cardEmojis].
            sort(() => Math.random() - 0.5).
            map((emoji, index) => {
                return {
                    id: index,
                    content: emoji
                }
            })

        setCard(neoCard)
    }

    useEffect(() => {
        initGame()
    }, [])


    const handleCardClick = (index: number) => {
        if (flippedIndices.length === 2 || matchedPairs.length === cardEmojis.length) return

        setFlippedIndices([...flippedIndices, index])


    }


    useEffect(() => {
        if (flippedIndices.length === 2) {
            console.log("WIOO ::: 000");
            const [firstIndex, secondIndex] = flippedIndices
            console.log("WIOO ::: 111");
            if (cards[firstIndex].content === cards[secondIndex].content) {
                console.log("WIOO ::: 222");

                setMatchedPairs([...matchedPairs, cards[firstIndex].content])
                setFlippedIndices([])
            } else {
                console.log("WIOO ::: 333");
                setTimeout(() => {
                    setFlippedIndices([])
                }, 1000)
            }
        }
        console.log("INDEXFLIPPED ::: 111", flippedIndices, flippedIndices.length);

    }, [flippedIndices])

    return (
        <div className='grid grid-cols-4 gap-y-2'>
            {cards.map((card, index) => (
                <div onClick={() => handleCardClick(index)}
                    className={`shadow w-24 h-24 flex justify-center items-center cursor-pointer ${flippedIndices.includes(index) || matchedPairs.includes(card.content) ? "bg-white" : "bg-blue-600"}
                        ${matchedPairs.includes(card.content) ? "opacity-50" : ""}`}
                > {`${flippedIndices.includes(index) || matchedPairs.includes(card.content) ? card.content : "?"}`}
                </div>
            ))}
        </div>
    )
}

export default NewMemoryGame