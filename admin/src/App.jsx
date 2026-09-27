import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Concerns from './pages/Concerns'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-saarthi-cream min-h-screen font-sans flex flex-col'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <div className='flex w-full flex-1'>
            <Sidebar />
            <main className='flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 text-saarthi-dark text-base max-w-[1400px] w-full min-w-0'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/concerns' element={<Concerns token={token} />} />
              </Routes>
            </main>
          </div>
        </>
      }
    </div>
  )
}

export default App