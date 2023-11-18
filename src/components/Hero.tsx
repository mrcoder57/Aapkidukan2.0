import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Carouselimg from "./Carouselimg";
import Pricecar from "./Pricecar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
    <div className="card grid grid-cols-2 bg-base-100 shadow-xl max-h-[400px] m-10 w-[350px]  lg:w-[350px] lg:h-[250px] h-[200px] transition ease-in-out duration-300 hover:scale-105">
      <figure className="object-cover lg:h-[250px] h-[200px] w-full rounded-lg Propss-center  ">
        <img className="object-cover rounded-lg h-[200px]" src={props.image} alt={props.title} />
      </figure>
      <div className="card-body  ">
        <h2 className="card-title">{props.title.slice(0, 40)}</h2>
        <h2>{props.description.slice(0,25)}</h2>
        <div className="card-actions justify-end">
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="h-full w-full">
      <Carouselimg></Carouselimg>
      <div className="overflow-x-auto">
        <Pricecar></Pricecar>
      </div>
      
      <div className=" ">
      <h1 className=" ml-6 mt-4 text-2xl font-bold">Hot Deals  </h1>
      <Carousel responsive={responsive}>
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
        )}</Carousel>
      </div>
      
    </div>
  );
};

export default Hero;
