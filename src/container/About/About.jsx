import React, {useState, useEffect} from 'react';

import { motion } from 'framer-motion';

import './About.scss';
import {images} from '../../constants';

import {AppWrap, MotionWrap} from '../../wrapper';
import {urlForImage, client} from '../../client';

const About = () => {

    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        const query = '*[_type == "abouts"]';

        client.fetch(query).then((data)=> {
            setAbouts(data);
            console.log(data);
        });
        
    }, [])
    
    return (
        <>
            <h2 className="head-text"><span>💻About Me👾</span></h2>

            <div className = "app__profiles">
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{opacity: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.5, type:'tween'}}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={urlForImage(about.imgUrl)} alt={about.title}/>
                        <h2 className="bold-text" style={{marginTop:20}}>{about.title}</h2>
                        <p className="p-text" style={{marginTop: 10}}>{about.description}</p>


                    </motion.div>
                ))}
            </div>
        </>
    )
    }

export default AppWrap(
    MotionWrap(About, 'app__about'),
    'about',
    "app__whitebg"
    );

    