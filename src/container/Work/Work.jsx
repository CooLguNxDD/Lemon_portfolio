import React, {useState, useEffect} from 'react';
import {AiFillEye, AiFillGithub} from 'react-icons/ai';
import {motion, wrap} from 'framer-motion';

import {AppWrap,MotionWrap} from '../../wrapper'
import { urlForImage, client } from '../../client';

import './Work.scss'
const Work = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1})
    const [works, setWorks] = useState([])
    const [filterWorks, setFilterWorks] = useState([])
    const [displayWorks, setDisplayWorks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    const [displayRange, setDisplayRange] = useState(4);


    const handleNextWorks = () => {
        if (startIndex + displayRange < filterWorks.length) {
            setStartIndex(startIndex + displayRange);
            setAnimateCard([{y:100, opacity: 0}]);

            setTimeout(() => {
                setDisplayWorks(filterWorks.slice(startIndex + displayRange, startIndex + displayRange * 2));
                setAnimateCard([{y:0, opacity: 1}]);
            },500);
        }


    };
    
    const handlePrevWorks = () => {
        if (startIndex - displayRange >= 0) {
            setStartIndex(startIndex - displayRange);
            setAnimateCard([{y:100, opacity: 0}]);

            setTimeout(() => {
                setDisplayWorks(filterWorks.slice(startIndex - displayRange, startIndex));
                setAnimateCard([{y:0, opacity: 1}]);
            },500);
        }
       

    };


    useEffect(() => {
        const query = '*[_type == "works"]';

        client.fetch(query).then((data) =>{
            setWorks(data);
            setFilterWorks(data);
            setDisplayWorks(data.slice(0, displayRange))
        })
    }, [])
    
    const handleWorkFilter = (item) =>{
        setStartIndex(0);
        setActiveFilter(item);
        setAnimateCard([{y:100, opacity: 0}]);

        setTimeout(() => {
            setAnimateCard([{y:0, opacity: 1}]);

            if(item === 'All'){
                setFilterWorks(works);
                setDisplayWorks(works.slice(0, displayRange))
            }
            else{
                const currentFilterWorks = works.filter((work) => work.tags.includes(item));
                setFilterWorks(currentFilterWorks);
                setDisplayWorks(currentFilterWorks.slice(0, displayRange))
                console.log(currentFilterWorks);
            }
        }, 500);
    }
  return (
    <>
        <h2 className="head-text">My<span> Projects</span></h2>

        <div className="app__work-filter">
            {['Game', 'Web', 'Application','Client/Server', 'All'].map((item, index) => (
                <div 
                    key={index}
                    onClick={()=>handleWorkFilter(item)}
                    className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                >
                    {item}
                </div>
                ))
            }
        </div>

        <motion.div
            animate={animateCard}
            transition={{duration: 0.5, delayChildren: 0.5}}
            className="app_work-portfolio"
        >
            {displayWorks.map((work, index)=>(
                <div className="app__work-item app__flex" key={index}>
                    <div className="app__work-img app__flex">
                        <img src={urlForImage(work.imgUrl)} alt={work.name}></img>

                        <motion.div
                            whileHover={{opacity:[0, 1]}}
                            transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                            className='app__work-hover app__flex'
                            >
                            <a href = {work.projectLink} target = "_blank" rel = "noreferrer">
                                <motion.div
                                    whileInView={{scale: [0, 1]}}
                                    whileHover={{scale:[1, 0.9]}}
                                    transition={{duration: 0.25}}
                                    className='app__flex'
                                    >
                                <AiFillEye/>

                                </motion.div>
                            </a>
                            {
                                work.codeLink ? <a href = {work.codeLink} target = "_blank" rel = "noreferrer">
                                <motion.div
                                    whileInView={{scale: [0, 1]}}
                                    whileHover={{scale:[1, 0.9]}}
                                    transition={{duration: 0.25}}
                                    className='app__flex'
                                    >
                                <AiFillGithub/>

                                </motion.div>
                            </a> : <></>
                            }
                        </motion.div>
                    </div>
                    <div>
                        <div className='app__work-content app__flex' >
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text" style={{marginTop:10}}>{work.description}</p>

                            <div className="app__work-tag app__flex">
                                <p className='p-text'>{work.tags[0] === 'All'? work.tags[1] : work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}





        </motion.div>
        <button className="arrow-left-btn" onClick={handlePrevWorks}>{"<"}</button>
        <button className="arrow-right-btn"onClick={handleNextWorks}>{">"}</button>

    </>
  )
}


export default AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    "app__primarybg"
    );