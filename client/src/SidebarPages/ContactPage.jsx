import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { OpenContext } from '../pages/components/OpenContext.jsx';
import { useMutation } from '@tanstack/react-query';

const ContactPage = () => {
  const { oopen } = useContext(OpenContext);
  const [contactDetails, setContactDetails] = useState([]);
  const {mutate:getContactDetails} = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/contact/contactUs');
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
      console.log("Contact details: ", data);
      setContactDetails(data);
    },
    onError: (error) => {
      console.log("contact details error: ",error.message);
    }
  });

  useEffect(() => {
    getContactDetails();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={`relative w-full h-full`}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.2725163064406!2d70.3717798746984!3d28.380835895467428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375efadd8e3573%3A0xf516a4b3e4cb06b8!2sKhwaja%20Fareed%20University%20of%20Engineering%20%26%20Information%20Technology%20(KFUEIT)!5e0!3m2!1sen!2s!4v1725433690006!5m2!1sen!2s" className='w-full h-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className='flex flex-col absolute right-16 bottom-0 bg-secondary opacity-55 p-4 m-4 rounded shadow-lg'>
      {/* <h2 className="text-lg font-bold text-black mb-8">{contactDetails[0]?.uniName}</h2>
      <label>{contactDetails[0]?.address}</label> */}
      <label>tel: {contactDetails[0]?.telephone[0]} / {contactDetails[0]?.telephone[1]}</label>
      <label>email: {contactDetails[0]?.email}</label>
      <label>fax: {contactDetails[0]?.faxNumber}</label>
      </div>
    </div>
  )
}

export default ContactPage