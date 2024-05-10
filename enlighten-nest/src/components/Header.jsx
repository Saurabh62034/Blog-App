import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { useState } from 'react';
import {FaMoon, FaSun} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/ThemeSlice';
import { signoutSuccess } from '../redux/user/userSlice';



const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const [searchbar, setSearch] = useState(false);
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state =>state.theme)
    const navigate = useNavigate();
    const sideNavRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
        
      }
      
    }, [location]);

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
            navigate('/sign-in')
          }
        }catch(e){
          console.log(e);
        }
        
      }

      useEffect(() => {
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);
    
        // Remove event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      function handleClickOutside(event) {
        if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
          setSearch(false);
          console.log("clicked");
        }
      }

      const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
      }

  return (
    <Navbar className='sticky top-0 w-full min-w-80 border-b-2 z-50 min-h-10'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Enlighten</span>
            Nest
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput ref={sideNavRef}  type='text' placeholder='search...' 
            rightIcon={AiOutlineSearch}
            className={searchbar?'block' : 'hidden md:block'}
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}></TextInput>
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