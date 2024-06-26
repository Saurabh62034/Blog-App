import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import SlideShow from '../components/SlideShow';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await fetch('/api/posts/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();

  },[]);

  return (
    <div className='min-h-screen mb-10'>
      <div className='flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Enlighten Nest</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Here you will get variety articles and tutorials on topics such as web development, software engineering and programming languages.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div>

      <div className='lg:pl-48 lg:pr-48 md:pl-20 md:pr-20 pr-7 pl-7 '>
        <SlideShow />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length>0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>
                Recent Posts
              </h2>
              <div className='flex flex-wrap gap-4'>
                {
                  posts.map((post, index, array)=>(
                    <PostCard key={post._id} post={post} 
                    postIndex={index}
                    postArray = {array} />
                  ))
                }
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                View all posts
              </Link>
            </div>
          )
        }
      </div>
      
    </div>
  )
}

export default Home