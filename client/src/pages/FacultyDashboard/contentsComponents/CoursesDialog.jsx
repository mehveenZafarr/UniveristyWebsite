import React from 'react'

const CoursesDialog = ({selectedprogram, selectedcoursename, uploadpdf, pdfuploadmessage, closecoursesdialog, handlecoursechange}) => {
    return (
        <>
            {/* {isCoursesDialogOpen && selectedProgram && selectedProgram.courses && ( */}
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                        <div className='flex flex-col p-4 gap-2'>
                            <label htmlFor="courses" className="text-xl font-semibold mb-2 font-mono">
                                {selectedprogram.name} - Courses
                            </label>
                            {/* <label className='mb-2'>{"(Press Ctrl + click for multiple course)"}</label> */}
                        </div>
                        <div className='flex flex-col gap-4'>
                            <select
                                name="courses"
                                id="courses"
                                onChange={(e) => handlecoursechange(e)}
                                className="w-full p-2 border rounded"
                                value={selectedcoursename ? selectedcoursename : ""}
                            >
                                <option value="" disabled>Select a course</option> {/* Placeholder option */}
                                {selectedprogram.courses.map((course, index) => (
                                    <option key={index} value={course.name} className='mb-2' data-id={course._id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                            <div className='flex justify-center items-center'>
                                <div className='flex h-16 w-36 justify-center items-center border border-primary'>
                                    <label>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <input type="file" hidden multiple name='fileUpload' onChange={uploadpdf} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {pdfuploadmessage && (
                            <label className='m-4 text-green-700 text-sm flex items-center justify-center'>{pdfuploadmessage}</label>
                        )}
                        <button
                            onClick={closecoursesdialog}
                            className="mt-4 w-full px-4 py-2 bg-gradient-to-r text-white rounded-full">
                            Close
                        </button>
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default CoursesDialog