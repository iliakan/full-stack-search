
export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: Math.floor(rating) }).map((_, index) => (
        <i className="fa fa-star hotel-star" key={index}></i>
      ))}
      {(rating) % 1 === 0.5 && (
        <i className="fa fa-star-half-o hotel-star"></i>
      )}
    </div>
  )
}