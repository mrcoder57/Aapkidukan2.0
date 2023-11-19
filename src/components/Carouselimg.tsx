
import { Carimg } from '../constant'

const Carouselimg = () => {
  return (
   <div className='flex flex-col mt-3'>
  <div className="carousel mx-5">
    {Carimg.map(car =>
      <div id={`car${car.id}`} key={car.id} className="carousel-Props carousel-item w-full lg:h-[400px] h-[180px] md:h-[250px] rounded-xl">
        <img src={car.src} className="w-full  object-cover rounded-xl" alt={`Car ${car.id}`} />
      </div> 
    )}
  </div>
  <div className="carousel-item w-full py-2 lg:flex justify-center space-x-2 text-center hidden md:flex">
    {Carimg.map(car =>
      <a key={car.id} href={`#car${car.id}`} className="btn btn-xs rounded-full text-sm text-semibold">
        {car.id}
      </a>
    )}
  </div>
</div>

  )
}

export default Carouselimg