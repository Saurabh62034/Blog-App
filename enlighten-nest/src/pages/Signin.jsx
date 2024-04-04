import React from 'react'
import {Alert, Button, Label} from 'flowbite-react';
import chalk from 'chalk';
import { TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Signin = () => {
  const [formData, setFormData] = useState({});

  //const [errormessage, setErrormessage] = useState(null);
  //const [loading, setLoading] = useState(false);
  const {loading, error: errormessage} = useSelector(state => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();  

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
    console.log(chalk.blue('Hello world!'));
    console.log("e.target.value"+e.target.id)
    console.log("formData = "+Object.keys(formData));
    console.log("formData.email = "+formData.email);
    console.log("formData.password = "+formData.password);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all fields.'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('api/auth/signin',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        dispatch(signInFailure(data.message));
        console.log(data.message);
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate("/");
      }
    }
    catch(e){
      console.log(data.message);
      dispatch(signInFailure(data.message))
    }

  }

  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-96 md:w-full md:items-center justify-center gap-5'>
      <div className='flex flex-col item-center justify-center flex-1'>
      <Link to="/" className='self-center whitespace-nowrap font-bold dark:text-white text-4xl'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Enlighten</span>
            Nest
        </Link>
        <p className='tet-sm mt-5'>
        Here, you can post your philosophy to enlighten people and also you can get enlighten by reading other's philosophy.</p>
      </div>


      <div className='flex-1'>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        
        <div className=''>
          <Label value='Your email' />
            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}>
            </TextInput>
        </div>
        <div className=''>
          <Label value='Your password' />
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}>
            </TextInput>
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
          {loading?(
            <>
          <Spinner size='sm' />
          <span className='pl-3'>Loading...</span>
          </>)
          :'Sign in'}
        </Button>
        <OAuth />
      </form>
      <div className='mt-5'>
        <span>Don't have an account?</span>
        <Link to='/sign-up'className='ml-2 font-semibold text-blue-700'>
        Sign Up</Link>
      </div>
      {errormessage && <Alert className='' color='failure'>{errormessage}</Alert>}
      </div>
      
    </div>
    
    </div>
  )
}

export default Signin