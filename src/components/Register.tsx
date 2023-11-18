import { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

import Cover from "../assets/aapkiduakn.jpeg";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async ()=>{
        if (!email || !password || !confirmPassword ||!username){
            console.log('please fill complete information')}

            if(password !== confirmPassword){
                console.log('passwords doesnot match')
        }
        try {
            const response= await axios.post('https://aapkidukaan-backend.up.railway.app/user/register', {
                email:email,
                username:username,
                password:password
            })
            console.log("registeration successful", response.data)

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
    <div className="hero min-h-screen h-[790px] bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:scale-125 md:mr-[60px] md:mb-[50px] transition ease-in-out">
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
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover"></a>
              </label>
            </div>
            <Link to="/Login">
              <p>?already have an account <br />
                <span>Login</span>
              </p>
            </Link>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary transition ease-in-out duration-300 hover:scale-105"
                type="button"
                onClick={handleRegister}
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
            className="lg:h-[500px] w-[600px] rounded-lg shadow-lg ml-3 transition ease-in-out duration-200 hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

export default Register