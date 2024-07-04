import React from 'react'

// Custom Imports
import Image from '../../assets/images/landing_logo.png'
import { APP_NAME, TAG_LINE, COMPANY_NAME } from '../../constants/Contants'

const Landing = () => {
    return (
        <div className="main-landing">
            <div className="landing-content">
                <p>Click below to get started!</p>
                <div className="main-logo">
                    <span className="landing-animation1"></span>
                    <span className="landing-animation2"></span>
                    <span className="landing-animation3"></span>
                    <div className="how_logo">
                        <a href="#" className="landing_logo">
                            <img src={Image} alt="ABC" />
                        </a>
                    </div>
                </div>
                <h2>{APP_NAME} - The Social Media</h2>
                <p>{TAG_LINE}</p>
            </div>
            <div className="copyright">
                <p>Powered by <span>{COMPANY_NAME}</span></p>
            </div>
        </div>
    )
}

export default Landing