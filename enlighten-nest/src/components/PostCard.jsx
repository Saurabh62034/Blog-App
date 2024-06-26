import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setPost } from '../redux/post/PostSlice';


const PostCard = ({post, postIndex, postArray}) => {
  const dispatch = useDispatch();
  const data = {
    post,
    postIndex,
    postArray
  }

  const handleClick = ()=>{
   
    dispatch(setPost(data))
  }
  
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[330px] overflow-hidden rounded-lg sm:w-[360px]' onClick={handleClick}>
        <Link to={`/post/${post.slug}`}>
            <img src={post.image} alt='post cover' className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'></img>
        </Link>
        <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-1'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none'>
                Read article
            </Link>
        </div>
    </div>
  )
}

export default PostCard