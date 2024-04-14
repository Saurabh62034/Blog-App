import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { useState } from 'react';
import {FaMoon, FaSun} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/ThemeSlice';
import { signoutSuccess } from '../redux/user/userSlice';



const Header = () => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const [searchbar, setSearch] = useState(false);
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state =>state.theme)
    const search = ()=>{
        setSearch(!searchbar);
    }

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
    <Navbar className='min-w-80 border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Enlighten</span>
            Nest
        </Link>
        <form>
            <TextInput type='text' placeholder='search...' 
            rightIcon={AiOutlineSearch}
            className={searchbar?'block' : 'hidden md:block'}></TextInput>
        </form>
        <Button onClick={search} className={searchbar?'invisible':'w-14 h-10 visible md:invisible'}  color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 sm:block' color='gray' onClick={()=>dispatch(toggleTheme())}>
                {theme==='light'? <FaMoon />: <FaSun />}
            </Button>
            {currentUser?(
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar 
                            alt='user'
                            img={currentUser.profilePic}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to='/dashboard?tab=profile'>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                </Dropdown>
            ):(
                <Link to="/sign-in">
                <Button
                 outline
                gradientDuoTone='purpleToBlue'>
                    Sign In
                </Button>
            </Link>
            )

            }
            
            <Navbar.Toggle></Navbar.Toggle>
        </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active={path==="/"}>Home</Navbar.Link>
                <Navbar.Link href="/about" active={path==="/about"}>About</Navbar.Link>
                <Navbar.Link href="/projects" active={path==="/projects"}>Projects</Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header