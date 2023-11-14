
import { Carimg } from '../constant'

const Carousel = () => {
  return (
   <div className='flex flex-col mt-3'>
  <div className="carousel w-full max-h-[700px] ">
    {Carimg.map(car =>
      <div id={`car${car.id}`} key={car.id} className="carousel-item w-full h-[50%]">
        <img src={car.src} className="w-full h-[500px] object-cover" alt={`Car ${car.id}`} />
      </div> 
    )}
  </div>
  <div className="w-full py-2 flex justify-center space-x-2 text-center">
    {Carimg.map(car =>
      <a key={car.id} href={`#car${car.id}`} className="btn btn-xs">
        {car.id}
      </a>
    )}
  </div>
</div>

  )
}

export default Carousel