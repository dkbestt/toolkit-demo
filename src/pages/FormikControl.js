import React from 'react'
import Input from '../components/Input'
// import Textarea from './controls/Textarea'
// import Select from './controls/Select'
// import Radio from './controls/Radio'
// import Checkbox from './controls/Checkbox'
// import Datepicker from './controls/Datepicker'


function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case 'input':
            return <Input {...rest} />
        // case 'textarea':
        //     return <Textarea {...rest} />
        // case 'select':
        //     return <Select {...rest} />
        // case 'radio':
        //     return <Radio {...rest} />
        // case 'checkbox':
        //     return <Checkbox {...rest} />
        // case 'date':
        //     return <Datepicker {...rest} />
        default:
            return null
    }
}

export default FormikControl