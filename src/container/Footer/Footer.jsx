import React,{useState} from 'react'

import { images } from '../../constants'
import {AppWrap, MotionWrap} from '../../wrapper'
import { urlForImage, client } from '../../client'
import emailjs from 'emailjs-com';
import './Footer.scss'

const Footer = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)

    const {name, email, message} = formData;

    const handleChangeInput = (e) => {
        console.log('Input changed');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    }

    const handleSubmit = (e)=>{
        setLoading(true);
        e.preventDefault();
        // const contact = {
        //     _type:'contact',
        //     name:name,
        //     email: email,
        //     message:message,
        // }
        // client.create(contact).then(()=>{
        //     setLoading(false);
        //     setIsFormSubmitted(true);
        // })
        emailjs.sendForm('service_f6hl0hx', 'template_30q5mrk', e.target, process.env.REACT_APP_EMAILJS_KEY).then(() => {
            setLoading(false);
            setIsFormSubmitted(true);
          }, (error) => {
            console.error('Failed to send email:', error);
          });
    }
    return (
        <>
        <h2 className="head-text"> Contact Me</h2>

        <div className='app__footer-cards'>
            <div className='app__footer-card'>
                <img src={images.email} alt='email'></img>
                <a href='mailto:coolthecclemon@gmail.com' className="p_text_black">coolthecclemon@gmail.com</a>
            </div>

            <div className='app__footer-card'>
                <img src={images.mobile} alt='mobile'></img>
                <a href='tel: +1 (778) 865-8672' className="p_text_black">+1 (778) 865-8672</a>
            </div>

        </div>
        {!isFormSubmitted ? 
            (       
                // <div className='app__footer-form app__flex'>
                //     <div className='app__flex'>
                //         <input className="p-text" type="text" placeholder='Your Name' value={name} name="name" onChange={handleChangeInput}/>
                //     </div>

                //     <div className='app__flex'>
                //         <input className="p-text" type="text" placeholder='Your Email' value={email} name="email" onChange={handleChangeInput}/>
                //     </div>
                //     <div>
                //         <textarea className='p-text' placeholder='Your Message' value={message} name="message" onChange={handleChangeInput}/>
                //     </div>
                //     <button type='button' className='p-text' onClick={handleSubmit}>{loading ? "Sending" : "Send Message"}</button>
                // </div>

                <form className='app__footer-form app__flex' onSubmit={handleSubmit}>
                    <div className='app__flex'>
                        <input className="p-text" type="text" placeholder='Your Name' value={name} name="name" onChange={handleChangeInput} />
                    </div>
                        <div className='app__flex'>
                    <input className="p-text" type="email" placeholder='Your Email' value={email} name="email" onChange={handleChangeInput} />
                        </div>
                    <div className='app__flex'>
                        <textarea className='p-text' placeholder='Your Message' value={message} name="message" onChange={handleChangeInput} />  
                    </div>
                    
                    <button type='submit' className='p-text' disabled={loading}>{loading ? "Sending" : "Send Message"}</button>
                </form>
            ):(
                <div>
                    <h3 className='head-text'> Thank you for getting in touch</h3>
                </div>
            )
        }
        </>
    )
}


export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    "app__primarybg"
    );
