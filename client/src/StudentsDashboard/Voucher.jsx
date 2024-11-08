import React, { useContext, useEffect, useRef, useState } from 'react'
import { OpenContext } from '../pages/components/OpenContext';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../pages/components/LoadingSpinner';
import { useReactToPrint } from 'react-to-print';
import SubVoucherWidget from './SubVoucherWidget';

const Voucher = () => {
    const { user } = useContext(OpenContext);
    const componentRef = useRef();

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
                <label className="text-xl font-semibold text-center font-mono flex justify-center items-center">Download your Voucher</label>
            </header>
            <div ref={componentRef} className="print-container ml-6 mr-6 flex flex-col gap-4">
                <div className="voucher flex flex-row">
                    <SubVoucherWidget programName={programName} title="Student Copy" />
                    <SubVoucherWidget programName={programName} title="Department Copy" />
                    <SubVoucherWidget programName={programName} title="Bank Copy" />
                </div>
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

export default Voucher