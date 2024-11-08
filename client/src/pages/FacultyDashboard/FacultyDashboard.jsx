import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { OpenContext } from '../components/OpenContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MobileHeader from './DashBoardComponents/MobileHeader.jsx';
import LaptopAside from './DashBoardComponents/LaptopAside.jsx';

const Announcements = lazy(() => import('./Announcements.jsx'));
const Contents = lazy(() => import('../FacultyDashboard/Contents.jsx'));
const Sessions = lazy(() => import('./Sessions.jsx'));
// const FDashThreeButtons = lazy(() => import('../components/FDashThreeButtons.jsx'));

const FacultyDashboard = ({ authUser }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { setDash } = useContext(OpenContext);
  const [selection, setSelection] = useState('');
  const [ind, setInd] = useState(0);
  const screens = [
    <Sessions />,
    // <Grades />,
    <Contents />,
    <Announcements />
  ];
  useEffect(() => {
    setDash(true);
    return () => setDash(false);
  }, [setDash]);
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
    if (selection !== '') {
      switch (selection) {
        case 'session':
          console.log(selection);
          setInd(0);
          break;
        case 'content':
          console.log(selection);
          setInd(1);
          break;
        case 'announcement':
          console.log(selection);
          setInd(2);
          break;
        default:
          console.log(selection);
          break;
      }
    }
  }, [selection]);
  return (
    <Suspense fallback={<div><LoadingSpinner size='lg'/></div>}>
      <div className='flex min-h-screen overflow-auto flex-col md:flex-row lg:flex-row xl:flex-row'>
        {isMobile ? (
          <MobileHeader authUser={authUser} setSelection={setSelection}/>
        ) : (
          // For laptop
          <LaptopAside authUser={authUser} setSelection={setSelection}/>
        )}
        {/* Selected Screen */}
        <div className='w-full md:w-3/4 bg-blueGray p-4'>
          {screens[ind]}
        </div>
      </div>
    </Suspense>
  )
}

export default FacultyDashboard