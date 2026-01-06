import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import CartIcon from './components/CartIcon';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Nav from './components/Nav';
import Category from './pages/Category';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />

            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/category"
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
          </Routes>

          <CartIcon />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
