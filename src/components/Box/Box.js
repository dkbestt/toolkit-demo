import React, { Component } from 'react'

export default function Box(HocComponent, isRegister = false) {
    let className = "main-img"
    if (isRegister) {
        className = "main-img1"
    } else
        className = "main-img"
    return class extends Component {
        render() {
            return (
                <>
                    <div className='flex items-center'>
                        <div className="px-4 mx-auto max-w-7xl align-middle">
                            <div className="max-w-lg mx-auto rounded-lg lg:flex ">
                                <div className="flex-1 bg-white lg:p-12">
                                    <HocComponent />
                                </div>
                            </div>
                        </div>
                        <div className='login-gif'>
                            <div className={className}></div>
                            <div className='circle circle1'></div>
                            <div className='circle circle2'></div>
                            <div className='circle circle3'></div>
                        </div>
                    </div>
                </>
            )
        }
    }
}