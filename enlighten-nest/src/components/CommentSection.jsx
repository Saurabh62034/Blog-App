import { Alert, Button, TextInput, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
const CommentSection = ({postId}) => {
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    console.log(comment)
    const {currentUser} = useSelector((state)=>state.user);

    useEffect(()=>{
        const getComments = async()=>{
            try{
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                const data = await res.json();
                if(res.ok){
                    console.log("get comment")
                    setComments(data);
                }
            }
            catch(e){

            }
        }
        getComments();
        console.log(comments);
    },[postId])
    console.log(comments);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(comment.length > 200){
            return;
        }

        try{
            
        const res = await fetch('/api/comment/createcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: comment, postId, userId: currentUser._id}),
        });

        const data = await res.json();
        if(res.ok){
            setComment('');
            setCommentError(null);
            setComments([data, ...comments])
        }
    }
    catch(e){
        console.log(e);
        setCommentError(e.message);
    }
    };

    const handleLike = async (commentId)=>{
        try{
            if(!currentUser){
                Navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT'
            })
            if(res.ok){
                const data = await res.json();
                console.log("data for comment = ",data);
                setComments(comments.map((comment)=>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,

                    } : comment
                ))
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

  return (
    <div>
        {currentUser ? 
        (
            <div className='flex items-center'>
                <p>
                    Signed in as:&nbsp;&nbsp;
                </p>
                <img className='h-5 w-5 rounded-full' src={currentUser.profilePic} alt='user'></img>
                <Link className='text-cyan-500 hover:underline' to={'/dashboard?tab=profile'}>
                    @{currentUser.username}
                </Link>
            </div>
        ) :(
            <div className='text-sm text-teal-500 my-5'>
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                    Sign in
                </Link>
            </div>
        )}
        {currentUser && 
        (<div>
        <form onSubmit={handleSubmit}>
            <Textarea placeholder='Add a comment' rows={'3'} maxLength={'200'}
            onChange={(e)=>setComment(e.target.value)} />
                <div className='flex justify-between mt-5'>
                    <p className='text-gray-500 text-xs'>{200-comment.length} characters remaining</p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit
                    </Button>
                </div>

            
        </form>
        {commentError && <Alert color={'failure'}>
            {commentError}
        </Alert>}
        
        </div>
        )}
        {comments.length === 0 ? (
            <p>
                No comments yet!
            </p>
        ) : 
        (<>
            <div className='text-sm my-5 flex items-center gap-1'>
                <p>Comments </p>
                <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                <p>{comments.length}</p>
                </div>
            </div>
            {
                comments.map((comment)=>(
                    <Comment key={comment._id}
                    comment={comment} onLike={handleLike}></Comment>
                    
                ))
            }
        </>

        )}
    </div>
  )
}

export default CommentSection