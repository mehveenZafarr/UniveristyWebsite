import { useMutation } from '@tanstack/react-query'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { createContext } from 'react';
import { Link } from 'react-router-dom';
import { OpenContext } from '../components/OpenContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
// import ImageSlider from '../components/ImageSlider.jsx';

const ImageSlider = lazy(() => import('../components/ImageSlider.jsx'));

const AcademicsPage = () => {
  const { setInd } = createContext(OpenContext);
  const [faculties, setFaculties] = useState([]);
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
    <div>
      {/* <div className='flex-grow'>
        <img className='h-40 object-cover w-full' src="/kfueitHistorical.jpg" alt="" />
      </div> */}
      <Suspense fallback={<LoadingSpinner size='lg'/>}>
      <ImageSlider/>
      </Suspense>
      <div className="flex flex-wrap mx-4 mt-4 bg-blueGray border border-primary">
        {faculties.map((faculty, index) => (
          <Link onClick={() => setInd(index)} key={index} to={`/academics/faculties/${faculty._id}`} 
          style={{ backgroundImage: `url('/plain.jpg')` }} 
          className='text-black bg-cover bg-center zoom-bg transition-all duration-500 ease-in-out hover:bg-[length:120%] bg-slate-400 flex w-full md:w-[30%] border border-secondary hover:border-secondary hover:border-4 hover:text-secondary hover:font-bold shadow-md overflow-hidden p-4 m-4 animate-fadeIn'>
            <div className='shadow-md overflow-hidden p-4'>
              <h3 className="md:text-lg font-bold">{faculty.facultyDepTitle}</h3>
              <p className='text-slate-500'>{faculty.departments?.length || 0} Departments</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AcademicsPage