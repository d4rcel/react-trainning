import { useState } from 'react'

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isNext, setIsNext] = useState(true)

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWinner = (table: (String | null)[]) => {

        for (let [a, b, c] of winningCombinations) {
            if (table[a] && table[a] === table[b] && table[a] === table[c]) {
                return table[a]
            }
        }

        return null
    }

    const winner = checkWinner(board)
    const handleClick = (id: number) => {
        if (board[id] || winner) return
        else {
            const newBoard = [...board]
            newBoard[id] = isNext ? "X" : "O"
            setBoard(newBoard)
            setIsNext(!isNext)
        }

    }

    return (
        <>
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-y-2'>
                <div className='grid grid-cols-3 gap-2 '>
                    {board.map((cell, index) => (
                        <button onClick={() => handleClick(index)} key={index} className='border border-solid border-black h-16 w-16'>
                            {cell}
                        </button>
                    ))}
                </div>

                <div>
                    <div> {`${!board.includes(null) ? "Draw match" : winner !== null ? `The winner is :${winner}` : "No winner yet"}`} </div>
                </div>

                <button className='bg-amber-600 p-1 rounded-md cursor-pointer' onClick={() => {
                    setBoard(Array(9).fill(null))
                    setIsNext(true)
                }}>
                    Restart
                </button>
            </div>

        </>
    )
}

export default TicTacToe
