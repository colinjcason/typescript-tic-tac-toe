'use client'
import { useEffect, useState } from "react"
import Square from "./Square"
type Player = 'X' | 'O' | 'BOTH' | null

function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  }, [squares]);

  return (
    <div>
      {!winner && <p className="text-2xl m-2 text-center">{currentPlayer}, it&#39;s your turn</p>}
      {winner && winner !== 'BOTH' && <p className="text-2xl m-2 text-center">{winner} has won!</p>}
      {winner && winner === 'BOTH' && <p className="text-2xl m-2 text-center">Tie Game!</p>}

      <div className="grid grid-cols-3">
        {Array(9).fill(null).map((_, i) => {
          return <Square
            key={i}
            onClick={() => setSquareValue(i)}
            value={squares[i]}
            winner={winner}

          />
        })}
      </div>
      <button className="text-xl p-4 w-full" onClick={reset}>Reset</button>
    </div>
  )
}

export default Board