import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { OpenContext } from './OpenContext.jsx';

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const { oopen, setOopen } = useContext(OpenContext);
    const headerButtonsClass = 'font-thin transition-all duration-300';
    const linkClasses = `flex items-center gap-x-4 p-2 text-white font-medium text-xl origin-left duration-300 hover:bg-secondary`;
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpen(false);  // Close sidebar when clicked outside
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Toggle overflow on body based on sidebar state
        document.body.style.overflow = open ? 'hidden' : 'auto';
    }, [open]);

    return (
        <div className="flex relative">
            {/* Sidebar */}
            <div ref={sidebarRef} className={`${open ? "sm:w-52 md:w-72 lg:w-72 xl:w-72" : "w-0 md:w-20 lg:w-20 xl:w-20"} fixed top-0 left-0 z-30 h-full bg-highest transition-all duration-300`}>
                <button
                    onClick={() => { setOpen(!open); setOopen(!oopen) }}
                    className="absolute bg-transparent top-4 left-4 md:left-5 lg:left-5 xl:left-5 flex items-center justify-center w-8 h-8 transition z-20"
                    aria-label="Toggle Sidebar"
                >
                    <img
                        src="/sideBarButton2.png"
                        alt="Toggle"
                        className="w-full h-full transform transition-transform duration-200"
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                </button>

                <div className="px-4 py-4 pt-16">
                    <div className="flex flex-col gap-y-4">
                        <div className='flex items-center'>
                            <div className={linkClasses}>
                                <img src="/kfueitLogo.png" alt="" className='h-8 w-8' />
                            </div>
                            {open &&
                                <div className='flex text-lg mr-0 text-white font-bold font-oswald'>
                                    KHWAJA FAREED
                                    <span className='dotColor ml-2'>UEIT.</span>
                                </div>}
                        </div>
                        <Link to="/academics" className={linkClasses}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            {open && <label className={headerButtonsClass}>Academics</label>}
                        </Link>

                        <Link to="/about" className={`${linkClasses}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            {open && <label className={headerButtonsClass}>About</label>}
                        </Link>

                        <Link to="/contact" className={linkClasses}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                            </svg>
                            {open && <label className={headerButtonsClass}>Contact</label>}
                        </Link>
                        <div className="pb-2">
                            <Link to="/login" className={`${linkClasses}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                                {open && <label className={headerButtonsClass}>Account</label>}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;