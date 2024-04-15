import React from 'react';
import {Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-bold'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'></TextInput>
                <Select>
                    <option value="uncategorized">Select a category</option>
                    <option value="Javascript">Javascript</option>
                    <option value='React.Js'>React.Js</option>
                    <option value='Node.Js'>Node.Js</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-betwen border-2 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button>

            </div>
            <ReactQuill theme='snow' placeholder='Write your content...' className='h-80 mb-12' required></ReactQuill>
            
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            
        </form>
    </div>
  )
}

export default CreatePost;