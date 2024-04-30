import { Button, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashPost = () => {
  const [requiredPost, setRequiredPost] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const {currentUser} = useSelector((state)=>state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] =useState(true);
  console.log("user posts", userPosts);
  console.log("required post",requiredPost);
  useEffect(()=>{
    const fetchPosts = async()=>{

      try{
        const res = await fetch(`/api/posts/getposts?userId=${currentUser._id}`)
        const data = await res.json();
        console.log("data=", data)
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
      }
      catch(e){

      }
    }
    if(currentUser.isAdmin){ fetchPosts();
      }
  },[currentUser._id, userPosts.length]);

const ShowMore = async ()=>{
  const startIndex = userPosts.length;
  try{
    const res = await fetch(`api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
    const data = await res.json();
    console.log("show more: ",data.posts)
    if(res.ok){
      setUserPosts((prev)=>[...prev, ...data.posts]);
      if(data.posts.length<9){
        setShowMore(false);
      }
    }
  }
  catch(e){

  }
}

const handleDeletePost = async ()=>{
  setShowModel(false);
  try{
    const res = await fetch(`/api/posts/deletePost/${requiredPost}/${currentUser._id}`,
  {
    method: 'DELETE',
  });
  const data = await res.json();
  if(!res.ok){
    console.log(data.message);
  }
  else{
    setUserPosts((prev)=>prev.filter((post)=>post._id !==requiredPost))
    console.log("user data after delete: ",userPosts)
  }
  }
  catch(e){
    console.log(e)
  }
}

  return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {
      currentUser.isAdmin && userPosts.length>0 ?( 
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date updated   
              </Table.HeadCell>
              <Table.HeadCell>
                Post image  
              </Table.HeadCell>
              <Table.HeadCell>
                Post title 
              </Table.HeadCell>
              <Table.HeadCell>
                Category  
              </Table.HeadCell>
              <Table.HeadCell>
                Delete  
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>   
              </Table.HeadCell>
            </Table.Head>
              {userPosts.map((post)=>(
                <Table.Body className='divide-y' key={post._id}>
                  <Table.Row className='bg-white dark:border-gray dark:bg-gray-800'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell as='div'>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'>

                        </img>
                      </Link>
                    </Table.Cell>
                    <Table.Cell  as='div'>
                      <Link to={post.slug} className='font-medium text-gray-500 dark:text-white'>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell  as='div'>{post.category}</Table.Cell>
                    <Table.Cell  as='div'>
                      <span  className='text-red-500 hover:underline cursor-pointer' onClick={()=>{setShowModel(true);
                      setRequiredPost(post._id)}}>Delete</span>
                    </Table.Cell>
                    <Table.Cell  as='div'>
                      <Link to={`/update-post/${post._id}`}>
                        <span className='text-teal-500 hover:underline cursor-pointer'>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          {
            showMore && (
              <button onClick={ShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>):( 
        <p>
          you don't have any posts yet.
        </p>
        )}
  <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark: text-gray-200 mx-auto mb-4' />
              <h3 className='mb-5 mx-auto text-lg'>Are you sure, you want to delete this post?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeletePost}>Yes</Button>

                <Button color='blue' onClick={()=>setShowModel(false)}>No</Button>
                
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
</div>;
}
export default DashPost