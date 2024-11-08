import React from 'react'
import FDashThreeButtons from '../../components/FDashThreeButtons.jsx'

const LaptopAside = ({authUser, setSelection}) => {
    return (
        <>
            <aside className='w-1/4 bg-white border-collapse border-r-2 border-primary shadow-2xl notification'>
                <div className='flex flex-col'>
                    <div className='flex flex-row text-lg gap-2 rounded-xl h-auto py-2 bg-gradient-to-r text-white border-b-2 border-primary w-full justify-center'>
                        <div className='ml-4 flex flex-col'>
                            <label className='text-lg font-bold font-mono ml-1 '>{authUser.name}</label>
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                </svg>
                                <label className='text-sm text-slate-300'>Kfueit, RYK</label>
                            </div>
                        </div>
                        <div className='flex justify-center items-center m-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {/* Side bar buttons */}
                    <div className='my-2 p-4 bg-blueGray w-full border border-primary'>
                        <FDashThreeButtons setSelection={setSelection} />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default LaptopAside