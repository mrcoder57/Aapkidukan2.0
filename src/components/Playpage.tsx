import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Reviews from "./Reviews";
import add from "../assets/add-block-svgrepo-com.svg";
import { Cloudinary } from "@cloudinary/url-gen";
import close from "../assets/close-ring-svgrepo-com.svg";
import Cookies from "js-cookie";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  reviews: Review[];
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
interface User {
  userid: number;
  email: string;
  username: string;
  password: string;
  role: string;
  products: Product[];
  reviews: Review[];
}
const Playpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [singleData, setSingleData] = useState<Product | null>(null); // Define the initial state as SingleData | null
  const [loading, setLoading] = useState(true);
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewLoad, setReviewLoad] = useState(true);

  const getApi = async () => {
    try {
      const res = await axios.get<Product>(
        `https://aapkidukaan-backend.up.railway.app/products/${id}`
      );
      setSingleData(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  if (loading || singleData === null) {
    return (
      <div className="justify-center text-center text-3xl mt-56">
        <span className="loading loading-spinner text-success h-24 w-24"></span>
      </div>
    );
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const preset = "ka34otny"; // Replace with your actual upload preset name

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      try {
        // Upload the image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duf2bmboc/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          setReviewLoad(false)
          const result = await response.json();

          if (result.public_id) {
            // Set the public_id of the uploaded image
            setImagePublicId(result.public_id);
          }
        } else {
          // Handle error response
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        // Handle fetch or other errors
        console.error("Error during image upload:", error);
      }
    }
  };
  const maxStars = 5;
  const generateImageUrl = () => {
    if (imagePublicId) {
      // Use @cloudinary/url-gen to generate the image URL
      const cld = new Cloudinary({
        cloud: {
          cloudName: "duf2bmboc",
        },
      });

      const img = cld.image(imagePublicId);
      return img.toURL();
    }

    return "";
  };
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  console.log(text, rating, imagePublicId);

  const createReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = Cookies.get("jwtToken");

    if (!token) {
      console.log("You need to Login");
      window.location.href="/login";
      return;
    }

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const imageUrl = generateImageUrl();
    console.log(imageUrl.toString());
    // Verify that all required fields are filled
    if (!text || !rating || !imageUrl) {
      console.error("Please fill in all the required fields");
      return;
    }

    try {
      // Make a POST request to your server with the product data
      const response = await axios.post(
        `https://aapkidukaan-backend.up.railway.app/products/${id}/reviews`,
        {
          text: text,
          rating: rating,
          image: imageUrl,
        },
        config
      );

      console.log(response.data);
      window.alert("Review created successfully");
      
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Axios error with a response
        console.error("Product creation failed", error.response.data);
      } else {
        // Other errors
        console.error("Product creation failed with unknown error", error);
      }
    }
  };
  return (
    <div className="flex flex-col mt-3 mx-4 md:mx-16 lg:mx-32 rounded-2xl">
      <div className="grid card-body xs-devices lg:grid-cols-2 md:grid-cols-2 mt-8 gap-5 overflow-x-hidden justify-center items-center lg:mx-10 ">
        <div className="p-3">
          <img
            src={singleData.image}
            alt="ProductImage"
            className="rounded-xl h-96 w-full lg:w-72 mx-auto lg:mx-0 shadow-lg"
          />
        </div>
        <div className="h-96 card-body w-full shadow-md p-6 rounded-xl">
          <h2 className="text-3xl font-bold capitalize mb-4">
            {singleData.title}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-full bg-orange-100 p-4">
              <h2 className="text-lg text-yellow-500 capitalize font-semibold">
                {singleData.category}
              </h2>
            </div>
            <div className="rounded-full p-4">
              <h2 className="text-lg capitalize font-semibold">
                ₹{singleData.price}
              </h2>
            </div>
          
          </div>
          
          <div className=" w-full">
              <h2 className="text-lg capitalize font-semibold">{singleData.description}</h2>
            </div>
            <div className="mt-6">
            <button className="btn btn-accent">Buy Now</button>
          </div>
        </div>
       
      </div>
      <div className=" mt-4 mx-8">
        <div className=" flex justify-between">
        <h2 className=" text-2xl ml-5 ">Reviews</h2>
        <button onClick={handleOpen}>
          <img src={add} alt="create review" className=" h-10 w-10 bg-white rounded-full"/>
        </button>
        </div>
        {singleData?.reviews && singleData.reviews.length > 0 ? (
          <Carousel responsive={responsive}>
            {singleData.reviews.map((review, index) => (
              <Reviews
                key={index}
                id={review.id}
                username={review.username}
                text={review.text}
                rating={review.rating}
                image={review.image}
              />
            ))}
          </Carousel>
        ) : (
          <div className=" mt-5 items-center justify-center">
            <p className=" text-xl font-semibold text-center ">
              {" "}
              No reviews yet Create now
              <br />
              <button
                className=" btn btn-ghost rounded-full  w-24 h-24"
                onClick={handleOpen}
              >
                <img src={add} alt="add" className=" w-16 h-16" />
              </button>
            </p>
          </div>
        )}{" "}
        <div
          className={`hero bg-base-200 mb-7 lg:mx-8 lg:mt-[-120px] mt-[-150px] relative rounded-xl z-30  justify-center items-center ${
            isOpen ? "flex" : "hidden"
          } `}
        >
          <div className="hero-content flex-col lg:flex-row-reverse max-w-lg rounded-xl ">
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
              <button
                className=" btn btn-ghost rounded-full  z-50 bg-slate-300 w-16"
                onClick={handleClose}
              >
                <img src={close} alt="close" className=" h-12 w-12" />
              </button>
              <form
                className="  card-body rounded-lg   "
                onSubmit={createReview}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">text</span>
                  </label>
                  <textarea
                    placeholder="Description"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rate the Product</span>
                  </label>
                  <div className=" rating">
                    {[...Array(maxStars)].map((_, index) => (
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400 mx-1"
                        checked={index + 1 === rating}
                        onChange={() => handleStarClick(index + 1)}
                        required
                      />
                    ))}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="input input-bordered"
                    required
                  />
                  <code></code>
                </div>
                <button className={` btn ${reviewLoad? "btn-neutral":"btn-primary"}`} disabled={reviewLoad}>Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playpage;
