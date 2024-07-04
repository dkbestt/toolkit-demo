import React from 'react'
import UpDownSlider from '../../components/UpDownSlider/UpDownSlider'

const About = () => {
    return (
        <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
            <UpDownSlider setting="Terms of use" href="https://triftel.io/terms_and_conditions.html" ></UpDownSlider>
            <UpDownSlider setting="Privacy Policy" href="https://triftel.io/privacy_policy.html" ></UpDownSlider>
            <UpDownSlider setting="Web version" ></UpDownSlider>
        </div>
    )
}

export default About