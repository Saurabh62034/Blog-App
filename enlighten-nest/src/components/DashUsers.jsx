import { Button, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashUsers = () => {
  const [
    userIdToDelete, setuserIdToDelete] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const {currentUser} = useSelector((state)=>state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] =useState(true);
  console.log("users: ", users);
  console.log("user to be delete= ",userIdToDelete);
  useEffect(()=>{
    const fetchUsers = async()=>{

      try{
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json();
        console.log("data=", data)
        if(res.ok){
          setUsers(data.users);
          if(data.users.length<9){
            setShowMore(false);
          }
        }
      }
      catch(e){

      }
    }
    if(currentUser.isAdmin){ fetchUsers();
      }
  },[currentUser._id]);

const ShowMore = async ()=>{
  const startIndex = users.length;
  try{
    const res = await fetch(`api/user/getusers?startIndex=${startIndex}`);
    const data = await res.json();
    console.log("show more: ",data.users)
    if(res.ok){
      setUsers((prev)=>[...prev, ...data.users]);
      if(data.users.length<9){
        setShowMore(false);
      }
    }
  }
  catch(e){

  }
}

const handleDeleteUser = async ()=>{
  
}

  return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {
      currentUser.isAdmin && users.length>0 ?( 
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date created   
              </Table.HeadCell>
              <Table.HeadCell>
                User image  
              </Table.HeadCell>
              <Table.HeadCell>
                User Name 
              </Table.HeadCell>
              <Table.HeadCell>
                Email 
              </Table.HeadCell>
              <Table.HeadCell>
                Admin  
              </Table.HeadCell>
              <Table.HeadCell>
                Delete  
              </Table.HeadCell>
             
            </Table.Head>
              {users.map((user)=>(
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray dark:bg-gray-800'>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell as='div'>
                        <img src={user.profilePic}
                        alt={user.username}
                        className='w-20 h-10 object-cover bg-gray-500 rounded-full'>

                        </img>
                      
                    </Table.Cell>
                    <Table.Cell  as='div'>
                      
                        {user.username}
                      
                    </Table.Cell>
                    <Table.Cell  as='div'>{user.email}</Table.Cell>
                    <Table.Cell  as='div'>{user.isAdmin? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                    <Table.Cell  as='div'>
                      <span  className='text-red-500 hover:underline cursor-pointer' onClick={()=>{setShowModel(true);
                      setuserIdToDelete(user._id)}}>Delete</span>
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
          you don't have any users yet!
        </p>
        )}
  <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark: text-gray-200 mx-auto mb-4' />
              <h3 className='mb-5 mx-auto text-lg'>Are you sure, you want to delete this user?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>Yes</Button>

                <Button color='blue' onClick={()=>setShowModel(false)}>No</Button>
                
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
</div>;
}
export default DashUsers