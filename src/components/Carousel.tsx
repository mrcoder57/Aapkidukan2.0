
import { Carimg } from '../constant'

const Carousel = () => {
  return (
    <div className=' flex flex-col mt-3'>
    <div className="carousel w-full max-h-[700px]">
        {Carimg.map(car =>
  <div id={`car${car.id}`} className="carousel-item w-full h-[50%]">
  <img src={car.src} className="w-full " height={440}/>
</div> 
        )}
</div>
<div className=" w-full py-2 justify-center text-center">
  <a href="#car1" className="btn btn-xs">1</a> 
  <a href="#car2" className="btn btn-xs">2</a> 
  <a href="#car3" className="btn btn-xs">3</a> 
  <a href="#car4" className="btn btn-xs">4</a>
  <a href="#car5" className="btn btn-xs">5</a>
</div>
</div>
  )
}

export default Carousel