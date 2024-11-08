import { useMutation } from '@tanstack/react-query'
import React, { lazy, Suspense } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const ImageSlider = lazy(() => import('../components/ImageSlider.jsx'));

const Departments = ({ selection }) => {
    const [currentFac, setCurrentFac] = useState([]);
    const { id } = useParams();

    const { mutate: getFaculty } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(!selection ? `/api/academics/faculties/${id}` : `/api/academics/faculties/${selection}`);
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
            console.log("current faculty dep: ", data);
            setCurrentFac(data);
        },
        onError: (error) => {
            console.log("Error in getting current faculty dep: ", error.message);
        }
    });

    useEffect(() => {
        getFaculty();
    }, [selection]);
    return (
        <div className='shadow-md overflow-hidden p-4'>
            <Suspense fallback={<LoadingSpinner size='lg' />}>
                <ImageSlider />
            </Suspense>
            <h1 className='text-lg text-white bg-gradient-to-r rounded-md p-2 font-bold m-4 font-mono'>{currentFac[0]?.facultyDepTitle}</h1>
            <div className="animate-fadeIn flex sm:flex-col md:flex-row lg:flex-row xl:flex-row flex-wrap md:ml-24 lg:ml-24 xl:ml-24 md:mr-24 lg:mr-24 xl:mr-24 gap-4 bg-blueGray border border-primary">
                {currentFac[0]?.departments.map((dep, index) => {
                    // const randomImg = getRandomPicture();
                    return (
                        <div key={index} style={{ backgroundImage: `url('/plain.jpg')` }} className='text-black bg-cover bg-center zoom-bg transition-all duration-500 ease-in-out hover:bg-[length:120%] bg-slate-400 flex w-full md:w-[30%] border border-secondary hover:border-secondary hover:border-4 hover:text-secondary hover:font-bold shadow-md overflow-hidden p-4 m-4'>
                            <div className='shadow-md overflow-hidden p-4'>
                                <div className="flex flex-col">
                                    <h3 className='font-bold text-sm hover:text-lg'>{dep.name}</h3>
                                    <label className='hover:text-lg'>{dep.programsNumbers} Degree programs </label>
                                    {dep.facultyMembersNo.length > 0 && <label className='hover:text-lg '>{dep.facultyMembersNo} Faculty Members</label>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Departments