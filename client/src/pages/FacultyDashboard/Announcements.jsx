import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import SubAnnouncement from './SubAnnouncement';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
  const [announceData, setAnnounceData] = useState({
    subject: '',
    description: ''
  });
  const { mutate: makeAnnouncement } = useMutation({
    mutationFn: async ({ subject, description }) => {
      try {
        const res = await fetch("/api/announce/makeAnnouncement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ subject, description })
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
      console.log("Make announcement: ", data);
      setAnnounceData({
        subject: '',
        description: ''
      });
    },
    onError: (error) => {
      console.log("Error in making announcement: ", error.message);
    }
  });
  const { mutate: getAnnouncements } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/announce/getAnnouncements");
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
      // console.log("Announcements: ", data);
      setAnnouncements(data);
      // setOpenAnnouncementDialog(false);
    },
    onError: (error) => {
      console.log("Error in getting announcements: ", error.message);
    },
  });

  useEffect(() => {
    getAnnouncements();
  }, [announcements]);

  const announce = (e) => {
    e.preventDefault();
    console.log("clicking announce.");
    makeAnnouncement(announceData);
  }

  const {mutate:deleteAnnouce} = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/announce/deleteAnnouncement/${id}`, {
          method: "DELETE"
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
      console.log("Deleted successfully: ", data);
    },
    onError: (error) => {
      console.log("Error in deleting announcement: ", error.message);
    }
  });

  const deleteAnnouncement = (e, id) => {
    e.preventDefault();
    deleteAnnouce(id);
  }

  const handleAnnounceInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAnnounceData({
      ...announceData,
      [name]: value || ''
    });
  }
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-b-2xl shadow-md mb-4">
        <h2 className="text-xl font-semibold text-center font-mono">Make an announcement</h2>
      </div>
      <div className="flex flex-col m-2">
        <button onClick={(e) => { e.preventDefault(); setOpenAnnouncementDialog(true); }} className='border border-primary p-4 flex justify-center items-center h-60 w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        {announcements && (
          announcements.map((announcement, index) => (
            <div className='relative mt-2 bg-yellow-100 border-yellow-800 rounded-md p-4 sm:w-full rounded-b-2xl shadow-md mb-4' key={index}>
              <div className="flex flex-col">
                <div className='flex flex-row items-center'>
                  <label className='text-yellow-700 font-bold'>{announcement.subject}</label>
                  {/* To delete announcement */}
                  <button onClick={(e) => deleteAnnouncement(e, announcement._id)} className='bg-transparent absolute top-2 right-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF0000" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>
                </div>
                <label className='text-yellow-700'>{announcement.description}</label>
              </div>
            </div>
          ))
        )}
        <SubAnnouncement openAnnouncementDialog={openAnnouncementDialog} setOpenAnnouncementDialog={setOpenAnnouncementDialog} announceData={announceData} handleAnnounceInput={handleAnnounceInput} announce={announce} />
      </div>
    </div>
  )
}

export default Announcements
