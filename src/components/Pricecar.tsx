import { Pricesel } from "../constant";
import { Link } from "react-router-dom";

const Pricecar = () => {

  return (
    <div className=" bg-slate-300 h-full w-full rounded-lg p-1 lg:p-3 md:p-2">
     
    <div className=" justify-center ml-3 mr-4 flex flex-row ">
    {Pricesel.map((price)=>(
    <div className="h-[150px] w-[150px] items-center  rounded-full bg-[#e7f89d] lg:mx-5 lg:p-3 md:scale-50 scale-50 lg:scale-100 md:p-1 md:mx-1 p-1 mx-1">
      <Link to={`price/${price.price}`}>
      <div className="text-3xl text-center"><span className=" text-red-300">under</span><br />₹{price.price}</div>
      </Link>
    </div>
    ))}
    </div></div>
  )
}

export default Pricecar