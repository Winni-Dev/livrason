// import { button } from 'framer-motion/m';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { FaArrowUp } from 'react-icons/fa';

// const BackTopButton = ()=> {
//     const [visible, setVisible] = useState(false);

//     useEffect(() => {
//         const toggleVisibity = () =>{
//             if (window.scrollY > 300){
//                 setVisible(true);
//             } else {
//                 setVisible(false);
//             }
//         };

//         window.addEventListener('scroll',toggleVisibity);
//         return () => window.removeEventListener('scroll', toggleVisibity);

//     },[]);

//     const scrollToTop = () => {
//         window.scrollTo({
//             top:0,
//             behavior:'smooth',
//         });
//     };



//     return (
//        visible && (
//         <motion.buttonbutton
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//                onClick={scrollToTop} className='btnH hover:bg-teal-500 transition'>
//             <FaArrowUp/>
//         </motion.buttonbutton>


//        )
//       );
// };


  


// export default BackTopButton


// import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
 import { FaArrowUp } from 'react-icons/fa';


function BackTopButton() {
    const [showButton, setShowButton] = useState(false);
 
 useEffect(() => {
    const handleScroll = () => {
        setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
 },[]);


 const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition ;
      const duration = 700;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance , duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      function easeInOutQuad (t, b, c, d){
        t /= d /2;
        if (t < 1) return (c / 2) * t * t + b ;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) +b;
      }
      requestAnimationFrame(animation);
    }
  };
  return (
   
    <div>
        {/* {showButton && ( */}
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{margin:"0px 0px -100px 0px"}}
            onClick={() => scrollToSection('home')}
            className={`btnH z-50 fixed bottom-6 right-6 bg-bleuw-400 border text-white px-4 py-2 rounded-full shadow-lg font-bold hover:bg-bleuw-500 transition-all duration-500 ease-out transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}  
          >
            <FaArrowUp/>
          </motion.button>
        {/* )} */}
      
    </div>
  )
}

export default BackTopButton
