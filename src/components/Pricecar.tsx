import { Pricesel } from "../constant";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Pricecar = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className=" mx-5">
      <h2 className=" text-2xl font-bold my-4 ">Select by Price</h2>
      <div className=" mx-5 justify-evenly">
        <Carousel responsive={responsive}>
          {Pricesel.map((price) => (
            <div className=" w-full mx-5 mr-[-10px] my-4">
              <div className="btn h-[72px] w-24 p-4 rounded-xl">
              <Link to={`price/${price.price}`} >
                
                  <span className=" my-2"> Under </span> 
                  
                <br /><div className="badge badge-secondary mt-1 p-[12px]">₹ {price.price}</div>
              </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Pricecar;
