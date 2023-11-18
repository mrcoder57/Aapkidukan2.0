import avatar from "../assets/profile-avatar.svg";
import ActiveSlider from "./ActiveSlider";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import add from "../assets/add-block-svgrepo-com.svg"
import { Link } from "react-router-dom";

interface User {
  userid: number;
  email: string;
  username: string;
  password: string;
  role: string;
  orders: Order[];
  products: Product[];
  reviews: Review[];
}
interface Order {
  id: number; // @id @default(autoincrement())
  // ... other order-related fields
  userId: number; // Representing the id of the user
  productId: number; // Representing the id of the product
  price: number; // ... other order-related fields
  username?: string; // Optional username field
  user: User; // User relation
  product: Product;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

interface Review {
  id: number; // @id @default(autoincrement())
  text: string;
  rating: number;
  image?: string; // Optional image field
  // ... other review-related fields
  authorId: number; // Representing the id of the author
  productId: number; // Representing the id of the product
  username?: string; // Optional username field
  author: User; // User relation
  product: Product; // Product relation
}
const ProfilePage = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [addOpen,setAddOpen] = useState(false);
  const getApi = async () => {
    // Retrieve the JWT token from cookies

    const token = Cookies.get("jwtToken");
    // Check if the token is available
    if (!token) {
      console.log(" You need to Login");
      window.location.href = "/login";
    }
    // Set the Authorization header with the JWT token
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const res = await axios.get<User>(
        "https://aapkidukaan-backend.up.railway.app/user/profile",
        config
      );
      setData(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error: any) {
      // Log the error response for debugging
      console.error("Error Response:", error.response);

      // Handle errors
      console.error("Error:", error.message);
      setLoading(false);
      window.location.href='/login'
    }
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
const handleOpen=() => {
  setAddOpen(true);
  console.log(addOpen);
}
  if (loading || data === null) {
    return (
      <div className='justify-center text-center text-3xl mt-56'>
        <span className="loading loading-spinner text-success h-24 w-24"></span>
      </div>
    );
  }
  
  return (
    <div className=" w-screen-lg  ">
      {data && (
        <div className=" grid lg:grid-cols-2 gap-8 grid-cols-1 mt-4 ml-4">
          <img
            src={avatar}
            alt="your image"
            className="justify-center ml-6 h-32 w-32 rounded-full "
          />
          <div>
            <span className=" text-xl  font-semibold my-4">Name</span>
            <h2 className=" text-left text-[28px] font-bold mb-3" id="name">
              {data.username}
            </h2>
            <span className=" text-xl  font-semibold  my-3">Email</span>
            <h2 className=" text-left text-[28px] font-bold mb-3" id="name">
              {data.email}
            </h2>
          </div>
        </div>
      )}
      {/* Orders Carousel Selling  */}

      {/* Products Slider*/}
      <div className="h-[400px] w-full">
        
        <div className=" flex justify-between my-[30px]">
        <h2 className="text-3xl font-bold ml-4 ">Your Products</h2>
        <Link to="/upload">
        <button className=" p-2 rounded-full mr-4  border border-slate-700" onClick={handleOpen}>
          <img src={add} alt="add new" className="w-12 h-12  rounded-full"/>
        </button>
        </Link>
        </div>
  {data?.products && data.products.length > 0 ? (
    <div>
      <div >
      <Carousel responsive={responsive}>
        {data.products.map((product, index) => (
          <ActiveSlider
            key={index}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            description={product.description}
            category={product.category}
            rating={product.rating}
          />
        ))}
        </Carousel>
      </div>
      
    </div>
   
  ) : (
    <p>No products to display</p>
  )}
   
</div>

    </div>
  );
};

export default ProfilePage;
