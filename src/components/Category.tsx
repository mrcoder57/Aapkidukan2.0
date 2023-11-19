import { categories } from "../constant"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const Category = () => {
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
          items: 3,
        },
      };
  return (
    <div className=" lg:mx-5 mx-0 overflow-x-hidden">
    <h2 className=" text-2xl font-bold my-4 ">Select by Category</h2>
    <div className=" mx-5 justify-evenly space-x-2 sm:space-x-4 ">
      <Carousel responsive={responsive}>
        {categories.map((cate) => (
          <div className=" w-full mx-5 mr-0 my-4 items-center">
            <div className="btn h-[90px] w-28 p-1 px-auto rounded-xl">
            <Link to={`/category${cate.name}`} >
              
                <span className="">  <img src={cate.icon} alt="icon" className=" h-10 w-10 mx-auto sepia-100 saturate-500 brightness-500 bg-slate-100 border border-slate-100 p-1 rounded-full transition ease-in-out"  /> </span> 
                
              <br /><div className="  p-[12px] mt-[-10px]">{cate.name}</div>
            </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>
  )
}

export default Category