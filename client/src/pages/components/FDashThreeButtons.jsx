import React from 'react'

const FDashThreeButtons = ({ setSelection }) => {
  return (
    <div>
      <button onClick={(e) => { e.preventDefault(); setSelection('session'); }} className='h-10 rounded-xl flex justify-center items-center w-full bg-primary'>
        <label className='text-sm text-white'>Manage Sessions</label>
      </button>
      <button onClick={(e) => { e.preventDefault(); setSelection('content'); }} className='h-10 mt-2 rounded-xl flex justify-center items-center w-full bg-primary'>
        <label className='text-sm text-white'>Course Contents</label>
      </button>
      <button onClick={(e) => { e.preventDefault(); setSelection('announcement'); }} className='h-10 mt-2 rounded-xl flex justify-center items-center w-full bg-primary'>
        <label className='text-sm text-white'>Make Announcement</label>
      </button>
    </div>
  )
}

export default FDashThreeButtons