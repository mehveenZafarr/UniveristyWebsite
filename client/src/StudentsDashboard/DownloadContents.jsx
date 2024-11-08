import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { OpenContext } from '../pages/components/OpenContext.jsx';

const DownloadContents = () => {
    const { user } = useContext(OpenContext);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const { mutate: getEnrolledCourses } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/courses/getEnrolledCourses/${user._id}`);
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
            console.log("Enrolled Courses: ", data);
            setEnrolledCourses(data);
        },
    });
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <>
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md m-4">
                <label className="text-xl font-semibold text-center font-mono flex justify-center items-center">Download Contents</label>
            </header>
            {enrolledCourses.map((pdfProgram, index) => (
                <div className='m-4'>
                    <div key={index} className='relative p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 bg-opacity-30 border-yellow-800 rounded-md sm:w-full rounded-b-2xl shadow-md'>
                        <div className="flex flex-col justify-center">
                            <label className='text-white text-lg font-bold'>{pdfProgram.program.name}</label>
                            <label className='text-slate-400 underline'>{pdfProgram.name}</label>
                        </div>
                        {/* <embed src={"http://localhost:4000"+pdfProgram.pdfFiles.map((url, index) => url)} type="application/pdf" /> */}
                        <div className="flex flex-col">
                            {pdfProgram.pdfFiles.map((url, index) => (
                                <div key={index} className='flex flex-col items-center justify-center'>
                                    {/* <a href={"http://localhost:4000/api/" + url} target="_blank" rel="noopener noreferrer">
                View/Download PDF {index + 1}
              </a> */}
                                    <embed className='m-2 w-full h-96 border border-yellow-500 rounded-md' src={"http://localhost:4000/api/" + url} type="application/pdf" />

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default DownloadContents