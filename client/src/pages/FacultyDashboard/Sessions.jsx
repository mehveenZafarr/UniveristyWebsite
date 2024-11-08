import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OpenContext } from '../components/OpenContext.jsx';

const Sessions = () => {
  const cellStyle = 'border border-gray-400 text-left px-4 py-2';
  const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF] font-mono';
  const [programs, setPrograms] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [courseIndex, setCourseIndex] = useState(null);
  const {setCourses} = useContext(OpenContext);

  const { mutate: getPrograms } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/programs/getAllPrograms', {
          method: "GET"
        });
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
      console.log("Programs: ", data);
      setPrograms(data);
      setCourses(data.map((dt) => dt.courses));
    }
  });
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index); // Toggle the clicked dropdown
  };

  useEffect(() => {
    getPrograms();
  }, []);
  // useEffect(() => {
  //   setCourseIndex()
  // }, [courseIndex]);
  return (
    <div>
      <header className='m-2 rounded-2xl shadow-2xl border-b-2 border-primary p-4 flex justify-center bg-gradient-to-r'>
        <label className='text-lg font-mono text-white'>Programs</label>
      </header>
      <table className='border-collapse border-gray-400 min-w-full border'>
        <thead>
          <tr>
            <th className={headerCellStyle}>Sr.no</th>
            <th className={headerCellStyle}>Name</th>
            <th className={headerCellStyle}>Duration</th>
            <th className={headerCellStyle}>Type</th>
            <th className={headerCellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, index) => (
            <tr key={index}>
              <td className={cellStyle}>{index + 1}</td>
              <td className={cellStyle}>{program.name}</td>
              <td className={cellStyle}>{program.duration}</td>
              <td className={cellStyle}>{program.degreeType}</td>
              <td className={cellStyle}>
                <div className="relative inline-block text-left">
                  <button key={index} onClick={() => toggleDropdown(index)} className="inline-flex justify-center w-full px-4 py-2 bg-gradient-to-r text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  {openDropdownIndex === index && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link onClick={() => setCourseIndex(index)} to={`/courses/${program._id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Courses
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Sessions;