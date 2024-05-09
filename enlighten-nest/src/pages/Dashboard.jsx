import React from 'react';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

const Dashboard = () => {
  const location = useLocation();
  console.log("location = "+Object.keys(location));
  console.log("location.search = "+location.search);
  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    console.log("urlParams = "+urlParams);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl);
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col sm:flex-row'>
      {/* sidebar */}
      <div className='sm:w-56'>
        <DashSidebar />
      </div>

      {tab === 'profile' && <DashProfile />}

      {tab==='posts' && <DashPost />}

      {tab==='users' && <DashUsers />}

      {tab==='comments' && <DashComments />}

      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard