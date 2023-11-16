import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface SingleData {
  image: string;
  title: string;
  description: string;
  price: number;
  
}

const Playpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [singleData, setSingleData] = useState<SingleData | null>(null); // Define the initial state as SingleData | null
  const [loading, setLoading] = useState(true);

  const getApi = async () => {
    try {
      const res = await axios.get<SingleData>(`https://aapkidukaan-backend.up.railway.app/products/${id}`);
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
  }, [id]);

  if (loading || singleData === null) {
    return (
      <div className='justify-center text-center text-3xl mt-56'>
        <span className="loading loading-spinner text-success h-24 w-24"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row ">
          <img src={singleData.image} className="max-w-sm mr-8 rounded-lg shadow-2xl h-72 w-60 lg:w-[500px] lg:h-[650px]" alt={singleData.title} />
          <div>
            <h1 className="lg:text-5xl text-3xl font-bold">{singleData.title}</h1>
            <p className="py-6 first-letter:capitalize">{singleData.description}</p>
            <button className="btn btn-primary">₹{singleData.price * 10}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playpage;
