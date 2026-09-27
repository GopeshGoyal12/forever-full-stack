import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Concerns = ({ token }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const res = await axios.post(backendUrl + '/api/contact/list', {}, { headers: { token } })
      if (res.data.success) setItems(res.data.items)
      else toast.error(res.data.message)
    } catch (e) {
      console.log(e)
      toast.error('Failed to load concerns')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() },[])

  if (loading) return <div className='p-4'>Loading...</div>

  return (
    <div className='w-full'>
      <p className='font-sans uppercase tracking-[0.3em] text-xs text-saarthi-muted mb-6'>Client Inquiries & Concerns</p>
      <div className='w-full overflow-x-auto border border-saarthi-brown/20 bg-saarthi-ivory rounded-sm shadow-sm'>
        <div className='min-w-[640px]'>
          <div className='grid grid-cols-4 gap-4 py-3.5 px-6 font-sans text-xs uppercase tracking-widest text-saarthi-dark bg-saarthi-cream border-b border-saarthi-brown/20'>
            <div>Name</div>
            <div>Email</div>
            <div>Concern</div>
            <div>Date</div>
          </div>
          {items.map((c)=> (
            <div key={c._id} className='grid grid-cols-4 gap-4 py-3.5 px-6 border-b border-saarthi-brown/10 text-sm font-light text-saarthi-dark hover:bg-saarthi-cream/40 transition-colors'>
              <div className='break-words font-medium'>{c.name}</div>
              <div className='break-words text-xs sm:text-sm text-saarthi-muted'>{c.email}</div>
              <div className='break-words text-xs sm:text-sm'>{c.concern}</div>
              <div className='text-xs text-saarthi-muted'>{ new Date(c.date).toLocaleString() }</div>
            </div>
          ))}
          {items.length === 0 && <div className='p-8 text-center text-saarthi-muted text-sm font-light'>No inquiries received yet.</div>}
        </div>
      </div>
    </div>
  )
}

export default Concerns
