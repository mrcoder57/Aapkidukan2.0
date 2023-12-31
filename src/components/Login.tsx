import Cover from "../assets/pexels-cleyton-ewerton-3017260.jpg";
import { Link } from "react-router-dom";
import axios,{AxiosResponse} from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

interface LoginResponse {
  token: string;
  // Other properties in your API response, if any
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response:AxiosResponse<LoginResponse> = await axios.post(
        "https://aapkidukaan-backend.up.railway.app/user/login",
        {
          email: email,
          password: password,
        }
      );

      // Handle successful login (e.g., store the token, redirect, etc.)
      const token = response.data.token;

      // Store the token in a cookie (you can set additional options like expiration)
      Cookies.set("jwtToken", token);
     
      console.log("Login successful", response.data);
      window.location.href = "/";
    } catch (error: any) {
      // Handle login error (e.g., show an error message)
      console.error("Login failed", error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:scale-125 md:mr-[60px] md:mb-[50px] transitio ease-in-out">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover"></a>
              </label>
            </div>
            <div className=" flex justify-evenly gap-20">
            <Link to="/">
              
              <p className="text-lg font-semibold">
                <span>Skip Login</span>
              </p>
            </Link>
            <Link to="/register">
              
              <p className="text-lg font-semibold"> 
                <span> Register Now</span>
              </p>
            </Link>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary transition ease-in-out duration-300 hover:scale-105"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left">
          <img
            src={Cover}
            alt="Cover"
            className="lg:h-[600px] w-[500px] rounded-lg shadow-lg ml-3 transition ease-in-out duration-200 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
