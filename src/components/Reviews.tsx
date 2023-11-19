interface Review {
    id: number; // @id @default(autoincrement())
    text: string;
    rating: number;
    image?: string;  
    username?: string;
 }
  

const Reviews = (review:Review) => {
    
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto my-4 grid grid-cols-2 w-80">
      <img
        src={review.image}
        alt={`${review.username}'s avatar`}
        className="w-full h-full object-cover object-center"
      />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-xl">{review.text.slice(0,10)}</div>
          <div className="text-gray-600 ">{review.rating} / 5</div>
        </div>
        <div className="font-semibold mb-2">{review.username}</div>
        <p className="text-gray-700 text-base">{review.text}</p>
      </div>
    </div>
  )
}

export default Reviews