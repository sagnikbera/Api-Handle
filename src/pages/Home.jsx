import { useEffect, useState } from 'react';


const Home = () => {
  const [count, setCount] = useState(0);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setCount(data.length));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Total Products: {count}</h1>

      <button

        className="px-6 py-2 bg-black text-white rounded"
      >
        Show Products
      </button>
    </div>
  );
};

export default Home;
