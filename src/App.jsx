import { useState, useEffect, useRef, Children } from 'react';
import { motion, transform , useScroll ,useMotionValueEvent } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp,FaHtml5,FaCss3, FaCode, FaReact, FaMobile,FaExternalLinkAlt, FaEnvelope,FaMapMarkerAlt,FaSass,FaGitSquare, FaFacebook, FaInstagram, FaShippingFast } from 'react-icons/fa';
import { RiSecurePaymentLine, RiTailwindCssFill } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { TbBrandJavascript } from "react-icons/tb";
import BackTopButton from './components/BackTopButton';
import Lenis from '@studio-freight/lenis';

import Winni from './assets/winni.jpeg';
import camion from './assets/camion.png';
import livreur from './assets/livreur.png';
import contact from './assets/contact.png';
import contact2 from './assets/contact2.png';
import { MdLocationOn } from 'react-icons/md';



const Livraison = () => {

  //lenis
 const scrollContainer = useRef();
 const scrollProgress = useRef(0);

 useEffect(()=>{
  const lenis = new Lenis ({
    duration:2.0,
    easing:(t)=> Math.min(1, 1.001-Math.pow(2, -10 * t)),
        smooth:true,
      smoothTouch:true,
      touchMultiplier: 2,
      touchInertiaMultiplier:2.5,
      gestureOrientation:'vertical',
      infinite:false,
  });

  const handleScroll = ({scroll, limit , velocity, direction , progress }) => {
    scrollProgress.current = progress ;
    console.log('Scroll progess :', progress);
  };
  lenis.on('scrooll', handleScroll);

  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return ()=>{
    lenis.off("scroll",handleScroll);
    cancelAnimationFrame(rafId);
    lenis.destroy();
  };

 },[]);

  //apparition de nav pour tel
  const [nav, setNav] = useState(false);

  const Aff = () => {
    setNav(!nav);
  }
 

  // États pour les animations
  const [activeSection, setActiveSection] = useState('home');
  const [nameText, setNameText] = useState('');
  const [profession, setProfession] = useState('');
  const sectionRefs = useRef([]);

  // Données du portfolio
  const sections = [
    { id: 'home', name: 'Accueil' },
    { id: 'about', name: 'À propos' },
    { id: 'service', name: 'Services' },
    { id: 'contact', name: 'Contact' }
  ];
  
  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
/////////////////scrolle a la section
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
    <motion.div
    ref={scrollContainer}
     className="portfolio-container overflow-x-hidden bg-[#FAFAFA] text-[#1F1F1F] min-h-screen font-sans ">
      {/* Barre de navigation */}
      <nav
      initial={{ opacity: 0, y:-50 }}
      animate={{ opacity: 1,y:0 }}
      transition={{ duration: 1.1, delay: 4 }}
       className="fixed shadow-md flex md:block w-full bg-white/[0.03] border border-white/[0.09] bg-opacity-5 backdrop-blur-md z-40 py-3 md:py-4 px-6">
        <div className=" w-full  md:max-w-6xl  mx-auto flex z-50  justify-between items-center">
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-bleuw-400"
          >
            LivraiZo
          </motion.div>
          <ul className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative pb-1 bg-transparent ${activeSection === section.id ? 'text-bleuw-400' : 'text-[#1F1F1F] hover:text-bleuw-500'}`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-bleuw-400"
                      transition={{ type: 'spring', bounce: 0.1, duration: 0.9 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <label  className="flex -z-10 md:hidden flex-col gap-2 w-8 text-white cursor-pointer" >
      <input onChange={Aff} className="peer hidden " type="checkbox"/>
      <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
      <div className="rounded-2xl h-[3px] w-full bg-black duration-500 peer-checked:-rotate-45" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
    </label> 
        </div>
      </nav>
      {/* nav de tel  */}
      <ul className={`md:hidden flex-col w-2/3 border border-white/10 rounded-lg p-4 items-center bg-black/[0.04] backdrop-blur-lg z-40 fixed top-16  h-full  left-0 space-y-8 transform transition-transform duration-500 ease-in-out ${nav ? ' translate-x-0' : ' -translate-x-full'} `}>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative pb-1 text-xl  px-5 rounded-full ${activeSection === section.id ? 'text-bleuw-400' : 'text-black hover:text-bleuw-400'}`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.span
                       layoutId="nav-underlin" //e a la fin si y'a problème
                      className=" md:hidden absolute left-0 bottom-0 w-full h-0.5 bg-bleuw-400"
                      transition={{ type: 'spring', bounce: 0.01, duration: 0.03 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
     
       

      {/* Section Accueil */}
      <section id="home" className=" min-h-[84vh]  w-full  flex items-center justify-center pt-20 md:pt-40 px-4 ">
     
        <div className="max-w-6xl mx-auto grid text-center md:text-start md:grid-cols-2 gap-28 items-center  w-full">
          <motion.div 
          initial={{ opacity: 0, x: -90 }}
          animate={{ opacity: 1,x:0 }}
          transition={{ duration: 1.3, delay: 0.4 }}
           className="descption space-y-6">
            <h1 className=' text-4xl md:text-6xl text-bleuw-400 font-bold'>
              Lorem ipsum dolor sit.
            </h1>
            <p className=' text-lg text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laudantium neque earum et ratione laborum.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum quisquam .
            </p>
            <div className="z-30 flex space-x-4  justify-center md:justify-start">
           
           <a href="https://" target="_blank" rel="noreferrer" className="z-30 text-bleuw-400   text-2xl hover:text-bleuw-500 transition">
             <FaFacebook />
           </a>
           <a href="https://" target="_blank" rel="noreferrer" className="z-30 text-bleuw-400 text-2xl hover:text-bleuw-500 transition">
             <FaInstagram />
           </a>
           <a href="https://wa.me/0749800313" target="_blank" rel="noreferrer" className="z-30 text-bleuw-400 text-2xl hover:text-bleuw-500 transition">
             <FaWhatsapp />
           </a>
         </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{margin:"0px 0px -100px 0px"}}
              onClick={() => scrollToSection('contact')}
              className=" z-30 bg-bleuw-400 text-[#fafafa] px-6 py-3 rounded-lg font-bold hover:bg-bleuw-500 transition"
            >
              Contactez-nous
            </motion.button>
          </motion.div>
          <div className="img py-10 md:py-24 relative">
            <div className=' z-0  absolute h-full -top-5 rounded-full -right-1 md:-right-16 w-[60%]  md:w-[80%] bg-bleuw-400 '></div>
            <motion.img 
            initial={{ opacity: 1, x: 690 }}
            animate={{ opacity: 1,x:0 }}
            transition={{ duration: 1.3, delay: 1 }}
            className=' z-10 relative object-cover md:h-[230px] w-[590px] '  src={camion} alt="" />
          </div>
        </div>
       
      </section>

      {/* Section À propos */}
      <section id="about" className=" py-10 md:py-0 md:pt-32 px-4 relative">
      
        <div className="max-w-6xl mx-auto space-y-6"> 
          <motion.h1 
           initial={{ opacity: 0, y: 90 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true,margin:"0px 0px -100px 0px" }}
           transition={{ duration: 1.3, delay: 0.2 }}
          className=' text-3xl md:text-5xl text-bleuw-400 text-center font-bold'>A propos de nous 
          </motion.h1>
          <div className=' max-w-6xl grid  md:grid-cols-2 gap-2'>
            <div className="img relative flex items-center md:text-start md:justify-start justify-center text-center">
              <div className=' hidden md:block absolute top-3 h-4 w-56 bg-bleuw-400 rounded-full rotate-45'></div>
              <div className=' absolute top-8 -left-24 h-4 w-80 bg-bleuw-400 rounded-full rotate-45'></div>
              <div className=' absolute top-16 -left-28 h-4 w-72 bg-bleuw-400 rounded-full rotate-45'></div>
              <div className=' absolute top-28 -left-28 h-4 w-60 bg-bleuw-400 rounded-full rotate-45'></div>
              <motion.img 
               initial={{ opacity: 1, x: -310 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, delay: 0.2  }}
               viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className=' relative' src={livreur} alt="" />
            </div>
            <div 
            className="descr relative pt-10 space-y-5 px-5">
            <div className=' absolute  -bottom-64  h-96 w-96 -right-[79%] md:-right-[64%] bg-bleuw-400 rounded-full '></div>
              <motion.h3
              initial={{ opacity: 0, x: 90 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              transition={{ duration: 1.3, delay: 0.2 }}
               className=' relative text-4xl text-start text-bleuw-400 font-medium'>Lorem ipsum dolor sit amet consectetur.</motion.h3>
              <motion.p 
               initial={{ opacity: 0, x: 90 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true,margin:"0px 0px -100px 0px" }}
               transition={{ duration: 1.3, delay: 0.2 }}
              className=' relative  text-start text-lg text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tenetur itaque autem magni suscipit perferendis facere deleniti! Commodi, aut animi dignissimos cumque explicabo rerum magni voluptates sit ullam nulla ipsa cupiditate, deleniti ab quis! A, veritatis obcaecati vel deserunt nisi rem aut ex totam, tempore dolorum eligendi neque culpa aliquid.
              </motion.p>
            </div>
          </div>
        </div>
         
      </section>

      {/* Section service */}
      <section id="service" className="md:py-20 px-4 z-20  ">
        <div className="max-w-6xl space-y-10 mx-auto">
        <h1 className=' text-3xl md:text-5xl text-bleuw-400 text-center font-bold'>Nos services </h1>
        <div className=' relative grid px-5 md:px-0 grid-cols-1 md:grid-cols-3 md:pt-24 gap-6'>

        <div className=' absolute bottom-6 -left-56 h-16 w-[800px] bg-bleuw-400 rounded-full -rotate-45'></div>
        <div className=' absolute bottom-1 left-15 h-16 w-[850px] bg-bleuw-400 rounded-full -rotate-45'></div>
          {/* carte 1 */}
          <motion.div 
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true,margin:"0px 0px -100px 0px" }}
          transition={{ duration: 1.3, delay: 0.2 }}
          className="cart z-30 bg-white p-6 rounded-lg shadow-md  border border-gray-200 text-center">
            <FaShippingFast className=' mx-auto mb-4 text-bleuw-400 text-4xl'/>
            <h3 className=' text-2xl font-semibold mb-2'>Livraison Express</h3>
            <p className=' text-gray-600 text-lg w-full text-center'>
              Recevez vos colis en un temps record,partout en Côte D'ivire.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet impedit doloremque deleniti!
            </p>
          </motion.div>
          {/* carte 2 */}
          <motion.div
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true,margin:"0px 0px -100px 0px" }}
          transition={{ duration: 1.3, delay: 0.2 }}
           className="cart z-30 bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
            <MdLocationOn className=' mx-auto mb-4 text-bleuw-400 text-4xl'/>
            <h3 className=' text-2xl font-semibold mb-2'>Suivi en Temps Réel</h3>
            <p className=' text-gray-600 text-lg w-full text-center'>
              Recevez vos colis en un temps record,partout en Côte D'ivire.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet impedit doloremque deleniti!
            </p>
          </motion.div>
           {/* carte 3 */}
           <motion.div 
           initial={{ opacity: 0, x: 90 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true,margin:"0px 0px -100px 0px" }}
           transition={{ duration: 1.3, delay: 0.2 }}
           className="cart z-30 bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
            <RiSecurePaymentLine className=' mx-auto mb-4 text-bleuw-400 text-4xl'/>
            <h3 className=' text-2xl font-semibold mb-2'>Suivi en Temps Réel</h3>
            <p className=' text-gray-600 text-lg w-full text-center'>
              Recevez vos colis en un temps record,partout en Côte D'ivire.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet impedit doloremque deleniti!
            </p>
          </motion.div>

        </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="z-30 relative md:min-h-[87vh] flex items-center justify-center w-full pt-7 ">
      <div className=" z-0 absolute -left-[1%] top-80  rounded-[50%] w-52 h-56 md:h-80 bg-bleuw-400 " ></div>
      <div className=" z-0 absolute left-[45%] top-48  rounded-es-full w-52 h-56 md:h-40 bg-bleuw-400/35 " ></div>
      <div className=" z-0 absolute left-[80%] top-20  rounded-ss-full w-80 h-96 md:h-80 bg-bleuw-400 " ></div>
      <div className="z-30 md:py-4 md:m-9 md:mx-16 m-6  w-full  px-4   flex items-center rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl border border-gray-400 text-white ">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true,margin:"0px 0px -100px 0px" }}
            className="text-3xl z-30 md:text-4xl font-bold  text-center text-bleuw-400 mb-12"
          >
            Contactez-moi
          </motion.h2>
          
          {/* <div className="grid mt-28 md:mt-0  md:grid-cols-2 gap-12 z-30"> */}
          <div className="flex flex-col-reverse md:flex-row mt-28 md:mt-0 items-center justify-between gap-12 z-30">
           
            <motion.img
             initial={{ opacity: 0, x: -60 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2 }}
             viewport={{ once: true,margin:"0px 0px -100px 0px" }}
             src={contact2} alt="" />

            <motion.form method='POST'
            action=''
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className="z-30 space-y-6  rounded-lg w-full md:w-[50%] "
            >
              <div>
                {/* <label htmlFor="name" className="block mb-2">Nom</label> */}
                <input
                  type="text"
                  id="name"
                  placeholder='Nom'
                  className="w-full text-black/70 bg-gray-900/10 placeholder-black/70  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-bleuw-400 "
                  required
                />
              </div>
              
              <div>
                {/* <label htmlFor="email" className="block mb-2">Email</label> */}
                <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  className="w-full text-black/70 bg-gray-900/10 placeholder-black/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bleuw-400"
                  required
                />
              </div>
              
              <div>
                {/* <label htmlFor="message" className="block mb-2">Message</label> */}
                <textarea
                  id="message"
                  placeholder='Message...'
                  rows="5"
                  className="w-full text-black/70 resize-none bg-gray-900/10 placeholder-black/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bleuw-400"
                  required
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{margin:"0px 0px -100px 0px"}}
                type="submit"
                className="bg-bleuw-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-bleuw-500 transition w-full"
              >
                Envoyer le message
              </motion.button>
            </motion.form>
          </div>
        </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className=" relative w-full z-50 bg-black py-8 text-center text-gray-400 opacity-100 px-8">
      <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className="z-30 space-y-8 "
            >
              <div className="flex z-30 items-start space-x-4">
                <FaWhatsapp className="text-bleuw-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl text-white font-bold z-30 text-start">WhatsApp</h3>
                  <a href="https://wa.me/0749800313" className="z-30 text-gray-100 text-start  hover:text-bleuw-400">
                   +225 07 49 80 03 13
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-bleuw-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl text-white font-bold text-start">Email</h3>
                  <a href="mailto:kouadioemmanuel109@gmail.com" className="text-gray-100 text-start hover:text-bleuw-400">
                    Kouadioemmanuel109@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-bleuw-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl text-white font-bold text-start">Localisation</h3>
                  <p className="text-gray-100 text-start">Cocody,Abidjan, Côte D'ivoire</p>
                </div>
              </div>
             
            </motion.div>
        <p className=' text-white mt-16'>© {new Date().getFullYear()} LivraiZo. Tous droits réservés.</p>
      </footer>
      <BackTopButton/>
    </motion.div>
  );
};

export default Livraison;



