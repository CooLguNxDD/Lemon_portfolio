import React, {useState} from 'react'

import{HiMenuAlt4, HiX, Hix} from 'react-icons/hi'
import {motion, AnimatePresence} from 'framer-motion'

import './Navbar.scss'
import {images} from '../../constants'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)

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