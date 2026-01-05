import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const {logout }= useAuth();

    const handleLogOut = () => {
      logout();
      navigate('/');
    }

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => setProducts(data));
    } , [])

  return (
    <div className='p-6'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {
        products.map(
            p=> (
                <div
                key={p.id}
                onClick={()=>navigate(`/products/${p.id}`)}
                >
                    <h2 className='font-semibold'>{p.title}</h2>
                    <p className='text-gray-600'>{p.price}</p>
                </div>
            )
        )
      }
    </div>
    <button className="px-6 py-2 bg-black text-white rounded"
    onClick={handleLogOut}>Log Out</button>
    </div>
    
  )
}

export default Products
