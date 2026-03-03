interface StarRatingProps {
  value: number
}

export function StarRating({ value }: StarRatingProps) {
  const full = Math.round(value)
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
      <span className="text-gray-500 ml-1 text-xs">({value}/5)</span>
    </span>
  )
}
