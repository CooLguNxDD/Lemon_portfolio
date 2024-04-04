import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';

import {AppWrap, MotionWrap} from '../../wrapper'
import { urlForImage, client } from '../../client';


import './Testimonial.scss'


const Testimonial = () => {

    const [brands, setBrands] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';
    useEffect(() => {
        try{
            client.fetch(testimonialsQuery).then((data) =>{
                setTestimonials(data);
            })
        }catch (exceptionVar) {
            console.log("no experience")
        }

        try{
            client.fetch(brandsQuery).then((data) =>{
                setBrands(data);
            })
        }catch (exceptionVar) {
            console.log("no skills")
        }
    }, [])

    const handleClick = (index) =>{
        setCurrentIndex(index);
    }

  return (
    <>
        {testimonials.length &&(
            <>
                <div className="app__testimonial-item app__flex">
                    {console.log(testimonials)}
                    <img src={urlForImage(testimonials[currentIndex].imageurl)} alt='testimonial'></img>
                    <div className='app__testimonial-content'>
                        <p className="p-text">  
                            {testimonials[currentIndex].feedback}
                        </p>
                        <div>
                            <h4 className='bold-text'>
                                {testimonials[currentIndex].name}
                            </h4>
                            <h5 className='bold-text'>
                                {testimonials[currentIndex].company}
                            </h5>
                        </div>
                    </div>
                </div>

                <div className='app__testimonial-btns app__flex'>
                        <div className="app__flex" onClick={()=> handleClick(currentIndex===0 ? testimonials.length-1 : currentIndex - 1)}>
                            <HiChevronLeft/>
                        </div>

                        <div className="app__flex" onClick={()=> handleClick(currentIndex===testimonials.length-1 ? 0 : currentIndex + 1)}>
                            <HiChevronRight/>
                        </div>
                    </div>
            </>
        )}

        <div className="app__testimonials-brands app__flex">
            {brands.map((brand)=>(
                <motion.div
                whileInView={{opacity: [0, 1]}}
                transition={{duration : 0.5, type: 'tween'}}
                key={brand._id}
                >
                    <img src= {urlForImage(brand.imgUrl)} alt={brand.name}></img>
                </motion.div>
            ))}
        
        </div>
    </>
  )
}



export default AppWrap(
    MotionWrap(Testimonial, 'app__testimonial'),
    'testimonial',
    "app__primarybg"
    );