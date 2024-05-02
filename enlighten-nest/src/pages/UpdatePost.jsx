import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

const UpdatePost = ()=>{

    const {currentUser} = useSelector((state)=>state.user);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imageUploadProgress,setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [publishError, setPublishError] = useState(null);
    const [formData, setFormData] = useState({title: '', content: '', category: '', image: null, slug:''});
    const {content, category, title} = formData;
    const postid = useParams();
    const navigate = useNavigate();

    console.log("postid = ",postid.postId);
    console.log("formData.category = ",typeof formData.category);
    
    console.log(formData)
    useEffect(()=>{
        try{
            const fetchPost = async ()=>{
                const res = await fetch(`/api/posts/getposts?postId=${postid.postId}`)
                
                const data = await res.json();

                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if(res.ok){
                    setPublishError(null);
                    console.log("posts: ", data.posts[0]);
                    setFormData(data.posts[0]);
                }
            }
            fetchPost();
        }
        catch(e){
            console.log(e);
            setPublishError(e);
        }
        
    }, [postid.postId]);

    const handleImageUpload = async () => {
        if (file instanceof File) { // Check if file is a valid File object
            console.log("image file = ",file);
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl); // Assuming setImageUrl is synchronous
            console.log("image =", imageUrl);
            setFormData({...formData, image: file});
        } else {
            console.log("Choose an image first");
        }

            if(!file){
                setImageUploadError('Select an image first.')
            }
            else{
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
                )
            }
    };
    console.log("upload task image = ",formData.image);

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`/api/posts/updatePost/${postid.postId}/${currentUser._id}`,{
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log("updatePost data = ",data);

            if(!res.ok){
                console.log("something went wrong while updating");
                setPublishError(data.message);
                console.log(data.message)
            }
            if(res.ok){
                console.log("updated");
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
            
        }
        catch(e){
            console.log("error: ",e)
        }
    }

    return <div className="min-h-screen p-3 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold justify-center flex items-center my-7">Update Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput placeholder="Title"
            className="flex-1"
            
            onChange={(e)=>setFormData({...formData, title: e.target.value, slug: title})}
            value={title}
           >

            </TextInput>
            <Select onChange={(e)=>setFormData({...formData, category: e.target.value})}
            value={category || 'uncategorized'}>
                {console.log("cat in select",formData.category)}
                <option value='uncategorized'>Select a category</option>
                <option value='Javascript'>Javascript</option>
                <option value='React.Js'>React.Js</option>
                <option value='Node.Js'>Node.Js</option>
            </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-2 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept="image/*" 
                onChange={(e)=>{
                    const selectedFile = e.target.files[0];
                    if(selectedFile){
                        setFile(selectedFile)
                    }
                    }}>
                </FileInput>
                <Button onClick={handleImageUpload} disabled={imageUploadProgress}>
                    {imageUploadProgress? <div className='v-12 w-12'>
                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} />
                    </div> :
                    <div>
                       Upload 
                    </div>}
                    
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>Choose another image</Alert>}
            {formData.image && <img src={imageURL}></img>}
            <ReactQuill className="h-80 mb-20"
            placeholder=""
            value={content}
            onChange={(value)=>setFormData({...formData, content: value})}>

            </ReactQuill>

            <Button type="submit" gradientDuoTone='purpleToPink'>
                Update
            </Button>
        </form>
        {publishError && <Alert color='failure'>{publishError}</Alert>}
        
            
        
    </div>
}
export default UpdatePost;