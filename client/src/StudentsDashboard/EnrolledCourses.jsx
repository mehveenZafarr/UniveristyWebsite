import React, { lazy, Suspense, useState } from 'react'
import { useContext } from 'react';
import { OpenContext } from '../pages/components/OpenContext.jsx';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import LoadingSpinner from ;
// import StudentInfo from './components/StudentInfo.jsx';

const StudentInfo = lazy(() => import('./components/StudentInfo.jsx'));
const LoadingSpinner = lazy(() => import('../pages/components/LoadingSpinner.jsx'));

const EnrolledCourses = () => {
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
    const cellStyle = 'border border-gray-400 text-left px-4 py-2';
    const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF] font-mono';
    return (
        <Suspense fallback={<LoadingSpinner size='lg'/>}>
            <div>
                <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
                    <label className="text-xl font-semibold text-center font-mono flex justify-center items-center">Khwaja Fareed University of Engineering & Information Technology</label>
                </header>
                <StudentInfo />
                <div className='m-4'>
                <table className='border-collapse border-gray-400 min-w-full border'>
                    <thead>
                        <tr>
                            <th className={headerCellStyle}>Course Code</th>
                            <th className={headerCellStyle}>Course Name</th>
                            <th className={headerCellStyle}>Credit Hours</th>
                            {/* <th className={cellStyle}>Type</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledCourses.map((course) => (
                            <tr>
                                <td className={cellStyle}>{course.code}</td>
                                <td className={cellStyle}>{course.name}</td>
                                <td className={cellStyle}>{course.creditHours}</td>
                                {/* <td className={cellStyle}>
                                
                            </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className='my-4 flex justify-center items-center'>
                    <Link to={'/downloadContents'} className='bg-gradient-to-r text-white p-2 m-2 rounded-lg'>Download Contents</Link>
                </div>
            </div>
        </Suspense>
    )
}

export default EnrolledCourses