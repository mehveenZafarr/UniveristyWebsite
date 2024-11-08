import { useMutation } from '@tanstack/react-query'
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { OpenContext } from '../../pages/components/OpenContext';

const LoadingSpinner = lazy(() => import("../../pages/components/LoadingSpinner.jsx"));

const StudentInfo = () => {
    const {user} = useContext(OpenContext);
    const [student, setStudent] = useState(null);
    const {mutate:getInfo} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/auth/getStudentInfo/${user._id}`);
                const data = await res.json();
                if(!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: (data) => {
            console.log("Student Info: ", data);
            setStudent(data);
        },
        onError: (error) => {
            console.log("Error in getting Student Info: ", error.message);
        },
    });

    useEffect(() => {
        getInfo();
    }, []);
    if(!student) {
        return (
            <LoadingSpinner size={"lg"}/>
        );
    }
    return (
        <Suspense fallback={<LoadingSpinner size={"lg"}/>}>
        <div className='bg-[#E6EAFF] m-4 flex justify-center items-center rounded-full'>
            <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center">
            <div className='flex flex-col md:flex-row items-center m-2 p-2 gap-2'>
                <h2 className='font-mono text-xl font-semibold'>Student name:</h2>
                {student?.name}
            </div>
            <div className='flex flex-col md:flex-row items-center m-2 p-2 gap-2'>
                <h2 className='font-mono text-xl font-semibold'>Email:</h2>
                {student?.email}
            </div>
            </div>
        </div>
        </Suspense>
    )
}

export default StudentInfo