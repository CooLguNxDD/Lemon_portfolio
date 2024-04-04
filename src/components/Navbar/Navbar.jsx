import React, {useState, useEffect} from 'react'

import{HiMenuAlt4, HiX, Hix} from 'react-icons/hi'
import {motion, AnimatePresence} from 'framer-motion'
import Switch from "react-switch";

import './Navbar.scss'
import {images} from '../../constants'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [darkModeToggle, setdarkModeToggle] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            //dark mode
            setdarkModeToggle(true);
        }
    }, []);

    useEffect(() =>{
        const root = document.documentElement;

        //dark mode
        if(darkModeToggle){
            root.style.setProperty('--primary-color', '#1d222b');
            root.style.setProperty('--secondary-color', '#f8f8f8');
            root.style.setProperty('--black-color', '#f8f8f8');
            root.style.setProperty('--lightGray-color', '#333333');
            root.style.setProperty('--gray-color', '#d2d6dc');
            root.style.setProperty('--brown-color', '#1a202c');
            root.style.setProperty('--white-color', '#1a202c');
            root.style.setProperty('--yellow-color', '#ffc107');
            root.style.setProperty('--color-scheme', 'dark');
        }
        //light mode
        else{
            root.style.setProperty('--primary-color', '#edf2f8');
            root.style.setProperty('--secondary-color', '#313bac');
            root.style.setProperty('--black-color', '#030303');
            root.style.setProperty('--lightGray-color', '#e4e4e4');
            root.style.setProperty('--gray-color', '#6b7688');
            root.style.setProperty('--brown-color', '#46364a');
            root.style.setProperty('--white-color', '#ffffff');
            root.style.setProperty('--yellow-color', '#ffd321');
            root.style.setProperty('--color-scheme', 'light');
        }
    },[darkModeToggle])

    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>

                <span>An</span><span>🍋</span><span>rew</span>
            </div>
            <ul className='app__navbar-links'>
                {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                        <li className='app__flex p-text'key = {`link-${item}`}>
                            <div/>
                            <a href={`#${item}`}>{item}</a>
                        </li>
                    ))}
            </ul>
            
            <p className='p-text' style={{ marginRight: '16px' }}>DarkMode</p>
            <Switch onChange={setdarkModeToggle} checked={darkModeToggle} />
            
            

            
            <div className='app__navbar-menu'>
                <HiMenuAlt4 onMouseEnter={()=> setToggle(true)}/>
                
                <AnimatePresence>
                    {toggle && (
                        <motion.div
                            initial={{ opacity: 0, x:'100%' }}
                            animate={{ opacity: 1, x:'0%' }}
                            exit={{ opacity: 0, x:'100%' }}
                            transition={{duration:0.4, ease: 'easeInOut'}}
                        >
                        <HiX onClick={()=> setToggle(false)}/>

                        <ul>
                        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                            <li key = {item}>
                                <a href={`#${item}`} onClick={()=> setToggle(false)}>{item}</a>
                            </li>
                        ))}
                        </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
        </nav>
    )
}

export default Navbar