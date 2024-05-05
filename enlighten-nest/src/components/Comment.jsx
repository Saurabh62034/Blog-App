import moment from 'moment';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Comment = ({comment}) => {
    const [user, setUser] = useState({});
    
    const profilePic = user.data ? user.data.profilePic : '';
    
    console.log("user = ",user);
    useEffect(()=>{
        const getUser = async ()=>{
            try{
                const res = await fetch(`/api/user/${comment.userId}`);

                const data = await res.json();

                if(res.ok){
                    setUser({data});
                }
            }

            catch(e){
                console.log(e)
            }
        }
        getUser();
    }, [comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img  className='h-10 w-10 rounded-full bg-gray-200' src={profilePic} alt=''></img>
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>{user.data ? `@${user.data.username}` : "anonymous user"}</span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment