import { useState } from "react"

const NewTicTacToe = () => {

    const [board, setBoard] = useState<(String | null)[]>(Array(9).fill(null))
    const [isNext, setIsNext] = useState<Boolean>(true)

    const winningMatches = [
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

        for (let [a, b, c] of winningMatches) {
            if (table[a] && table[a] === table[b] && table[a] === table[c]) {
                return table[a]
            }
        }

        return null
    }

    const winner = checkWinner(board)

    const handleClick = (id: number) => {
        if (board[id] || winner) return

        const newBoard = [...board]
        isNext ? newBoard[id] = "X" : newBoard[id] = "O"
        setIsNext(!isNext)
        setBoard(newBoard)
    }


    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setIsNext(true)
    }


    return (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-y-2.5">
            <div className="grid grid-cols-3 gap-3">
                {
                    board.map((cell, index) => (
                        <button className="w-16 h-16 border border-solid" onClick={() => handleClick(index)}>
                            {cell}
                        </button>
                    ))
                }
            </div>

            <div> {!board.includes(null) ? "Draw match" : winner ? `The winner is: ${winner}` : "No winner yet"} </div>

            <button onClick={resetGame} className="bg-blue-400 p-2 cursor-pointer" >Restart</button>
        </div>
    )
}

export default NewTicTacToe