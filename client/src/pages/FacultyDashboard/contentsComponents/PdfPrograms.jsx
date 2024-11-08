import React from 'react'

const PdfPrograms = ({index, pdfProgram, deleteCont}) => {
    return (
        <>
            <div key={index} className='relative mt-2 bg-gradient-to-r from-yellow-100 to-yellow-50 bg-opacity-30 border-yellow-800 rounded-md p-4 sm:w-full rounded-b-2xl shadow-md mb-4'>
                <div className="flex flex-col justify-center">
                    <label className='text-white text-lg font-bold'>{pdfProgram.program.name}</label>
                    <label className='text-slate-400 underline'>{pdfProgram.name}</label>
                </div>
                {/* <embed src={"http://localhost:4000"+pdfProgram.pdfFiles.map((url, index) => url)} type="application/pdf" /> */}
                <div className="flex flex-col">
                    {pdfProgram.pdfFiles.map((url, index) => (
                        <div key={index} className='flex flex-col items-center justify-center m-2'>
                            {/* <a href={"http://localhost:4000/api/" + url} target="_blank" rel="noopener noreferrer">
                View/Download PDF {index + 1}
              </a> */}
                            <embed className='m-2 w-full h-96 border border-yellow-500 rounded-md' src={"http://localhost:4000/api/" + url} type="application/pdf" />
                            {/* To delete content */}
                            <button onClick={(e) => { e.preventDefault(); deleteCont(pdfProgram._id, url) }} className='flex items-center text-red-500 hover:bg-red-100 px-4 py-2 rounded-md transition duration-200 ease-in-out'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF0000" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PdfPrograms