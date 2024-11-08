import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { OpenContext } from '../pages/components/OpenContext';

const RegisterCourse = () => {
    const [isProgramsDialogOpen, setIsProgramsDialogOpen] = useState(false);
    const [isCoursesDialogOpen, setIsCoursesDialogOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseIds, setCourseIds] = useState([]);
    const {user} = useContext(OpenContext);

    // Fetch programs using react-query mutation
    const { mutate: getAllPrograms } = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/programs/getAllPrograms");
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong!");
            }
            return data;
        },
        onSuccess: (data) => {
            console.log("Course registration programs: ", data);
            setPrograms(data);
        },
    });

    const {mutate: enrollInCourses} = useMutation({
        mutationFn: async (ids) => {
            try {
                const res = await fetch(`/api/courses/enroll/${user._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({courseIds: ids})
                });
                console.log("Inside Enrollment");
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
            console.log("Enroll status: ", data);
            alert("Enrolled Successfully!");
            setSelectedCourses([]);
        },
        onError: (error) => {
            console.log("Enrollment error: ", error.message);
            alert(error.message);
        }
    });

    const enroll = (e) => {
        e.preventDefault();
        
        // Log courseIds to verify it's populated before calling enrollInCourses
        console.log("Selected course IDs: ", courseIds);
    
        // Ensure courseIds is being passed
        if (courseIds && courseIds.length > 0) {
            enrollInCourses(courseIds); // Pass the courseIds to the mutation
        } else {
            console.log("No course IDs selected for enrollment.");
        }
    };

    useEffect(() => {
        console.log("User id is: ", user._id);
    }, [user]);

    useEffect(() => {
        getAllPrograms();
    }, []);

    const openProgramsDialog = (e) => {
        e.preventDefault();
        setIsProgramsDialogOpen(true);
    };

    const closeProgramsDialog = () => {
        setIsProgramsDialogOpen(false);
        setSelectedProgram(null);
    };

    const openCoursesDialog = (program) => {
        setSelectedProgram(program);
        setIsCoursesDialogOpen(true);
        console.log("Courses Ids: ", courseIds);
    };

    const closeCoursesDialog = () => {
        setSelectedProgram(null);
        setIsCoursesDialogOpen(false);
    };

    const handleCourseChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedCourseNames = selectedOptions.map(option => option.value);
        const selectedCourseIds = selectedOptions.map(option => option.dataset.id);

        setSelectedCourses(selectedCourseNames);
        setCourseIds(selectedCourseIds);
    };


    useEffect(() => {
        console.log("Selected Courses: ", selectedCourses);
        console.log("Selected Ids: ", courseIds);
    }, [selectedCourses, courseIds]);

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
                <h2 className="text-xl font-semibold text-center font-mono">Register Courses</h2>
            </div>
            <div className="border border-primary flex flex-col gap-6 m-8">
                <header className="bg-[#337AB7] p-4">
                    <button onClick={(e) => openProgramsDialog(e)} className="p-2 rounded-lg">
                        Choose courses
                    </button>
                </header>
                {selectedCourses.length > 0 && (
                    <div>
                        {selectedCourses.map((course, index) => (
                            <div key={index} className='mb-2 border-b-2'>
                                <label className='ml-4'>{course}</label>
                            </div>
                        ))}
                        <div className="flex justify-center items-center">
                            <button onClick={(e) => enroll(e)} className='p-4 rounded-2xl shadow-lg'>Enroll Now</button>
                        </div>
                    </div>
                )}
                <div className="p-2 bg-slate-400">
                    <label>If you cannot see your section, please contact your department.</label>
                </div>
            </div>

            {/* Programs Dialog */}
            {isProgramsDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                        <label htmlFor="programs" className="text-xl font-semibold mb-4">
                            Available Programs
                        </label>
                        <select
                            name="programs"
                            id="programs"
                            value={selectedProgram ? selectedProgram.name : ""}
                            onChange={(e) => {
                                const selectedProgram = programs.find(program => program.name === e.target.value);
                                openCoursesDialog(selectedProgram);
                            }}
                            className="w-full p-2 border rounded"
                        >
                            <option value="" disabled>Select a program</option> {/* Placeholder option */}
                            {programs.map((program, index) => (
                                <option key={index} value={program.name}>
                                    {program.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={closeProgramsDialog}
                            className="mt-4 px-4 py-2 bg-gradient-to-r text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Courses Dialog */}
            {isCoursesDialogOpen && selectedProgram && selectedProgram.courses && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                        <div className='flex flex-col'>
                            <label htmlFor="courses" className="text-xl font-semibold mb-2 font-mono">
                                {selectedProgram.name} - Courses
                            </label>
                            <label className='mb-2'>{"(Press Ctrl + click for multiple course)"}</label>
                        </div>
                        <select
                            name="courses"
                            id="courses"
                            multiple // Allow multiple course selection
                            size={10} // Size to show more options at once
                            onChange={handleCourseChange}
                            className="w-full p-2 border rounded"
                        >
                            {selectedProgram.courses.map((course, index) => (
                                <option key={index} value={course.name} className='mb-2' data-id={course._id}>
                                    {"=>"} {course.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={closeCoursesDialog}
                            className="mt-4 px-4 py-2 bg-gradient-to-r text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterCourse;