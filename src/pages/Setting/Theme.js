import React from 'react'
import SwitchList from '../../components/Switch/SwitchList'

const Theme = () => {

  return (
    <>
      <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
        <SwitchList radio={true}>System default</SwitchList>
        <SwitchList radio={true} >Light</SwitchList>
        <SwitchList radio={true}>Dark</SwitchList>
      </div>

    </>
  )
}

export default Theme