import React from 'react'

const Timer = (props) => {

    const [seconds, setSeconds] = React.useState(2)
    const [min, setMin] = React.useState(1)

    React.useEffect(() => {
        if (seconds > 0 && min >= 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000)
        } else {
            setMin(min - 1)
            if (min >= 0) {
                setSeconds(2)
            } else {
                props.func()
            }
        }
    })

    return (

        <div className='flex items-center'>
            <div className=" align-middle">
                <div className="max-w-lg mx-auto  ">
                    <div className="flex-1 bg-white ">
                        <span >0{min} </span>   : <span > {seconds}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Timer

