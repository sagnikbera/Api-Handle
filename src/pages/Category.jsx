import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Category = () => {
    const [products , setProducts] = useState([]);
    const [cat , setCat] = useState("All");

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

    </div>
  )
}

export default Category
