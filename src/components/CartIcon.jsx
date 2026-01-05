import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <div
      onClick={() => navigate('/cart')}
      className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full cursor-pointer shadow-lg"
    >
      <FaShoppingCart size={24} />

      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
