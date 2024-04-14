import React from 'react'
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const DashSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
        const paramsUrl = new URLSearchParams(location.search);
        const UrlTab = paramsUrl.get('tab');
        if(UrlTab){
            setTab(UrlTab);
        }
    },[location.search])

    const handleSignout = async ()=>{
        try{
          const res = await fetch('/api/user/signout',{
            method: "POST",
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }
        }catch(e){
          console.log(e);
        }
        
      }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                
                <Sidebar.Item href="/dashboard?tab=profile" active={tab==='profile'} icon={HiUser} label='user' labelColor='dark' className="cursor-pointer">
                    Profile
                </Sidebar.Item>
                
                <Sidebar.Item icon={HiArrowSmRight} labelColor='dark' className="cursor-pointer" onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar