import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', alternateEmail: '' });
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [updatingName, setUpdatingName] = useState(false);

  const fetchMe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + '/api/user/me', { headers: { token } });
      if (res.data.success) {
        setForm({
          name: res.data.user.name || '',
          email: res.data.user.email || '',
          phone: res.data.user.phone || '',
          alternateEmail: res.data.user.alternateEmail || ''
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { phone: form.phone, alternateEmail: form.alternateEmail };
      const res = await axios.put(backendUrl + '/api/user/me', payload, { headers: { token } });
      if (res.data.success) {
        toast.success('Profile updated');
        setForm((f) => ({ ...f, phone: res.data.user.phone || '', alternateEmail: res.data.user.alternateEmail || '' }));
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveName = async () => {
    if (!nameValue.trim() || nameValue.trim().length < 2) {
      toast.error('Please enter a valid name (minimum 2 characters)');
      return;
    }
    try {
      setUpdatingName(true);
      const res = await axios.post(backendUrl + '/api/user/name-change-init', { newName: nameValue.trim() }, { headers: { token } });
      if (res.data.success) {
        setForm((f) => ({ ...f, name: res.data.user?.name || nameValue.trim() }));
        toast.success('Name updated successfully');
        setEditingName(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      toast.error('Failed to update name');
    } finally {
      setUpdatingName(false);
    }
  };

  useEffect(() => {
    if (token) fetchMe();
  }, [token]);

  if (loading) return <div className='py-10 text-center text-saarthi-dark font-light'>Loading profile...</div>;

  return (
    <form onSubmit={onSave} className='max-w-xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col gap-4 text-saarthi-dark'>
      <h1 className='text-2xl font-display font-medium'>My Profile</h1>
      <div>
        <label className='block text-xs uppercase tracking-wider text-gray-500 mb-1.5'>Name</label>
        {!editingName ? (
          <div className='flex items-center gap-3'>
            <input value={form.name} disabled className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm' />
            <button
              type='button'
              onClick={() => { setEditingName(true); setNameValue(form.name); }}
              className='px-4 py-2 border border-saarthi-brown/30 rounded text-xs uppercase tracking-wider hover:bg-gray-50'
            >
              Edit
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded text-sm'
              placeholder='Enter your name'
            />
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={handleSaveName}
                disabled={updatingName}
                className='bg-black text-white px-4 py-2 text-xs uppercase tracking-wider rounded disabled:opacity-50'
              >
                {updatingName ? 'Saving...' : 'Save'}
              </button>
              <button
                type='button'
                onClick={() => setEditingName(false)}
                className='px-3 py-2 border rounded text-xs uppercase tracking-wider hover:bg-gray-50'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <label className='block text-xs uppercase tracking-wider text-gray-500 mb-1.5'>Email</label>
        <input value={form.email} disabled className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm' />
      </div>
      <div>
        <label className='block text-xs uppercase tracking-wider text-gray-500 mb-1.5'>Phone</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder='Add phone number'
          className='w-full px-3 py-2 border border-gray-300 rounded text-sm'
        />
      </div>
      <div>
        <label className='block text-xs uppercase tracking-wider text-gray-500 mb-1.5'>Alternate Email</label>
        <input
          value={form.alternateEmail}
          onChange={(e) => setForm({ ...form, alternateEmail: e.target.value })}
          placeholder='Add alternate email'
          className='w-full px-3 py-2 border border-gray-300 rounded text-sm'
        />
      </div>
      <div className='text-right mt-2'>
        <button type='submit' disabled={saving} className='w-full sm:w-auto bg-black text-white px-8 py-3 text-xs tracking-wider uppercase rounded disabled:opacity-60'>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default Profile;
