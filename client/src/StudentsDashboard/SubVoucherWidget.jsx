import React, { useContext, useEffect, useState } from 'react'
import { OpenContext } from '../pages/components/OpenContext.jsx';

const SubVoucherWidget = ({ programName, title }) => {
    const { user } = useContext(OpenContext);

    const tAmount = 5000;
    const IAmount = 10000;
    const tuAmount = 30000;

    const cellStyle = 'border border-gray-400 text-left px-4 py-2';
    const [currentDateTime, setCurrentDateTime] = useState(new Date());


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); //it will update the time every second

        return () => clearInterval(intervalId);
    }, []);

    const reuseableDiv = ({ value, text }) => {
        return (
            <div className={`${text === "Tuition Fee:" ? "" : "border-b-2"} flex flex-row items-center`}>
                <div className='m-4 gap-2 flex flex-row'>
                    <label className='font-semibold'>{text}</label>
                    <label>
                        {value}
                    </label>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full bg-blueGray'>
            <div className="flex items-center border border-black justify-center p-2 m-2 font-mono bg-[#E6EAFF]">
                <label className='text-sm'>{title}</label>
            </div>
            <div className='border flex flex-col gap-4 justify-center items-center'>
                <label className='text-2xl font-mono font-semibold'>Khwaja Fareed UEIT</label>
                <label>Generate Date & Time: {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</label>
            </div>

            <table className='w-full'>
                <tbody>
                    <tr>
                        <td className={`${cellStyle}`}>
                            <div className='flex flex-row gap-2'>
                                <label className='font-bold'>Student name:</label>
                                <label>{user.name}</label>
                            </div>
                        </td>
                        {/* <td className={cellStyle}>{user}</td> */}
                    </tr>
                    <tr>
                        <td className={`${cellStyle}`}>
                            <div className='flex flex-row gap-2'>
                                <label className='font-bold'>Program name:</label>
                                <label>{programName}</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={`${cellStyle}`}>
                            <div className='flex flex-row gap-2'>
                                <label className='font-bold'>Account Title:</label>
                                <label>Kfueit Finance</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={`${cellStyle}`}>
                            <div className='flex flex-row gap-2'>
                                <label className='font-bold'>Account Number:</label>
                                <label>000111222333</label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='border-collapse border-gray-400 min-w-full border flex flex-col'>
                {reuseableDiv({ text: "Transport Fee:", value: tAmount })}
                {reuseableDiv({ text: "Internet Fee:", value: IAmount })}
                {reuseableDiv({ text: "Tuition Fee:", value: tuAmount })}
            </div>
            <table className='w-full'>
                <tbody>
                    <tr>
                        <td className={cellStyle}>
                            <div className='flex flex-row gap-2'>
                                <label className='font-semibold'>Total Amount:</label>
                                {tAmount + IAmount + tuAmount}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SubVoucherWidget