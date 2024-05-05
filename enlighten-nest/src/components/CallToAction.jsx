import React from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
const CallToAction = () => {
  return (
    <div className='flex max-w-6xl gap-2 sm:gap-32 md:gap-64 m-8 border-t border-b border-teal-500'>
        <div className='m-8'>
            <h1 className='font-bold'>This is previous post.</h1>
            
            <p className='flex'>
            <MdKeyboardDoubleArrowLeft className='mt-[7px]' />
                <span>previous post</span>
            </p>
        </div>

        <div className='m-8'>
            <h1 className='font-bold'>This is Next post.</h1>
            
            <p className='flex'>
                <span>Next Post</span>
                <MdKeyboardDoubleArrowRight className='mt-[7px]' />
            </p>
        </div>
    </div>
  )
}

export default CallToAction;