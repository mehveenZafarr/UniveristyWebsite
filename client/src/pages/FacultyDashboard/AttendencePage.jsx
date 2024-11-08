import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AttendencePage = () => {
  const { id } = useParams();
  const cellStyle = 'border border-gray-400 text-left px-4 py-2';
  const headerCellStyle = 'border border-gray-400 text-left px-4 py-2 bg-[#E6EAFF] font-mono';
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate();
  // State to handle attendance for each student
  const [attendanceData, setAttendanceData] = useState([]);

  const { mutate: getEnrolledStudents } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/courses/getCourse/${id}`);
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
      console.log("Enrolled Students: ", data);
      setEnrolledStudents(data.students);
      setCourseName(data.name);
      setAttendanceData(data.students.map(() => ({
        attendance: '', // Initialize attendance as empty
      })));
    }
  });

  const { mutate: getAttendances } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/attendance/getAttendances');
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
      console.log("getting attendences", data);
      // Initialize attendance data based on fetched students
      // setAttendanceData(
      //   data.map((student) => ({
      //     studentId: student._id,
      //     attendance: student.status || '', // 'P' for present, 'A' for absent, etc.
      //   }))
      // );
      setAttendanceData((prevAttendanceData) =>
        prevAttendanceData.map((student, index) => {
          const foundAttendance = data.find((a) => a.studentId === enrolledStudents[index]?._id);
          return {
            ...student,
            attendance: foundAttendance ? foundAttendance.status : student.attendance,
          };
        })
      );
      // setAttendanceData((prevAttendanceData) =>
      //   prevAttendanceData.map((student, index) => {
      //     // Find the attendance entry for the current student
      //     const foundAttendance = data.find((a) => a.studentId === student.studentId);
    
      //     return {
      //       ...student,
      //       attendance: foundAttendance ? foundAttendance.status : student.attendance || '', // Use existing attendance if not found
      //     };
      //   })
      // );
    },
  });
  // const { mutate: markAttendance } = useMutation({
  //   mutationFn: async () => {
  //     try {
  //       const res = await fetch('/api/attendance/mark', {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({})
  //       });
  //       const data = await res.json();
  //       if (!res.ok) {
  //         throw new Error(data.error || "Something went wrong!");
  //       }
  //       return data;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  //   onSuccess: (data) => {
  //     console.log("getting attendences", data);
  //   },
  // });

  const { mutate: markAttendance } = useMutation({
    mutationFn: async (attendanceData) => {
      try {
        const res = await fetch('/api/attendance/mark', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(attendanceData)  // Send attendance data
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
      console.log("Attendance marked successfully", data);
      navigate('/admin-dashboard');
    },
  });
  

  const handleAttendanceChange = (index, value) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index].attendance = value;
    setAttendanceData(updatedAttendance);
  };

  useEffect(() => {
    getEnrolledStudents();
    getAttendances();
  }, []);

  // const mark = (e) => {
  //   e.preventDefault();
  //   console.log("Marking!");
  // };
  const mark = (e) => {
    e.preventDefault();
    
    const attendanceToMark = enrolledStudents.map((student, index) => ({
      student: student._id,      // Use student ID
      course: id,                // Course ID from params
      status: attendanceData[index]?.attendance || 'A'  // Default to 'A' if not marked
    }));
  
    // Call the mutation to mark attendance
    markAttendance(attendanceToMark);
  };
  
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
        <h2 className='text-xl font-semibold text-center font-mono'>{courseName} - Mark Attendance</h2>
      </div>
      <div className='m-4'>
        <table className='border-collapse border-gray-400 min-w-full border'>
          <thead>
            <tr>
              <th className={headerCellStyle}>Sr.no</th>
              <th className={headerCellStyle}>Name</th>
              <th className={`${headerCellStyle} hidden sm:table-cell`}>Email</th>
              <th className={headerCellStyle}>Attendence</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((Student, index) => (
              <tr key={index}>
                <td className={cellStyle}>{index + 1}</td>
                <td className={cellStyle}>{Student.name}</td>
                <td className={`${cellStyle} hidden sm:table-cell`}>{Student.email}</td>
                <td className={cellStyle}>
                  <input type="text" value={attendanceData[index]?.attendance || ""} onChange={(e) => {e.preventDefault(); handleAttendanceChange(index, e.target.value)}} placeholder="P / A" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center items-center m-2'>
        <button onClick={(e) => mark(e)} className='bg-gradient-to-r text-white w-1/2 m-4 p-4 rounded-3xl font-mono'>Submit</button>
      </div>
    </div>
  )
}

export default AttendencePage