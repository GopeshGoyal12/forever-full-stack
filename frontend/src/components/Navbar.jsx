import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import NotificationIcon from './NotificationIcon';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setVisible(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='bg-saarthi-ivory border-b border-saarthi-brown/20 sticky top-0 z-50 w-full'
    >
      {/* Top Banner */}
      <div className='w-full bg-saarthi-maroon text-saarthi-cream text-center py-2 px-4 text-[10px] sm:text-xs font-light tracking-widest uppercase'>
        Free Shipping on Handcrafted Orders Over ₹5000
      </div>

      <div className='max-w-[1500px] mx-auto flex items-center justify-between py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12 font-medium relative'>
        
        {/* Left: Mobile Menu Toggle & Search on mobile */}
        <div className='flex items-center gap-3 lg:hidden'>
          <button
            onClick={() => setVisible(true)}
            aria-label="Open Navigation Menu"
            className='p-1.5 -ml-1 text-saarthi-dark hover:opacity-70 focus:outline-none'
          >
            <img src={assets.menu_icon} className='w-5 h-5 filter invert-[0.3]' alt="Menu" />
          </button>
          <button
            onClick={() => { setShowSearch(true); navigate('/collection'); }}
            aria-label="Search"
            className='p-1.5 sm:hidden hover:opacity-70'
          >
            <img src={assets.search_icon} className='w-4 h-4 filter invert-[0.3]' alt="Search" />
          </button>
        </div>

        {/* Center / Left: Brand Logo */}
        <Link to='/' className="flex items-center">
          <h1 className='font-display text-2xl sm:text-3xl lg:text-4xl text-saarthi-dark tracking-widest uppercase'>
            Saarthi
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex items-center gap-8 xl:gap-12 text-xs xl:text-sm text-saarthi-dark font-display tracking-widest uppercase'>
          <NavLink to='/' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors py-1'>
            <span>Home</span>
            <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
          </NavLink>
          <NavLink to='/collection' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors py-1'>
            <span>Collection</span>
            <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
          </NavLink>
          <NavLink to='/craftsmanship' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors py-1'>
            <span>Craftsmanship</span>
            <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
          </NavLink>
          <NavLink to='/heritage' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors py-1'>
            <span>Heritage</span>
            <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
          </NavLink>
          <NavLink to='/contact' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors py-1'>
            <span>Contact</span>
            <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
          </NavLink>
        </nav>

        {/* Right Action Icons */}
        <div className='flex items-center gap-3 sm:gap-5 md:gap-7'>
          <button
            onClick={() => { setShowSearch(true); navigate('/collection'); }}
            aria-label="Search"
            className='hidden sm:block p-1 hover:opacity-70 transition-opacity'
          >
            <img src={assets.search_icon} className='w-4 sm:w-5 h-4 sm:h-5 filter invert-[0.3]' alt="Search" />
          </button>

          {/* Profile Dropdown */}
          <div className='relative group'>
            <button
              onClick={() => token ? null : navigate('/login')}
              aria-label="Profile Account"
              className='p-1 hover:opacity-70 transition-opacity flex items-center'
            >
              <img src={assets.profile_icon} className='w-4 sm:w-5 h-4 sm:h-5 filter invert-[0.3]' alt="Profile" />
            </button>

            {token && (
              <div className='group-hover:block hidden absolute right-0 pt-3 z-50 w-44 animate-fadeIn'>
                <div className='flex flex-col py-3 bg-saarthi-ivory border border-saarthi-brown/20 text-saarthi-dark shadow-2xl rounded-sm'>
                  <Link to='/profile' className='px-5 py-2 hover:bg-saarthi-cream hover:text-saarthi-maroon transition-colors font-light text-sm'>
                    My Profile
                  </Link>
                  <Link to='/orders' className='px-5 py-2 hover:bg-saarthi-cream hover:text-saarthi-maroon transition-colors font-light text-sm'>
                    Orders
                  </Link>
                  <hr className='border-saarthi-brown/15 my-1.5' />
                  <button onClick={logout} className='w-full text-left px-5 py-2 hover:bg-saarthi-cream hover:text-saarthi-maroon transition-colors font-light text-sm'>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to='/cart' aria-label="Shopping Cart" className='relative p-1 hover:opacity-70 transition-opacity'>
            <img src={assets.cart_icon} className='w-4 sm:w-5 h-4 sm:h-5 filter invert-[0.3]' alt="Cart" />
            <span className='absolute -top-1 -right-1 w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center bg-saarthi-maroon text-saarthi-cream text-[9px] sm:text-[10px] font-bold rounded-full'>
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[99] transition-opacity duration-300 lg:hidden ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setVisible(false)}
      />
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[80vw] bg-saarthi-ivory z-[100] shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between lg:hidden ${visible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex flex-col'>
          <div className='flex items-center justify-between p-6 border-b border-saarthi-brown/20'>
            <h2 className='font-display text-xl uppercase tracking-widest text-saarthi-dark'>Saarthi</h2>
            <button 
              onClick={() => setVisible(false)}
              aria-label="Close menu"
              className='p-1 text-saarthi-dark hover:text-saarthi-maroon'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className='flex flex-col py-4 font-display tracking-widest text-sm uppercase text-saarthi-dark'>
            <NavLink onClick={() => setVisible(false)} className='py-3.5 px-6 hover:bg-saarthi-brown/5 transition-colors' to='/'>
              Home
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3.5 px-6 hover:bg-saarthi-brown/5 transition-colors' to='/collection'>
              Collection
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3.5 px-6 hover:bg-saarthi-brown/5 transition-colors' to='/craftsmanship'>
              Craftsmanship
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3.5 px-6 hover:bg-saarthi-brown/5 transition-colors' to='/heritage'>
              Heritage
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3.5 px-6 hover:bg-saarthi-brown/5 transition-colors' to='/contact'>
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div className='p-6 border-t border-saarthi-brown/20 bg-saarthi-cream/40 flex flex-col gap-3 font-sans text-xs tracking-widest uppercase'>
          {token ? (
            <>
              <Link 
                onClick={() => setVisible(false)} 
                to='/profile'
                className='py-2.5 px-4 text-center border border-saarthi-brown/20 hover:bg-saarthi-ivory transition-colors'
              >
                My Profile
              </Link>
              <Link 
                onClick={() => setVisible(false)} 
                to='/orders'
                className='py-2.5 px-4 text-center border border-saarthi-brown/20 hover:bg-saarthi-ivory transition-colors'
              >
                My Orders
              </Link>
              <button 
                onClick={logout}
                className='py-2.5 px-4 text-center bg-saarthi-maroon text-saarthi-ivory hover:bg-saarthi-dark transition-colors mt-1'
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              onClick={() => setVisible(false)} 
              to='/login'
              className='py-3 px-4 text-center bg-saarthi-dark text-saarthi-ivory hover:bg-saarthi-maroon transition-colors'
            >
              Sign In / Register
            </Link>
          )}
        </div>
      </aside>
    </motion.header>
  );
};

export default Navbar;
