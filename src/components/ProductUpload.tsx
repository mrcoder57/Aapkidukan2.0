import { Cloudinary } from "@cloudinary/url-gen";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const ProductUpload = () => {
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

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
  const createProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    const imageUrl = generateImageUrl();
    console.log(imageUrl.toString())
    // Verify that all required fields are filled
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !imageUrl
    ) {
      console.error("Please fill in all the required fields");
      return;
    }

    try {
      // Make a POST request to your server with the product data
      const response = await axios.post(
        "https://aapkidukaan-backend.up.railway.app/products",
        {
          title: title,
          image: imageUrl,
          description: description,
          category: category,
          price: price,
         
        },
        config
      );

      // Handle successful product creation (e.g., redirect, show a success message, etc.)
      console.log("Product created successfully", response.data);
      window.location.href = "/";
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
  const handleNumberChange = (event:any) => {
    // Ensure the value is a valid number
    const newValue = parseFloat(event.target.value);

    // Step 3: Update the state variable
    setPrice(isNaN(newValue) ? 0 : newValue);
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-lg w-[80%]">
        <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={createProduct}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                name="image"
                className="input input-bordered flex justify-evenly h-[200px] w-full"
                required
              />
              {imagePublicId && (
                <div className="mt-4">
                  <p>Generated Image URL:</p>
                  <code className=" w-full ">{generateImageUrl().slice(0,10)}</code>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Decription</span>
              </label>
              <textarea
                placeholder="description for the product"
                name="description"
                className="input input-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Category"
                name="category"
                className="input input-bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="price"
                name="price"
                className="input input-bordered"
                value={price}
               onChange={handleNumberChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
