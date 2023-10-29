import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
interface ProductProps{
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image:string,
  rating:number
}

const Productcard = (props:ProductProps) => {
    return (
       
               <div className="card bg-base-100 shadow-xl max-h-[600px] m-10 w-72 h-[500px] transition ease-in-out duration-300 hover:scale-105">
  <figure className=' object-cover hover:scale-125 hover:h-[500px]'><img className=' object-cover 'src={props.image} alt={props.title} /></figure>
  <div className="card-body" >
    <h2 className="card-title">
      {props.title.slice(0,40)}
      
      <div className="badge badge-secondary">{props.id}</div>
    </h2>
    <h2>{props.description.slice(0,100)}</h2>
    <div className="card-actions justify-end">
        
      <div className="badge badge-outline"><span>₹{props.price*10}</span></div> 
      <Link to={`${props.id}`}>
        <button className='border border-slate-800 p-4 rounded-lg mx-2 transition ease-in-out duration-300 hover:scale-105'>Buy Now</button>
      </Link>
    </div>
  </div>
</div>
    )
}

const Hero = () => {
    const [data, setData] = useState([]);
    const getApi = async () => {
        const res = await axios.get('https://fakestoreapi.com/products?limit=12');
        setData(res.data);
        // console.log(res.data)
    }
    useEffect(() => {
        getApi();
    }, [])
    return (
      <>
      <Carousel></Carousel>
        <div className=' h-32 grid grid-cols-1 md:grid-cols-3 '>
            {data.map(({ id, title, price, description, category, image, rating }) => (
                <Productcard id={id} image={image} title={title} description={description} price={price} category={category} rating={rating}
                />
            ))}
            
        </div>
    
        </>
    )
}


export default Hero