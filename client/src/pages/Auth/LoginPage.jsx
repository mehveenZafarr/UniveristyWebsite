import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const queryClient = useQueryClient();
    const createFieldSet = ({ inputName, inputValue, inputPlaceHolder }) => {
        return (
            <fieldset className='border border-gray-300 px-4 rounded-lg mb-2'>
                <legend className='text-sm font-medium text-white'>{inputName.toUpperCase()}</legend>
                <input onChange={(e) => handleInputChange(e)} type={inputName.includes("password") ? "password" : "text"}  name={inputName} value={inputValue} placeholder={inputPlaceHolder} />
            </fieldset>
        );
    }

    const navigate = useNavigate();

    const {mutate:loginUser} = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch('/api/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(formData)
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
            console.log("Login successful!");
            console.log("Login data: ", data);
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            // navigate(`${data.role}-`)
        },
        onError: (error) => {
            console.log("Login failed!: ", error.message);
        },
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || ''
        });
    }
    const login = (e) => {
        e.preventDefault();
        console.log("Logging!");
        loginUser(formData);
    }

    return (
        <div className="relative h-full">
        {/* <div className="relative h-screen"> */}
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/loginBackgroundImage.jpg')` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900 opacity-65"></div>
                {/* Centered form */}
                <div className="relative flex justify-center items-center h-full px-4">
                    <form onSubmit={login}>
                        <div className='bg-slate-700 bg-opacity-75 p-8 rounded-lg'>
                            <div className='flex flex-col pb-2'>
                                <label className='text-4xl text-white font-bold pb-2'>
                                    Let's Login
                                    <span className='dotColor'>.</span>
                                </label>
                                <label className='text-sm text-gray-400'>
                                    Don't have an account?
                                    <Link to={'/register'} className='dotColor px-2'>Sign Up</Link>
                                </label>
                            </div>
                            {createFieldSet({ inputName: 'email', inputValue: formData.email, inputPlaceHolder: "Enter email", handleInputChange:{handleInputChange} })}
                            {createFieldSet({ inputName: 'password', inputValue: formData.password, inputPlaceHolder: "Enter password" })}
                            <button className='primary'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;