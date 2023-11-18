import { Pricesel } from "../constant";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Pricecar = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <div className=" bg-slate-300 rounded-xl mx-4 mr-4">
     
    <div className=" ">
      <Carousel responsive={responsive}>
    {Pricesel.map((price)=>(
    <div className="h-[150px] w-[150px] Propss-center  rounded-full bg-[#e7f89d] ml-4">
      <Link to={`price/${price.price}`}>
      <div className="text-3xl text-center"><span className=" text-red-300">under</span><br />₹{price.price}</div>
      </Link>
    </div>
    ))}
    </Carousel>
    </div></div>
  )
}

export default Pricecar