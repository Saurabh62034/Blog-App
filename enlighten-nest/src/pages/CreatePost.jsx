import React, { useState } from 'react';
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    
    const [imageUploadProgress,setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);

    const handleImageUpload = async ()=>{
        try{
            if(!file){
                setImageUploadError('Please select an image');
                return;
            }
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL)=>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, image: downloadURL});
                        
                    });
                }
            );
        }
        catch(error){
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            
        }
        
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("publish clicked", publishError);
        try{
            const res= await fetch('/api/posts/create',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        }
        catch(e){
            setPublishError('Something went wrong');
        }
    }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-bold'>Create a Post</h1>
        <form className='flex flex-col gap-4' name='create-post' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>setFormData({...formData, title: e.target.value})}></TextInput>
                <Select onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                    <option value="uncategorized">Select a category</option>
                    <option value="Javascript">Javascript</option>
                    <option value='React.Js'>React.Js</option>
                    <option value='Node.Js'>Node.Js</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-betwen border-2 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />

                

                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleImageUpload}  disabled={imageUploadProgress}>
                    {
                        imageUploadProgress?
                        <div className='v-14 w-14'>
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} />
                        </div>:
                        <div>
                            Upload
                        </div>
                    }
                </Button>

            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {
                formData.image && <img src={formData.image}></img>
            }
            <ReactQuill theme='snow' placeholder='Write your content...' className='h-80 mb-12' required onChange={(value)=>setFormData({...formData, content: value})}></ReactQuill>
            
            <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
            {publishError && <Alert color='failure'>{publishError}</Alert>}
            
        </form>
    </div>
  )
}

export default CreatePost;