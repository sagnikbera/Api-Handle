import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Category = () => {
    const [products , setProducts] = useState([]);
    const [cat , setCat] = useState("All");

    const navigate = useNavigate();
    const { addToCart , cartItems } =  useCart();

    useEffect(()=> {
        const fetchData = async () => {
            const res = await axios.get('https://fakestoreapi.com/products');
            setProducts(res.data);
        }
        fetchData();
    } , [])

    const allCat = products.map((item) => item.category);
    const catSet = new Set(allCat);
    const uniqueSet = ["All" , ...catSet];
    // console.log(allCat);
    // console.log(catSet);
    // console.log(uniqueSet);

    const filtPdts = cat === "All" ? products : products.filter((item) => item.category === cat);


  return (
    <div>
      {/* cat  */}
      <div className='w-full bg-gray-300 p-4 flex flex-wrap gap-3 justify-center'>
        {
            uniqueSet.map((ct , index) => (
                <button
                    key={index}
                    onClick={() => setCat(ct)}
                    className={`
                        px-4 py-1 border-2 capitalize rounded-4xl text-sm font-semibold
                        ${
                            cat === ct ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'
                        }
                        `}
                >
                    {ct}
                </button>
            ))
        }
      </div>
       {/* display  */} 
       <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {
                    filtPdts.map((p) => {
                        const isAdded = cartItems.find((item) => item.id === p.id);
                    
                    return (
                        <div key={p.id} className='border p-4 rounded'>
                            <img 
                            src={p.image} 
                            alt={p.title} 
                            className='w-64 h-64 object-contain mx-auto'
                            />

                            <h2 className='font-semibold truncate'>{p.title}</h2>
                            <p className='text-gray-600'>${p.price}</p>

                            <button
                            className='bg-gray-500 mt-3 w-full py-1 rounded-full font-semibold text-white'
                            onClick={()=>{
                                if(user) {
                                    navigate(`/products/${p.id}`);
                                } else {
                                    navigate('/login');
                                }
                            }}
                            >
                                See Product Details
                            </button>

                            <button
                            disabled = {isAdded}
                            className={`mt-3 w-full py-1 rounded-full font-semibold text-white
                                ${
                                isAdded ? 'ng-gray-400 cursor-not-allowed' : 'bg-blue-500'
                                }
                                `}
                             onClick={() => addToCart(p)}   
                            >
                                {isAdded ? 'Added' : 'Add to Cart'}
                            </button>
                        </div>
                    )
                    })
                }
            </div>
       </div>
    </div>
  )
}

export default Category
