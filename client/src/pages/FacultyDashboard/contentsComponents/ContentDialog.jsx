import React from 'react'

const ContentDialog = ({selectedProgram, openCoursesDialog, programs, closeContentDialogue}) => {
  return (
    <>
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white rounded p-6 max-w-sm'>
            <div className='flex flex-col gap-2 p-4'>
              <label className='font-bold font-mono text-xl'>Upload Content as Students can access them</label>
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
              {/* Close Content dialogue */}
              <button onClick={(e) => closeContentDialogue(e)} className='bg-gradient-to-r text-white rounded-full p-2'>Close</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default ContentDialog