import React from 'react'
import {Sidebar} from 'flowbite-react';
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentDuplicate, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
    const {currentUser} = useSelector((state)=>state.user)
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
    <Sidebar className='w-full sm:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {currentUser && currentUser.isAdmin && (
                <Sidebar.Item href="/dashboard?tab=dash" active={tab==='dash' || !tab} icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
              )}
                
                <Sidebar.Item href="/dashboard?tab=profile" active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin? 'Admin':'User'} labelColor='dark' className="cursor-pointer">
                    Profile
                </Sidebar.Item>
                {currentUser.isAdmin && (
                  <Sidebar.Item
                  href="/dashboard?tab=posts" active={tab==='posts'} icon={HiDocumentText}>
                  Posts
                  </Sidebar.Item>
                )}

                {currentUser.isAdmin && (
                  <>
                  <Sidebar.Item
                  href="/dashboard?tab=users" active={tab==='users'} icon={HiOutlineUserGroup}>
                  Users
                  </Sidebar.Item>

                  <Sidebar.Item
                  href="/dashboard?tab=comments" active={tab==='users'} icon={HiAnnotation}>
                  Comments
                  </Sidebar.Item>

                  </>
                )}
                <Sidebar.Item icon={HiArrowSmRight} labelColor='dark' className="cursor-pointer" onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar