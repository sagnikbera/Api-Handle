import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addToCart, cartItems } = useCart();

  const [currPage, setCurrPage] = useState(1);
  const ipp = 4;
  const [x, setx] = useState(0);

  const handleLogOut = () => {
    logout();
    navigate('/products');
  };

  useEffect(() => {
    // fetch('https://fakestoreapi.com/products')
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data));
    const fetchPdts = async () => {
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
    };
    fetchPdts();
  }, []);

  // let iLast = currPage * ipp;
  // let iFirst = iLast - ipp;
  // let currProduct = products.slice(iFirst , iLast);
  // let totalP = Math.ceil(products.length / ipp);

  const loadMore = () => {
    setx((prev) => prev + ipp);
  };

  const isEnplty = x + ipp >= products.length;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.slice(0, x + ipp).map((p) => {
          const isAdded = cartItems.find((item) => item.id === p.id);

          return (
            <div key={p.id} className="border p-4 rounded">
              <img
                src={p.image}
                alt={p.title}
                className="w-64 h-64 object-contain mx-auto"
              />

              <h2 className="font-semibold truncate">{p.title}</h2>
              <p className="text-gray-600">${p.price}</p>

              <button
                className="bg-gray-500 mt-3 w-full py-1 rounded-full font-semibold text-white"
                onClick={() => {
                  if (user) {
                    navigate(`/products/${p.id}`);
                  } else {
                    navigate('/login');
                  }
                }}
              >
                See product Details
              </button>

              <button
                disabled={isAdded}
                className={`mt-3 w-full py-1 rounded-full font-semibold text-white
                  ${isAdded ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}
                `}
                onClick={() => addToCart(p)}
              >
                {isAdded ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>

      <button
        className={`mt-6 px-6 py-2 bg-black text-white rounded mx-auto block ${isEnplty ? 'bg-[#dadada] cursor-not-allowed' : 'bg-black'}`}
        onClick={loadMore}
        disabled={isEnplty}
      >
        Load More
      </button>

      {/* <div className='mt-6 flex justify-center gap-2'>
        {
          Array.from(
            {length : totalP} , (_,i) => (
              <button
              key={i}
              onClick={()=>setCurrPage(i+1)}
              className={`px-3 py-1 border rounded ${currPage === i+1 ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                {i+1}
              </button>
          )
          )
        }
      </div> */}

      {user ? (
        <>
          <button
            className="mt-6 px-6 py-2 bg-black text-white rounded mx-auto block"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded mx-auto block"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Products;
