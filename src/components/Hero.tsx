import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Pricecar from "./Pricecar";
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
    <div className="card grid grid-cols-2 bg-base-100 shadow-xl max-h-[400px] m-10 w-84 h-[300px] transition ease-in-out duration-300 hover:scale-105">
      <figure className="object-cover h-full w-full rounded-lg Propss-center">
        <img className="object-cover rounded-lg" src={props.image} alt={props.title} />
      </figure>
      <div className="card-body  ">
        <h2 className="card-title">{props.title.slice(0, 40)}</h2>
        <h2>{props.description.slice(0, 100)}</h2>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            <span>₹{props.price * 10}</span>
          </div>
          <Link to={`${props.id}`}>
            <button className="border border-slate-800 p-2 justify-end rounded-lg mx-2 transition ease-in-out duration-300 hover:scale-105">
              Buy Now
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
  return (
    <div className="h-full w-full">
      <Carousel></Carousel>
      <div className="overflow-x-auto">
        <Pricecar></Pricecar>
      </div>
      <div className=" h-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default Hero;
