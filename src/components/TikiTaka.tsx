import { useState } from "react"

const TikiTaka = () => {

    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
    const [isNext, setIsNext] = useState(false)


    const winningCheck = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]


    const checkWinner = (table: (string | null)[]) => {
        for (let [a, b, c] of winningCheck) {
            if (table[a] && table[a] === table[b] && table[a] === table[c]) {
                return table[a]
            }
        }
    }


    const winner = checkWinner(board)

    const handleClick = (id: number) => {
        if (board[id] || winner) return

        const newBoard = [...board]
        newBoard[id] = isNext ? "O" : "X"

        setBoard(newBoard)
        setIsNext(!isNext)

        // setBoard(prevBoard => prevBoard.map((cell, index) => id === index ? cell = "D" : cell))
    }


    const handleRestartGame = () => {
        setBoard(Array(9).fill(null))
        setIsNext(false)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">

            <div className="grid grid-cols-3 mb-3">
                {board.map((cell, index) => (
                    <div key={index} onClick={() => { handleClick(index) }} className="w-16 h-16 border border-solid border-black p-3 flex justify-center items-center cursor-pointer" >
                        {cell}
                    </div>
                ))}
            </div>

            {/* <div className="text-lg mb-3"> {` ${winner ? `The winner is: ${winner}` : 'Draw match'}`} </div> */}
            <div className="text-lg mb-3"> {` ${!board.includes(null) && !winner ? `Draw match` : winner ? `The winner is: ${winner}` : 'No winner yet'}`} </div>

            <button className="bg-cyan-400 px-4 py-2 cursor-pointer" onClick={handleRestartGame}  >Restart</button>
        </div>
    )
}

export default TikiTaka