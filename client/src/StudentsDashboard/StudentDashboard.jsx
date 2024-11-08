import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { OpenContext } from '../pages/components/OpenContext.jsx';
import { useMutation } from '@tanstack/react-query';

const StudentDashboard = ({ authUser }) => {
  const { dash, setDash } = useContext(OpenContext);

  useEffect(() => {
    setDash(true);
    return () => setDash(false);
  }, [setDash]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [announcements, setAnnouncements] = useState([]);

  const { mutate: getAnnouncements } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/announce/getAnnouncements");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      // console.log("Announcements: ", data);
      setAnnouncements(data);
      // setOpenAnnouncementDialog(false);
    },
    onError: (error) => {
      console.log("Error in getting announcements: ", error.message);
    },
  });

  useEffect(() => {
    getAnnouncements();
  }, [announcements]);

  // Automatically update placement based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dashHomeNames = ['View my Roll Number Slip', 'View my Grades', 'View my Current Enrollements', 'Semester Fee Voucher', 'Course Registration'];
  const linkPages = [
    '/rollNumberSlip',
    '/grades',
    '/enrolled',
    '/voucher',
    '/registerCourse',
  ];

  const svgArray = [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
    </svg>
  ];
  return (
    <div className='flex min-h-screen overflow-auto flex-col md:flex-row lg:flex-row xl:flex-row'>
      {/*==================== Notice Board ====================== */}
      {/* For mobile */}
      {isMobile ? (
        <header className=' bg-white border-white'>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-2 py-2 bg-gradient-to-r text-white justify-center items-center border-b-2 border-primary w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
              </svg>
              <label className='text-lg font-bold font-mono'>Notice Board</label>
            </div>
            {announcements.map((announcement, index) => (
              <div className='relative mt-2 bg-yellow-100 border-yellow-800 rounded-md p-4 sm:w-full rounded-b-2xl shadow-md mb-4' key={index}>
                <div className="flex flex-col">
                  {/* <div className='flex flex-row items-center'> */}
                  <label className='text-yellow-700 font-bold'>{announcement.subject}</label>
                  {/* </div> */}
                  <label className='text-yellow-700'>{announcement.description}</label>
                </div>
              </div>
            ))}
          </div>
        </header>
      ) : (
        // For laptop
        <aside className='w-1/4 bg-white border-collapse border-r-2 border-primary shadow-2xl notification'>
          <div className='flex flex-col'>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-row justify-center items-center gap-2 p-4 rounded-b-2xl shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-semibold text-center font-mono">Notice Board</h2>
            </div>
            <div className='mt-16 border-yellow-950'>
              {announcements.map((announcement, index) => (
                <div className='relative mt-2 bg-yellow-100 border-yellow-800 rounded-md p-4 sm:w-full rounded-b-2xl shadow-md mb-4' key={index}>
                  <div className="flex flex-col">
                    {/* <div className='flex flex-row items-center'> */}
                    <label className='text-yellow-700 font-bold'>{announcement.subject}</label>
                    {/* </div> */}
                    <label className='text-yellow-700'>{announcement.description}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
      {/* =============== Student News Feed =============== */}
      <div className='md:w-3/4 bg-blueGray p-4'>
        <div className="bg-gradient-to-r gap-2 from-blue-500 to-indigo-600 text-white flex flex-row justify-center items-center p-4 rounded-b-2xl shadow-md mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
          </svg>
          <h2 className="text-xl font-semibold text-center font-mono">Students News Feed</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {dashHomeNames.map((tile, index) => (
            <Link to={linkPages[index]} key={index} className='flex flex-col p-4 mx-6 m-2 w-30 h-20 md:h-32 lg:h-32 xl:h-32 rounded-md bg-gradient-primary gap-2 text-black items-center justify-center transition-all duration-500 border border-secondary action-button shadow-md animate-slideUp'>
              <div className='text-primary-600'>{svgArray[index]}</div>
              <label className='text-sm text-center text-white font-mono'>{tile}</label>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard