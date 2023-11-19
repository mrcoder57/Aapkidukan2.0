import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Carouselimg from "./Carouselimg";
import Pricecar from "./Pricecar";

import Category from "./Category";
interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

const Productcard = (props: ProductProps) => {
  return (
    <div className="card grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 bg-base-100 shadow-xl max-h-[400px] m-10 w-[180px]  lg:w-[350px] lg:h-[250px] h-[380px] transition ease-in-out duration-300 hover:scale-105">
      <figure className="object-cover lg:h-[250px] h-[200px] w-[180px] rounded-lg Propss-center  ">
        <img className="object-contain rounded-lg h-[200px]" src={props.image} alt={props.title} />
      </figure>
      <div className="card-body w-44 md:w-44 lg:w-44 mt-[-25px] ">
        <h2 className="card-title">{props.title.slice(0, 40)}</h2>
        <h2>{props.description.slice(0,25)}</h2>
        <div className="card-actions ">
          <Link to={`${props.id}`}>
            <button className="border border-slate-800 p-2 justify-end rounded-lg mx-2 transition ease-in-out duration-300 hover:scale-105">
             ₹ {props.price}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [data, setData] = useState([]);
  const getApi = async () => {
    const res = await axios.get(
      "https://aapkidukaan-backend.up.railway.app/products"
    );
    setData(res.data);
    // console.log(res.data)
  };
  useEffect(() => {
    getApi();
  }, []);
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 668 },
  //     items: 2
  //   },
  //   mobile: {
  //     breakpoint: { max: 668, min: 0 },
  //     items: 1
  //   }
  // };
  return (
    <div className="h-full w-full">
      <Carouselimg></Carouselimg>
      <div className="overflow-x-auto">
        <Pricecar></Pricecar>
        <Category/>
      </div>
      
      <div className="overflow-x-hidden overflow-y-hidden justify-center items-center ">
      <h1 className=" ml-6 mt-4 text-2xl font-bold">Hot Deals  </h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-center lg:gap-6 md:gap-4 gap-1 ml-[-20px] w-full md:ml-3 md:mr-6 lg:ml-3 my-4 mr-3">
      
        {data.map(
          ({ id, title, price, description, category, image, rating }) => (
            <Productcard
              id={id}
              image={image}
              title={title}
              description={description}
              price={price}
              category={category}
              rating={rating}
            />
          )
        )}
         </div>
      </div>
      
    </div>
  );
};

export default Hero;
