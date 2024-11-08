import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AcademicsPage from '../Academics/AcademicsPage.jsx';
import { useMutation } from '@tanstack/react-query';
import Departments from '../Academics/Departments.jsx';

const AcademicsHeader = () => {
    const [faculties, setFaculties] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedId, setSelectedId] = useState('');

    const isSticky = () => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        if (scrollTop >= 250) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

  const { mutate: getFaculties } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/academics/faculties");
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
      console.log("Faculties: ", data.map((faculty, index) => (
        faculty.facultyDepTitle
      )));
      setFaculties(data);
    },
    onError: (error) => {
      console.log("faculties Error: ", error);
    }
  });
  useEffect(() => {
    getFaculties();
  }, []);
  return (
    <div className={`flex flex-col min-h-screen ${isMobile ? 'pt-4' : ''}`}>
            {!isMobile ? (
                <header className='header-section border border-collapse flex flex-row flex-wrap text-white bg-gradient-to-r animate-fadeInDown'>
                    {faculties.map((faculty, index) => (
                        <button onClick={() => {setSelectedId(faculty._id); console.log(`Academic selected through header: ${selectedId}`)}} className='flex-grow border-r-2 border-b-2 text-sm p-2 hover:bg-slate-400 bg-gradient-to-r' key={index}>
                            {faculty.facultyDepTitle}
                        </button>
                    ))}
                </header>
            ) : null}
            <Departments selection={selectedId}/>
            {isMobile ? (
                <footer className='header-section flex flex-wrap border border-collapse px-2 text-white bg-gradient-to-r animate-fadeInDown'>
                    {faculties.map((faculty, index) => (
                        <button onClick={() => setSelectedId(faculty._id)} className='flex-grow border border-solid text-sm p-2 bg-gradient-to-r hover:bg-slate-400' key={index}>
                            {faculty.facultyDepTitle}
                        </button>
                    ))}
                </footer>
            ) : null}
        </div>
  )
}

export default AcademicsHeader