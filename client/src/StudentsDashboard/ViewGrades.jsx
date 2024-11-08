import React, { useRef } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { OpenContext } from '../pages/components/OpenContext.jsx';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import StudentInfo from './components/StudentInfo.jsx';
import { useReactToPrint } from 'react-to-print';

const ViewGrades = () => {
  const { user } = useContext(OpenContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { mutate: getEnrolledCoursesGrades } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/courses/getEnrolledCoursesGrades/${user._id}`);
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
    getEnrolledCoursesGrades();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const cellStyle = 'border border-gray-400 text-left px-4 py-2';
  const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF] font-mono';
  return (
    <div ref={componentRef}>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
        <label className="text-xl font-semibold text-center font-mono flex justify-center items-center">Khwaja Fareed University of Engineering & Information Technology</label>
      </header>
      <StudentInfo />
      {enrolledCourses && (
        // enrolledCourses.map((course) => (
        <div className='m-6'>
          <table className='border-collapse border-gray-400 min-w-full border'>
            <thead>
              <tr>
                <th className={headerCellStyle}>Course Code</th>
                <th className={headerCellStyle}>Course Name</th>
                <th className={headerCellStyle}>Credit Hours</th>
                <th className={headerCellStyle}>Grade</th>
                {/* <th className={cellStyle}>Type</th> */}
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, index) => (
                <tr key={index}>
                  <td className={cellStyle}>{course.code}</td>
                  <td className={cellStyle}>{course.name}</td>
                  <td className={cellStyle}>{course.creditHours}</td>
                  <td className={cellStyle}>
                    {course.grades[0] ? course.grades[0].grade :
                      <label className='text-md font-bold'>Not Assigned Yet!</label>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex items-center justify-center m-4'>
            <button
              onClick={handlePrint}
              className="mt-4 bg-gradient-to-r w-1/2 text-white px-4 py-2 rounded-3xl hover:bg-blue-600">
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewGrades