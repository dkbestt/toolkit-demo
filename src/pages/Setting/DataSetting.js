import React from 'react'
import AnchorLabel from '../../components/Label/AnchorLabel'
import Switch from '../../components/Switch/Switch'
import SwitchList from '../../components/Switch/SwitchList'
import UpDownSlider from '../../components/UpDownSlider/UpDownSlider'
import UpDownSliderLabel from '../../components/UpDownSlider/UpDownSliderLabel'

const DataSetting = () => {
    return (
        <>
            <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <UpDownSlider setting="Network usage" >

                </UpDownSlider>
                <div className='border mt-2'> Media Auto Download
                    <UpDownSliderLabel setting="Photo" label="Off">
                        <div className='border'>
                            <SwitchList radio={true}>Off</SwitchList>
                            <SwitchList radio={true} >Wifi</SwitchList>
                            <SwitchList radio={true}>Wifi and Cellular</SwitchList>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Video" label="Off">
                        <div className='border'>
                            <SwitchList radio={true}>Off</SwitchList>
                            <SwitchList radio={true} >Wifi</SwitchList>
                            <SwitchList radio={true}>Wifi and Cellular</SwitchList>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Audio" label="Off">
                        <div className='border'>
                            <SwitchList radio={true}>Off</SwitchList>
                            <SwitchList radio={true} >Wifi</SwitchList>
                            <SwitchList radio={true}>Wifi and Cellular</SwitchList>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Document" label="Off">
                        <div className='border'>
                            <SwitchList radio={true}>Off</SwitchList>
                            <SwitchList radio={true} >Wifi</SwitchList>
                            <SwitchList radio={true}>Wifi and Cellular</SwitchList>
                        </div>
                    </UpDownSliderLabel>
                    <AnchorLabel>Reset Auto Download Setting</AnchorLabel>
                </div>



            </div>
            <Switch>Save Edited Photo</Switch>
            <AnchorLabel>Clear Catch</AnchorLabel>
        </>
    )
}

export default DataSetting