import React from 'react'
import {BsTwitter, BsInstagram, BsDiscord, BsLinkedin, BsGithub} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
            <a href='https://twitter.com/CCLemon43712800'>
                <BsTwitter/>
            </a>
        </div>
        <div >
            <a href='https://discordapp.com/users/274718912455901207'>
                <BsDiscord />
            </a>
        </div>
        <div >
            <a href='https://github.com/CooLguNxDD'>
                <BsGithub />
            </a>
        </div>
        <div >
            <a href='https://www.linkedin.com/in/andrew-liang-8281301b5/'>
                <BsDiscord />
            </a>
        </div>
        
    </div>
  )
}

export default SocialMedia