import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setCount(data.length));
  }, []);

  const handleShowProducts = () => {
    if (user) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">

      <h1 className="text-3xl font-bold">
        Total Products: {count}
      </h1>


      <button
        onClick={handleShowProducts}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Show Products
      </button>

      {/* auth */}
      {user ? (
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      )}

    </div>
  );
};

export default Home;
