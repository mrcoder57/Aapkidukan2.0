
import { Link } from "react-router-dom";
import del from "../assets/delete-svgrepo-com (1).svg";
import axios from "axios";
import Cookies from "js-cookie";
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
  
const delteProduct= async()=>{
  const token = Cookies.get("jwtToken");

    if (!token) {
      console.log("You need to Login");
      return;
    }

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
try {
  await axios.delete(`https://aapkidukaan-backend.up.railway.app/products/${props.id}`,config);
  console.log(`Product with ID ${props.id} deleted successfully`);
  window.location.href="/profile"
} catch (error) {
  if (axios.isAxiosError(error) && error.response) {
    // Axios error with a response
    console.error("Product creation failed", error.response.data);
  } else {
    // Other errors
    console.error("Product creation failed with unknown error", error);
  }
}
}

  return (
   
      
    <div className="card grid grid-cols-3 bg-base-100 shadow-xl max-h-[400px] m-10 w-[300px]  lg:w-[350px] lg:h-[250px] h-[200px] transition ease-in-out duration-300 hover:scale-105 mt-0">
      
      <figure className="object-cover lg:h-[250px] h-[200px] w-full rounded-lg Propss-center  ">
        <img className="object-cover rounded-lg h-[200px]" src={props.image} alt={props.title} />
      </figure>
      
      <div className="card-body w-48 mt-[-25px]  ">
        <h2 className="card-title w-[100px]">{props.title.slice(0, 40)}</h2>
        <h2>{props.description.slice(0,25)}</h2>
        <div className="card-actions ">
          <Link to={`/${props.id}`}>
            <button className="border border-slate-800 p-2 justify-end rounded-lg mx-2 transition ease-in-out duration-300 hover:scale-105">
             ₹ {props.price}
            </button>
          </Link>
        </div>
      </div>
      <div className=" align-text-top w-6 h-8 ml-5 ">
      <button className="rounded-full h-4 w-full ml-10"><img src={del} alt="delete" className="w-12 h-10 rounded-full" onClick={delteProduct}/></button>
      </div>
    </div>
    
  )
}

export default ActiveSlider