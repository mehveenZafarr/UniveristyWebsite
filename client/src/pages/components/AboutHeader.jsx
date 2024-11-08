import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import AboutPage from '../Auth/SidebarPages/AboutPage.jsx';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner.jsx';

const AboutPage = lazy(() => import('../../SidebarPages/AboutPage.jsx'));

const AboutHeader = () => {
    const [aboutHeaderTitles, setAboutHeaderTitles] = useState([]);
    const [aboutUsForm, setAboutUsForm] = useState({
        aboutHeaderTitles: [],
        description: {
            heading: '',
            content: ''
        }
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isSticky = () => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        if (scrollTop >= 250) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const {mutate: getAllAboutUs} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/aboutUs/getAllAbout');
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
            setAboutHeaderTitles(data.map((title, index) => data[index].title));
            const descs = data.map(item => item.description);
            setAboutUsForm({
                aboutHeaderTitles: data.map((title, index) => data[index].title),
                description: descs
            });
            console.log("descs: ", descs);
            console.log("form: data: ",data);
        },
        onError: (error) => {
            console.log("Error in getting allAbout: ", error.message);
        },
    });

    useEffect(() => {
        getAllAboutUs();
    }, []);

    return (
        <div className={`flex flex-col min-h-screen ${isMobile ? 'pt-4' : ''}`}>
            {!isMobile ? (
                <header className='header-section border border-collapse flex flex-row flex-wrap text-white bg-gradient-to-r animate-fadeInDown'>
                    {aboutUsForm.aboutHeaderTitles.map((title, index) => (
                        <button onClick={() => setSelectedIndex(index)} className='flex-grow border-r-2 border-b-2 text-sm p-2 hover:bg-slate-400 bg-gradient-to-r' key={index}>
                            {title}
                        </button>
                    ))}
                </header>
            ) : null}
            <Suspense fallback={<LoadingSpinner size='lg'/>}>
            <AboutPage title={aboutUsForm.aboutHeaderTitles[selectedIndex]}
             aboutPageData={aboutUsForm.description} selectedIndex={selectedIndex}
             />
             </Suspense>
            {isMobile ? (
                <footer className='header-section flex flex-wrap border border-collapse text-white bg-gradient-to-r animate-fadeInDown'>
                    {aboutUsForm.aboutHeaderTitles.map((title, index) => (
                        <button onClick={() => setSelectedIndex(index)} className='flex-grow border-b-2 border-l-2 text-sm p-2 bg-gradient-to-r hover:bg-slate-400' key={index}>
                            {title}
                        </button>
                    ))}
                </footer>
            ) : null}
        </div>
    );
}

export default AboutHeader;