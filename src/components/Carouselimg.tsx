import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { Carimg } from '../constant'

const Carouselimg = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
   <div className='flex flex-col mt-3 mx-8'>
 <Carousel responsive={responsive}  swipeable={true} autoPlay={true} autoPlaySpeed={2000} infinite={true} showDots={true} >
    {Carimg.map(car =>
      <div id={`car${car.id}`} key={car.id} className="carousel-Props carousel-item w-full lg:h-[400px] h-[180px] md:h-[250px] rounded-xl">
        <img src={car.src} className="w-full  object-cover rounded-xl" alt={`Car ${car.id}`} />
      </div> 
    )}
</Carousel>
  
</div>

  )
}

export default Carouselimg