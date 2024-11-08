import React from 'react'

const SubAnnouncement = ({ openAnnouncementDialog, setOpenAnnouncementDialog, announceData, handleAnnounceInput, announce }) => {
    return (
        <>
            {openAnnouncementDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded shadow-lg max-w-sm'>
                        <div className='border-primary border-2 m-2 p-4 flex flex-col'>
                            <label htmlFor='subject' className='font-mono font-bold underline'>Subject</label>
                            <input
                                type="text" id='subject'
                                className="text-black border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                value={announceData.subject}
                                placeholder='for example: Stipend Collection'
                                name='subject' onChange={(e) => handleAnnounceInput(e)} />
                            <label htmlFor='description' className='font-mono font-bold underline'>Description</label>
                            <textarea
                                type="text" id='description'
                                className="text-black border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                value={announceData.description}
                                placeholder='for example: Collect it...' name='description' onChange={(e) => handleAnnounceInput(e)} />
                            <div className='flex flex-row justify-center items-center'>
                                <button onClick={(e) => announce(e)} className='bg-gradient-to-r text-white p-2 m-2 rounded-full'>
                                    <label className='m-2'>Announce</label>
                                </button>
                                <button onClick={(e) => { e.preventDefault(); setOpenAnnouncementDialog(false); }} className='bg-red-600 text-white p-2 m-2 rounded-full'>
                                    <label className='m-2'>Close</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SubAnnouncement