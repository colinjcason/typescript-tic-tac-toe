type Player = 'X' | 'O' | 'BOTH' | null

const Square = ({
  value, onClick, winner
}: {
  winner: Player
  value: Player
  onClick: () => void
}) => {
  if (!value) {
    return (
      <button
        disabled={Boolean(winner)}
        onClick={onClick}
        className="w-24 h-24 text-xl font-bold text-gray-500 border border-white"
      />
    )
  }

  return (
    <button
      disabled
      className={
        `w-24 h-24 text-xl font-bold border border-white 
      ${value.toLocaleLowerCase() === 'o' ? 'text-green-500' : 'text-blue-600'}`
      }
    >
      {value}
    </button>
  )
}

export default Square