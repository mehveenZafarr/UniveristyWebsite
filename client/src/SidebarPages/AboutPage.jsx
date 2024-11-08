import React, {lazy, Suspense, useEffect} from 'react'
// import ImageSlider from '../../components/ImageSlider.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoadingSpinner from '../pages/components/LoadingSpinner.jsx';

const ImageSlider = lazy(() => import('../pages/components/ImageSlider.jsx'));

const AboutPage = ({ title,
  aboutPageData, selectedIndex
}) => {
  useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);
  return (
        <div className='flex flex-col bg-primary p-4 m-4 md:px-32 lg:px-32 xl:px-32'>
          <Suspense fallback={<LoadingSpinner size='lg'/>}>
            <ImageSlider/>
          </Suspense>
      <div className='bg-primary p-2 m-2 md:px-32 lg:px-32 xl:px-32' data-aos="fade-up">
      {aboutPageData && aboutPageData[selectedIndex]?.map((desc, index) => (
          <div key={index}>
            <label className='sub-title underline text-white font-sans font-bold'>{desc.heading}</label>
            <p className='content-text text-white text-justify'>{desc.content}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default AboutPage