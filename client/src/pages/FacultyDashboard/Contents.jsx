import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useEffect } from 'react';
import CoursesDialog from './contentsComponents/coursesDialog';
import ContentDialog from './contentsComponents/ContentDialog';
import PdfPrograms from './contentsComponents/PdfPrograms';

const Contents = () => {
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [isCoursesDialogOpen, setIsCoursesDialogOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [pdfUploadMessage, setPdfUploadMessage] = useState('');
  const [pdfPrograms, setPdfPrograms] = useState('');


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

  useEffect(() => {
    getAllPrograms();
  }, []);

  const openCoursesDialog = (program) => {
    setSelectedProgram(program);
    setIsCoursesDialogOpen(true);
  };

  const closeCoursesDialog = () => {
    setIsCoursesDialogOpen(false);
    setSelectedProgram(null);
    setPdfUploadMessage('');
    setSelectedCourseName(null);
    setSelectedCourseId(null);
  };

  // useEffect(() => {
  //   if (selectedCourseId) {
  //     console.log("Course ID updated: ", selectedCourseId);
  //   }
  // }, [selectedCourseId]);


  const handleCourseChange = (e) => {
    const selectedOptions = e.target.selectedOptions;
    if (selectedOptions) {
      const selectedOption = selectedOptions[0];
      const courseName = selectedOption.value;
      setSelectedCourseName(courseName);
      const selCourseId = selectedOption.getAttribute('data-id');
      if (selCourseId) {
        setSelectedCourseId(selCourseId);
        console.log("Selected Course Id: ", selCourseId);
        console.log("Selected Course name: ", courseName);
      }

    }
    console.log("Selected Options: ", selectedOptions[0]);
  };

  const closeContentDialogue = (e) => {
    e.preventDefault();
    setOpenContentDialog(false);
    setSelectedProgram(null);
  }

  const { mutate: uploadPdfFiles } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch(`/api/courses/upload-pdf/${selectedCourseId}`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        console.log("upload pdf from device: ", data);
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        alert(error.message);
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      console.log("Uploading pdf successfully: ", data);
      setPdfUploadMessage(data.message);
    },
  });

  const { mutate: getCoursesWithPdfs } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/courses//course-with-pdfs");
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
      console.log("Courses with Pdfs: ", data);
      console.log("Urls pdf: ", data.map((dt) => dt.pdfFiles.map((url, index) => url)));
      setPdfPrograms(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    getCoursesWithPdfs();
  }, [pdfPrograms]);

  const uploadPdf = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('pdfs', file));
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    uploadPdfFiles(formData);
    console.log("Files from formData: ", { files });
  }

  const { mutate: deleteContent } = useMutation({
    mutationFn: async ({id, url}) => {
      try {
        const res = await fetch(`/api/courses/${id}/removePdf`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({pdfFileUrl: url})
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
      console.log("Response on deleting content: ", data);
    },
    onError: (error) => {
      console.log("Error in deleting content: ", error.message);
    },
  });

  const deleteCont = (id, url) => {
    deleteContent({id: id, url: url});
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
        <h2 className="text-xl font-semibold text-center font-mono">Upload Contents</h2>
      </div>
      <div className="flex flex-col m-2">
        <button onClick={(e) => { e.preventDefault(); setOpenContentDialog(true); }} className='border border-primary p-4 flex justify-center items-center h-60 w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      {pdfPrograms && pdfPrograms.map((pdfProgram, index) => (
        <PdfPrograms index={index} pdfProgram={pdfProgram} deleteCont={deleteCont}/>
      ))}
      {openContentDialog && (
        <ContentDialog selectedProgram={selectedProgram} openCoursesDialog={openCoursesDialog} programs={programs} closeContentDialogue={closeContentDialogue} />
      )}
      {/* Courses Dialog */}
      {isCoursesDialogOpen && selectedProgram && selectedProgram.courses && (
        <CoursesDialog selectedprogram={selectedProgram} selectedcoursename={selectedCourseName} uploadpdf={uploadPdf} pdfuploadmessage={pdfUploadMessage} closecoursesdialog={closeCoursesDialog} handlecoursechange={handleCourseChange} />
      )}
    </div>
  )
}

export default Contents