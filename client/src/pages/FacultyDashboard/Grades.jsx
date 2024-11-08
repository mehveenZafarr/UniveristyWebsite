import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Grades = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate: getCourse } = useMutation({
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
      console.log("Get Course details: ", data);
      setSelectedCourse(data);
      handleCourseSelect(data);
    }
  });
  useEffect(() => {
    console.log("Grades Page");
    getCourse();
  }, []);

  const handleCourseSelect = (course) => {
    console.log("handleCourseSelect executing!");
    setSelectedCourse(course);
    // Initialize grades with existing grades or empty values
    const initialGrades = {};
    course.students.forEach(student => {
      initialGrades[student._id] = course.grades.find(g => g.student === student._id)?.grade || '';
    });
    setGrades(initialGrades);
  };

  const {mutate:putGrades} = useMutation({
    mutationFn: async (gradesData) => {
      try {
        const res = await fetch(`/api/courses/${selectedCourse._id}/grades`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({grades: gradesData})
        });
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
      console.log("Put Grades: ", data);
      navigate('/admin-dashboard');
    },
  });

  const handleAssignGrades = async (grades) => {
    try {
      // Prepare the data in the required format
      const gradesData = Object.entries(grades).map(([studentId, grade]) => ({
        student: studentId,
        grade,
      }));
      putGrades(gradesData);
    } catch (error) {
      console.error('Error assigning grades:', error);
      alert('Failed to assign grades.');
    }
  };
  

  return (
    <div>
      {selectedCourse && (
        <div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
            <h2 className='text-xl font-semibold text-center font-mono'>{selectedCourse.name} - Assign Grades</h2>
          </div>
          <div className='flex justify-center mb-4'>
            <div className='bg-blueGray text-blue-600 font-medium py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition'>
              <h1>Students</h1>
            </div>
          </div>
          {selectedCourse.students.map(student => (
            <div className='bg-blueGray border border-primary shadow-md m-4 p-4 rounded-lg'>
              <div className='max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-md mb-6' key={student._id}>
                <label className='text-lg font-semibold mb-2'>Student Name :</label>
                <label className='px-2'>
                  {student.name} <br />
                  <input
                    className='bg-gray-200 p-4 rounded-lg shadow-inner'
                    type="text"
                    value={grades[student._id] || ''}
                    onChange={(e) =>
                      setGrades({
                        ...grades,
                        [student._id]: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button onClick={() => handleAssignGrades(grades)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Assign Grades
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Grades