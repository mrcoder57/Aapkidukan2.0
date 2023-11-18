

import { Link } from "react-router-dom";
interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}
const ActiveSlider = (props:ProductProps) => {
  
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
  )
}

export default ActiveSlider