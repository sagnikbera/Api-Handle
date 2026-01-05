import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p className="p-6 text-xl">Cart is empty</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex gap-4 border p-4 mb-2">
          <img src={item.image} className="w-20 h-20 object-contain" />
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>${item.price}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
