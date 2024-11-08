import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"

const Courses = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const cellStyle = 'border border-gray-400 text-left px-4 py-2';
    const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF] font-mono';
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(index === openDropdownIndex ? null : index); // Toggle the clicked dropdown
      };

    useEffect(() => {
        console.log('Program Id: ', id);
    }, [id]);

    const { mutate: getProgramCourses } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/programs/getProgramCourses/${id}`);
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
            console.log("Program Courses: ", data);
            setCourses(data);
        },
    });
    useEffect(() => {
        getProgramCourses();
    }, []);
    
    return (
        <div className="m-4">
            <header className='m-2 rounded-2xl shadow-2xl border-b-2 border-primary p-4 flex justify-center bg-gradient-to-r'>
                <label className='text-lg font-mono text-white'>Courses</label>
            </header>
            <table className='border-collapse border-gray-400 min-w-full border'>
                <thead>
                    <tr>
                        <th className={headerCellStyle}>Code</th>
                        <th className={headerCellStyle}>Credit Hours</th>
                        <th className={headerCellStyle}>Name</th>
                        <th className={headerCellStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                    <tr key={index}>
                        <td className={cellStyle}>{course.code}</td>
                        <td className={cellStyle}>{course.creditHours}</td>
                        <td className={cellStyle}>{course.name}</td>
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
                        <Link to={`/attendence/${course._id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Mark Attendence
                        </Link>
                        <Link to={`/grades/${course._id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Assign Grades
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

export default Courses