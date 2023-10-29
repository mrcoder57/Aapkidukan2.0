import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Suspense } from 'react';

const Playpage = () => {
    const id= useParams();
   
    const [singleData,setSingleData]=useState({})
    const [loading, setLoading] = useState(true);
    const getApi = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id.id}`);
        setSingleData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
        
        
    }
    useEffect(() => {
        getApi();
    }, [])
    if (loading) {
      return <div className=' justify-center text-center text-3xl mt-56'><span className="loading loading-spinner text-success h-24 w-24"></span></div>;
    }
    return (

        <div>
          
           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src={singleData.image} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">{singleData.title}</h1>
      <p className="py-6 first-letter:capitalize">{singleData.description}</p>
      <button className="btn btn-primary">₹{singleData.price*10}</button>
    </div>
  </div>
</div>


        </div>
    )
}

export default Playpage