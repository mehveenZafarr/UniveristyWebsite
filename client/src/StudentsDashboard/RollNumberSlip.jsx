import { useMutation } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { OpenContext } from '../pages/components/OpenContext.jsx';
import LoadingSpinner from '../pages/components/LoadingSpinner.jsx';
import { useReactToPrint } from 'react-to-print';
import StudentInfo from './components/StudentInfo.jsx';

const RollNumberSlip = () => {

    const { user } = useContext(OpenContext);
    const cellStyle = 'border border-gray-400 text-left px-4 py-2';
    const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF]';
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const componentRef = useRef();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); //it will update the time every second

        return () => clearInterval(intervalId);
    }, []);

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [programName, setProgramName] = useState('');

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
            data.map((dt) => (
                setProgramName(dt.program.name)
            ));
            console.log("User: ", user);
            setEnrolledCourses(data);
        },
        onError: (error) => {
            console.log("Error in roll number slip: ", error.message);
        }
    });
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    if (enrolledCourses.length < 0) {
        return (
            <LoadingSpinner size='lg' />
        );
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
                <label className="text-xl font-semibold text-center font-mono flex justify-center items-center">Your Roll Number Slip</label>
            </header>
            <div ref={componentRef} className='m-6 flex flex-col gap-4'>
                <div className='border flex flex-col gap-4 justify-center items-center'>
                    <label className='text-2xl font-mono font-semibold'>Khwaja Fareed UEIT</label>
                    <label>Generate Date & Time: {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</label>
                </div>
                <StudentInfo/>
                {/* <table>
                    <tbody>
                        <tr>
                            <td className={`${cellStyle}`}>
                                <div className='flex flex-row gap-2'>
                                    <label className='font-bold'>Student name:</label>
                                    <label>{user.name}</label>
                                </div>
                            </td>
                            
                        </tr>
                        <tr>
                            <td className={`${cellStyle}`}>
                                <div className='flex flex-row gap-2'>
                                    <label className='font-bold'>Program name:</label>
                                    <label>{programName}</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> */}
                <table className='border-collapse border-gray-400 min-w-full border'>
                    <thead>
                        <tr>
                            <th className={headerCellStyle}>Course Code</th>
                            <th className={headerCellStyle}>Course Name</th>
                            <th className={headerCellStyle}>Credit Hours</th>
                            {/* <th className={headerCellStyle}>Type</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledCourses.map((course, index) => (
                            <tr key={index}>
                                <td className={cellStyle}>{course?.code}</td>
                                <td className={cellStyle}>{course?.name}</td>
                                <td className={cellStyle}>{course?.creditHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-center m-4'>
                <button
                    onClick={handlePrint}
                    className="mt-4 bg-gradient-to-r w-1/2 text-white px-4 py-2 rounded-3xl hover:bg-blue-600">
                    Print
                </button>
            </div>
        </div>
    )
}

export default RollNumberSlip