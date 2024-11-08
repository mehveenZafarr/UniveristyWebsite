import React, { useEffect, useRef, useState, lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDisclosure, useQuery } from '@chakra-ui/react';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenContext } from './components/OpenContext.jsx';

const Drawerr = lazy(() => import('./components/Drawer.jsx'));

const Layout = ({ authUser }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const drawerRef = useRef(null);
    const naviagte = useNavigate();
    const queryClient = useQueryClient();
    const { setUser, dash } = useContext(OpenContext);

    const [placement, setPlacement] = useState('top');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    // Automatically update placement based on screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setPlacement(isMobile ? 'top' : 'left');
    }, [isMobile]);

    // Close drawer when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/auth/logout', {
                    method: "POST"
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                setUser(null);
                // return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            console.log("Logout successfully!");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            naviagte('/login');
            // <Navigate to={'/login'}/>
        },
        onError: (error) => {
            console.log("Error in logout! ", error);
        }
    });

    return (
        <>
            <header className='bg-primary h-12 flex items-center px-2 justify-between'>
                {!isOpen &&
                    <>
                        {/* div className='flex flex-row justify-between' */}
                        <button className='bg-transparent relative shadow-lg flex items-center justify-center w-10 h-8 transition z-20' colorscheme="blue" onClick={onOpen}>
                            <img
                                src="/sideBarButton2.png"
                                alt="Toggle"
                                className="w-full h-full transform transition-transform duration-200 object-cover"
                                style={{
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    // filter: 'invert(100%) sepia(1) saturate(5) hue-rotate(180deg)'
                                }}
                            />
                        </button>
                        {!isMobile && (
                            <div className='text-white flex justify-center w-96 p-10 mx-2'>
                                <label className='text-lg font-bold font-mono'>MY KFUEIT</label>
                            </div>
                        )}
                        {authUser && dash && (
                            <div className='w-36 moving-text-container'>
                                <div className='moving-text text-white sm:text-sm font-mono'>
                                    Welcome to MYKFUEIT DASHBOARD
                                </div>
                            </div>
                        )}
                        {!isMobile && (
                            <div className='text-white  w-96 p-10 font-semibold font-mono'>Welcome {authUser?.name.toUpperCase()}</div>
                        )}
                        {authUser && (
                            <BiLogOut onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }} className={`text-white ${dash? "size-11" : "size-8"} font-bold mx-2`} />
                        )}
                    </>
                }
            </header>
            <div className="flex flex-row h-screen bg-white overflow-hidden">
            {/* <div className="flex flex-row h-screen bg-primary overflow-hidden"> */}
                {/* <div><Drawerr isMobile={isMobile} placement={placement} isOpen={isOpen} onOpen={onOpen} onClose={onClose} drawerRef={drawerRef} /></div> */}
                <Suspense fallback={<LoadingSpinner size='lg' />}>
                    <div>
                        <Drawerr authUser={authUser} isMobile={isMobile} placement={placement} isOpen={isOpen} onOpen={onOpen} onClose={onClose} drawerRef={drawerRef} />
                    </div>
                </Suspense>
                {/* <div className="flex-grow overflow-auto border border-gray-300"><Outlet /></div> */}
                <div className="flex-grow overflow-auto border border-gray-300">
                    <Suspense fallback={<LoadingSpinner size='lg' />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div></>
    )
}

export default Layout