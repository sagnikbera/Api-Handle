import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
    const {user , logout} = useAuth();
    const navigantion = useNavigate();

    const handleLogout = () => {
        logout();
        navigantion('/proucts');;
    }

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-black text-white'>
        
        <div className='flex gap-6'>
            <NavLink
            to = "/"
            className={({isActive}) => isActive ? 'font-semibold underline' : ''}
            >
                Home
            </NavLink>

            <NavLink
            to="/products"
            className={({isActive}) => isActive ? 'font-semibold underline' : ''}
            >
                Products
            </NavLink>

            <NavLink
            to="/category"
            className={({isActive}) => isActive ? 'font-semibold underline' : ''}
            >
                Category
            </NavLink>
        </div>

        {/* btn  */}
        <div>
            {
                user ? (
                    <button
                    onClick={handleLogout}
                    className='px-4 py-1 bg-red-500/70 rounded font-semibold'
                    >
                        Log Out
                    </button>
                ) : (
                    <button
                    onClick={() => navigantion('/login')}
                    className="px-4 py-1 bg-blue-500 rounded font-semibold"
                    >
                        Log In
                    </button>
                )
            }
        </div>
    </nav>
  )
}

export default Nav
