import React from 'react'
import { useDispatch } from 'react-redux'

// Custom Imports
import { prev } from '../../store/reducers/stepSlice'

const BackButton = () => {

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(prev())
  }

  return (
    <div>
      <button onClick={handleClick} className="text-[#619CB0] background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        Back
      </button>
      {/* <button onClick={handleClick} className='previous'> <svg className="h-8 w-8 text-[red-500]"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg></button>    */}
    </div>
  )
}

export default BackButton