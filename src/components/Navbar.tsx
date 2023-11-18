
import { Link } from "react-router-dom"
import avatar from "../assets/profile-avatar.svg";
import aapkidukan from "../assets/aapkiduakn.jpeg"
import Cookies from "js-cookie";

const Navbar = () => {

  const token = Cookies.get('jwtToken');

  return (
    <div className="navbar bg-base-100 ">
  <div className="flex-1">
    <a href="/"className="btn btn-ghost normal-case text-xl">
    <img src={aapkidukan} alt="logo"  className=" h-14 w-14 rounded-full" />
    Aapkidukaan</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-Props">{0}</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{0} Propss</span>
          <span className="text-info">${0}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
        <div className="w-10 rounded-full bg-slate-100 transition ease-in-out duration-300 hover:scale-105">
          <img src={avatar}  alt="profile"/>
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to='/profile' className="justify-center" >
            Profile</Link>
            <span className="badge">New</span>
          
        </li>
        <li><a>Settings</a></li>
        <li><Link to="/Login">{token ? "Logout" : "Login"}</Link></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar