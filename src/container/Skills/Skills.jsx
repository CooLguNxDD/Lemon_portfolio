import React, {useState, useEffect} from 'react';
import {AiFillEye, AiFillGithub} from 'react-icons/ai';
import {motion} from 'framer-motion';

import { Tooltip } from 'react-tooltip'

import {AppWrap, MotionWrap} from '../../wrapper'
import { urlForImage, client } from '../../client'

import './Skills.scss'


const Skills = () => {
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);

    const exQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';


    useEffect(() => {
        try{
            client.fetch(exQuery).then((data) =>{
                setExperiences(data);
            })
        }catch (exceptionVar) {
            console.log("no experience")
        }

        try{
            client.fetch(skillsQuery).then((data) =>{
                setSkills(data);
            })
        }catch (exceptionVar) {
            console.log("no skills")
        }
    }, [])
    

    return (
        <>
            <h2 className="head-text">Skills & Experience</h2>

            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {skills?.map((skill, index) => (
                        <motion.div
                            whileInView={{opacity:[0, 1]}}
                            transition={{duration: 0.5}}
                            className="app__skills-item app_flex"
                            key={skill.name}
                        >

                            <div className="app__flex" style={{backgroundColor: skill.bgColor}}>
                                <img src={urlForImage(skill.icon)} alt={skill.name}/>
                            </div>

                            <p className="p-text app__flex">{skill.name}</p>
                        </motion.div> 
                    ))}
                </motion.div>


                <motion.div className="app__skills-exp">

                    {experiences?.map((exp, index) => (
                        <motion.div
                            className="app__skills-exp-item"
                            key={experiences.year}

                        >
                            <div className="app__skills-exp-year">
                                <p className="bold-text">{exp.year}</p>
                            </div>
                            <motion.div className="app__skills-exp-works">
                                {exp?.works?.map((work)=>(
                                    <>
                                        <motion.div
                                            whileInView={{opacity: [0, 1]}}
                                            transition={{duration: 0.5}}
                                            className="app__skills-exp-work"
                                            data-tip
                                            data-tooltip-id={work.name}
                                            data-tooltip-content={work.desc}
                                            data-tooltip-place="top"
                                        >
                                            <h4 className="bold-text">{work.name}</h4>
                                            <p className="p-text"> {work.company}</p>
                                        </motion.div>

                                        <Tooltip
                                            id={work.name}
                                            effect="solid"
                                            arrowColor="#fff"
                                            className="skills-tooltip"
                                        >
                                            
                                        </Tooltip>
                                    </>
                                ))}
                            </motion.div>
                        </motion.div>
                    )
                    )}


                </motion.div>

            </div>
        </>
    )
}

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    "app__whitebg"
    );