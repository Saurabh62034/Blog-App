import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Button, TextInput} from 'flowbite-react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateSuccess, updateStart } from '../redux/user/userSlice';

const DashProfile = () => {
  /*rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2*1024*102 &&
      request.resource.contentType.matches('image/.*')
    }
  }
} */
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [errormessage, setErrorMessage] = useState('');

  console.log(imageUploadProgress, imageUploadError);
  if(imageUploadProgress==100){
    setImageUploadProgress(null)
  }

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    setImageFile(file);
    setImageFileURL(URL.createObjectURL(file));

  }
  const filePickerRef = useRef();

  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile])

  const uploadImage = async ()=>{
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setImageUploadProgress(progress.toFixed(0));
        
      },
      (error)=>{
        setImageUploadError('Could not upload image');
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
      },
      
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileURL(downloadURL);
          setFormData({...formData, profilePic: downloadURL});
        })
        
      })
  }

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
    console.log(Object.keys(formData));
  }
  console.log("form data = "+Object.keys(formData), formData.profilePic);

  const handleUpdate = async (e)=>{
    e.preventDefault();
    if(Object.keys(formData).length === 0){
      return;
    }
    try{
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
      }
      else{
        dispatch(updateSuccess(data));
      }
    }
    catch(e){
      console.log("error is: "+ e);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=> filePickerRef.current.click()}>
          {imageUploadProgress && (
            <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${imageUploadProgress/100})`,
              }
            }} />
          )}
          <img src={imageFileURL || currentUser.profilePic} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageUploadProgress && imageUploadProgress<100 && 'opacity-60'}`}></img> 
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />

        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />

        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
        <div className='text-red-500 flex justify-between mt-5'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  )
}

export default DashProfile