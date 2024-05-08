import { Button, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashComments = () => {
    const {currentUser} = useSelector((state)=>state.user);
  const [
    commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [showModel, setShowModel] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] =useState(true);
  
  useEffect(()=>{
    const fetchComments = async()=>{

      try{
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json();
        console.log("data=", data)
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length<9){
            setShowMore(false);
          }
        }
      }
      catch(e){

      }
    }
    if(currentUser.isAdmin){ fetchComments();
      }
  },[currentUser._id]);

const ShowMore = async ()=>{
  const startIndex = comments.length;
  try{
    const res = await fetch(`api/comment/getcomments?startIndex=${startIndex}`);
    const data = await res.json();
    console.log("show more: ",data.comments)
    if(res.ok){
      setComments((prev)=>[...prev, ...data.comments]);
      if(data.comments.length<9){
        setShowMore(false);
      }
    }
  }
  catch(e){

  }
}

const handleDeleteComment = async ()=>{
  try{
    const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
   { method: 'DELETE'},
  )
  const data = await res.json();
  if(res.ok){
    setComments((prev)=>prev.filter((comment)=>comment._id!==commentIdToDelete));
    setShowModel(false);
  }
  else{
    console.log("something went wrong while deleting")
  }
}
  catch(e){

  }
}

  return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {
      currentUser.isAdmin && comments.length>0 ?( 
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date updated   
              </Table.HeadCell>
              <Table.HeadCell>
                Comment content  
              </Table.HeadCell>
              <Table.HeadCell>
                Number of likes 
              </Table.HeadCell>
              <Table.HeadCell>
                PostId 
              </Table.HeadCell>
              <Table.HeadCell>
                userId  
              </Table.HeadCell>
              <Table.HeadCell>
                Delete  
              </Table.HeadCell>
             
            </Table.Head>
              {comments.map((comment)=>(
                <Table.Body className='divide-y' key={comment._id}>
                  <Table.Row className='bg-white dark:border-gray dark:bg-gray-800'>
                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell as='div'>
                        {comment.content}
                      
                    </Table.Cell>
                    <Table.Cell  as='div'>
                      
                        {comment.numberOfLikes}
                      
                    </Table.Cell>
                    <Table.Cell  as='div'>{comment.postId}</Table.Cell>
                    <Table.Cell  as='div'>
                        {comment.userId}
                    </Table.Cell>
                    <Table.Cell  as='div'>
                      <span  className='text-red-500 hover:underline cursor-pointer' onClick={()=>{setShowModel(true);
                      setCommentIdToDelete(comment._id)}}>Delete</span>
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
          you don't have any comments yet!
        </p>
        )}
  <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark: text-gray-200 mx-auto mb-4' />
              <h3 className='mb-5 mx-auto text-lg'>Are you sure, you want to delete this comment?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteComment}>Yes</Button>

                <Button color='blue' onClick={()=>setShowModel(false)}>No</Button>
                
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
</div>;
}
export default DashComments