import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const roleNames = ["admin", "student"];
    // const roleNames = ["admin", "student", "faculty"];
    const createFieldSet = ({ inputName, inputValue, inputPlaceHolder }) => {
        return (
            <fieldset className='border border-gray-300 px-4 mr-2 rounded-lg mb-2'>
                <legend className='text-sm font-medium text-white'>
                    {roleNames.includes(inputName) ? "ROLE" : inputName.toUpperCase()}
                </legend>
                {roleNames.includes(inputName) ? (
                    <label className="p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.role.includes(inputName)}
                            name={inputName}
                            onChange={handleCbClick}
                        />
                        <span className='text-gray-400'>{inputName.toUpperCase()}</span>
                    </label>
                ) : (
                    <input
                        onChange={(e) => handleInputChange(e)}
                        type={inputName.includes("password") ? "password" : "text"} 
                        name={inputName}
                        value={inputValue}
                        placeholder={inputPlaceHolder}
                        className="w-full p-2 mt-2 border border-gray-400 rounded-lg bg-gray-200 text-gray-900"
                    />
                )}
            </fieldset>
        );
    }

    const { mutate: registerUser } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
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
            console.log("Register User: ", data);
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate(`/${data.user?.role}-dashboard`);
        },
        onError: (error) => {
            console.log("Error in register user: ", error.message);
            alert(error.message);
        }
    });

    const handleCbClick = (e) => {
        const { checked, name } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            role: checked ? name : '' // Set role to the checkbox name if checked, otherwise to an empty string
        }));
    }

    const handleInputChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || ''
        });
    }
    const register = (e) => {
        e.preventDefault();
        console.log("Submitting register form!");
        registerUser(formData);
    }
    return (
        <div className='relative h-screen'>
            {/* background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/loginBackgroundImage.jpg')` }}>
                {/* Overlay */}
                <div className='absolute inset-0 bg-slate-900 opacity-65'></div>
                {/* Centered Form */}
                <form onSubmit={register}>
                    <div className="relative flex justify-center items-center h-full px-4">
                        <div className='bg-slate-700 bg-opacity-75 p-8 rounded-lg m-4'>
                            <div className="flex flex-col pb-2">
                                <label className="text-4xl text-white font-bold pb-2">
                                    Create new account
                                    <span className='dotColor'>.</span>
                                </label>
                                <label className='text-sm text-gray-400'>
                                    Already a member?
                                    <Link to={'/login'} className='dotColor px-2'>Log In</Link>
                                </label>
                            </div>
                            {/* ==================Name field===================== */}
                            {/* <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row'>
                            <div>
                                {createFieldSet({ inputName: 'name', inputValue: formData.name, inputPlaceHolder: "Enter name" })}
                            </div> */}
                            {/*=================ROLE=====================  */}
                            {/* <div>
                                <fieldset className='border border-gray-300 px-4 mr-2 rounded-lg mb-2'>
                                    <legend className='text-sm font-medium text-white'>
                                        ROLE
                                    </legend>
                                    <div className='flex flex-col items-center'>
                                        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row'>
                                            
                                            <label className="p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.role.includes("student")}
                                                    name="student"
                                                    onChange={handleCbClick}
                                                />
                                                <span className='text-gray-400'>STUDENT</span>
                                            </label>
                                            <label className="p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.role.includes("admin")}
                                                    name="admin"
                                                    onChange={handleCbClick}
                                                />
                                                <span className='text-gray-400'>ADMIN</span>
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div> */}
                            {/* </div> */}
                            {/* ================= Email =================== */}
                            <div className="flex flex-col">
                                {createFieldSet({ inputName: 'name', inputValue: formData.name, inputPlaceHolder: "Enter name" })}
                                {createFieldSet({ inputName: 'email', inputValue: formData.email, inputPlaceHolder: "Enter email" })}
                                {createFieldSet({ inputName: 'password', inputValue: formData.password, inputPlaceHolder: "Enter password" })}
                            </div>
                            {/* ================== Sign Up ================= */}
                            <button className="primary">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage