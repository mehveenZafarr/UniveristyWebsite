import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useContext } from 'react';
import LoadingSpinner from './pages/components/LoadingSpinner.jsx';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { OpenContext } from './pages/components/OpenContext.jsx';
import { useState } from 'react';
// import DownloadContents from './StudentsDashboard/DownloadContents.jsx';
// import Transcript from './StudentsDashboard/Transcript.jsx';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage.jsx'));
const AcademicsPage = lazy(() => import('./pages/Academics/AcademicsPage.jsx'));
const Layout = lazy(() => import('./pages/Layout.jsx'));
const ContactPage = lazy(() => import('./SidebarPages/ContactPage.jsx'));
const AboutHeader = lazy(() => import('./pages/components/AboutHeader.jsx'));
const AcademicsHeader = lazy(() => import('./pages/components/AcademicsHeader.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard/AdminDashboard.jsx'));
const StudentDashboard = lazy(() => import('./StudentsDashboard/StudentDashboard.jsx'));
const FacultyDashboard = lazy(() => import('./pages/FacultyDashboard/FacultyDashboard.jsx'));
const AttendencePage = lazy(() => import('./pages/FacultyDashboard/AttendencePage.jsx'));
const Courses = lazy(() => import('./pages/FacultyDashboard/Courses.jsx'));
const RegisterCourse = lazy(() => import('./StudentsDashboard/RegisterCourse.jsx'));
const EnrolledCourses = lazy(() => import('./StudentsDashboard/EnrolledCourses.jsx'));
const RollNumberSlip = lazy(() => import('./StudentsDashboard/RollNumberSlip.jsx'));
const Voucher = lazy(() => import('./StudentsDashboard/Voucher.jsx'));
const Grades = lazy(() => import('./pages/FacultyDashboard/Grades.jsx'));
const Transcript = lazy(() => import('./StudentsDashboard/ViewGrades.jsx'));
const DownloadContents = lazy(() => import('./StudentsDashboard/DownloadContents.jsx'));


function App() {

  const {setUser} = useContext(OpenContext);

  const { data: authUser, isLoading } = useQuery({
		//we use queryKey to give a unique name to our query and refer to it later
		queryKey: ['authUser'],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if(data.error) return null;
				if (!res.ok) {
					throw new Error(data.error);
				}
        setUser(data);
				console.log("Auth User is here ", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

  if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

  return (
    <Suspense fallback={<LoadingSpinner size='lg'/>}>
    <Routes>
      <Route path='/' element={<Layout authUser={authUser}/>}>
      <Route index element={<Navigate to="/academics" />} />
      {/* Auth Routes */}
      <Route path='/login' element={!authUser? <LoginPage/> : <Navigate to={`/${authUser.role}-dashboard`}/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      {/* Drawer routes */}
      <Route path='academics' element={<AcademicsPage/>}/>
      <Route path='about' element={<AboutHeader/>}/>
      <Route path='contact' element={<ContactPage/>}/>
      <Route path='academics/faculties/:id' element={<AcademicsHeader/>}/>
      {/* Dashboard Routes */}
      <Route path='student-dashboard' element={
        authUser?.role === 'student'? <StudentDashboard authUser={authUser}/> : <Navigate to={'/login'}/>
        }/>
      {/* <Route path='admin-dashboard' element={
        authUser?.role === 'admin'? <AdminDashboard authUser={authUser}/> : <Navigate to={'/login'}/>
        }/> */}
      <Route path='admin-dashboard' element={
        authUser?.role === 'admin'? <FacultyDashboard authUser={authUser}/> : <Navigate to={'/login'}/>
        }/>
      </Route>
      <Route path='/courses/:id' element={authUser? <Courses/> : <Navigate to={'/login'}/>}/>
      <Route path='/attendence/:id' element={authUser? <AttendencePage/>  : <Navigate to={'/login'}/>}/>
      <Route path='/grades/:id' element={authUser? <Grades/>  : <Navigate to={'/login'}/>}/>
      <Route path='/registerCourse' element={authUser? <RegisterCourse/>  : <Navigate to={'/login'}/>}/>
      <Route path='/enrolled' element={authUser? <EnrolledCourses/>  : <Navigate to={'/login'}/>}/>
      <Route path='/rollNumberSlip' element={authUser? <RollNumberSlip/>  : <Navigate to={'/login'}/>}/>
      <Route path='/voucher' element={authUser? <Voucher/>  : <Navigate to={'/login'}/>}/>
      <Route path='/grades' element={authUser? <Transcript/>  : <Navigate to={'/login'}/>}/>
      <Route path='/downloadContents' element={authUser? <DownloadContents/>  : <Navigate to={'/login'}/>}/>
    </Routes>
    </Suspense>
  )
}

export default App