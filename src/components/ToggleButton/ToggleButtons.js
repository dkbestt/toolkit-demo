import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleButtons(props) {

  const RegistrationTypes = props;
  const [alignment, setAlignment] = useState(0)
  const handleAlignment = (e, value) => {
    setAlignment(value)
    props.func(RegistrationTypes.name[value])

  };

  let itemList = [];
  RegistrationTypes.name.forEach((element, index) => {
    if (index === 0) {
      itemList.push(<ToggleButton value={index} name={element} key={index} aria-label="centered">{element}
      </ToggleButton>)
    } else {
      itemList.push(<ToggleButton value={index} name={element} key={index} aria-label="centered">{element}
      </ToggleButton>)
    }
  })

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {itemList}
    </ToggleButtonGroup>
  )
}



