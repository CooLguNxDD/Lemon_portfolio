import React from 'react'

import {motion} from 'framer-motion'

import {AppWrap, MotionWrap} from '../../wrapper'
import {images} from '../../constants'
import './Header.scss'


const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition:{
            duration: 1,
            ease: 'easeInOut',
        }
    }
}
const Header = () => {
    return (
        <div className='app__header app__flex'>
            <div className='app__header-badgeContainer app__flex'>
                <motion.div
                    whileInView={{x:[-100,0] , opacity: [0,1]}}
                    transition={{duration: 1, ease: 'easeInOut'}}
                    className='app__header-info'
                > 
                    <div className='app__header-badge'>
                        <div className='badge-container'>
                            <div className='badge-cmp app__flex'>
                                <span>👋</span>
                                <div style={{ marginLeft: 20}}>
                                    <p className='p-text'>Welcome! I am </p>
                                    <hi className='head-text'>Andrew Liang</hi>
                                </div>
                            </div>
                            <div className='badge-cmp app__flex'>
                                <div style={{ marginLeft: 20}}>
                                <p className='p-text'>A.K.A</p>
                                    <span className='head-lemon-text'>CCLemonExp</span>
                                </div>
                                <span>🍋</span>
                            </div>
                        </div>
                        <div className='tag-cmp app__flex'>
                            <p className='p-text bold-text'>I am</p>
                            <p className='p-text'>🎮 Game Developer</p>
                            <p className='p-text'>💻 Software Developer</p>
                            <p className='p-text'>🌐 Web Developer</p>
                            <p className='p-text'>🙌 Freelance Developer</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileInView={{opacity: [0,1]}}
                    transition={{duration: 1, ease: 'easeInOut', delayChildren: 0.5}}
                    className='app__header-img'
                >
                    <img src={images.profile} alt="profile_bg"/>
                </motion.div>
            </div>
            <motion.div
                    variants={scaleVariants}
                    whileInView={scaleVariants.whileInView}
                    className='app__header-circles'
                >
                    {[images.node, images.react, images.unity, images.unreal].map((circle, index) => (
                        <div className='circle-cmp app__flex' key={`circle-${index}`}>
                            <img src={circle} alt="circle"/>
                        </div>
                    ))}
            </motion.div>
        </div>
    )
}

export default AppWrap(
    MotionWrap(Header, 'home'),
    'home',
    "app__whitebg"
    );