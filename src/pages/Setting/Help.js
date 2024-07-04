import React from 'react'
import UpDownSlider from '../../components/UpDownSlider/UpDownSlider'
import Contact from '../Contact/Contact'

const Help = () => {
    return (
        <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
            <UpDownSlider setting="Help center" href="https://triftel.io/faq.html" >
            </UpDownSlider>
            <UpDownSlider setting="Contact us" >
                <Contact />
            </UpDownSlider>
            <UpDownSlider setting="Start Guided tutorial" >
            </UpDownSlider>
        </div>
    )
}

export default Help