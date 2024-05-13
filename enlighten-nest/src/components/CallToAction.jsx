import React from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
const CallToAction = ({postArray, currentIndex}) => {
    const prePost = postArray[currentIndex-1];
    const nextPost = postArray[currentIndex+1];
    
  return (
    <div className='flex max-w-6xl gap-2 sm:gap-32 md:gap-64 m-8 border-t border-b border-teal-500'>
        {currentIndex ===0 ?
        <div className='m-8 font-semibold'>
            No previous post.
        </div> :<Link to={`/post/${prePost.slug}`} className='m-8'>
            <h1 className='font-bold'>{prePost.title}.</h1>
            
            <p className='flex'>
            <MdKeyboardDoubleArrowLeft className='mt-[7px]' />
                <span>previous post</span>
            </p>
        </Link>}

        {currentIndex===postArray.length-1? 
        <div className='font-semibold m-8'>
            This is Last Post
        </div>:<Link to={`/post/${nextPost.slug}`} className='m-8'>
            <h1 className='font-bold'>{nextPost.title}.</h1>
            
            <p className='flex'>
                <span>Next Post</span>
                <MdKeyboardDoubleArrowRight className='mt-[7px]' />
            </p>
        </Link>}
    </div>
  )
}

export default CallToAction;