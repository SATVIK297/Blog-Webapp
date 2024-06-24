import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import  { getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const DashProfile = () => {

  const {currentUser} = useSelector(state=>state.user)
  const [imageFile  ,setImageFile] =useState(null);
  const [imageFileURL , setImageFileURL] = useState('')
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  //we use useref hook to update image state without re rendering the page
  const filePickerRef = useRef();

  const handleImageChange =(e)=>{
    
      //we need to conver this image file to url so that i can save it in y data base
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async()=>{

    //this app is from firebase export file app
    setImageFileUploadError(null);
    const storage = getStorage(app)
    //we are adding date because name is not unique and user might get error
    const filename = new Date().getTime()+  imageFile.name;
    const storageRef = ref(storage ,filename)
    const uploadTask = uploadBytesResumable(storageRef , imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //it shoows that how much perce tage it  has been uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
         setImageFileUploadError('Could not upload image (File must be less than 2MB)' );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          // setFormData({ ...formData, profilePicture: downloadURL });
          // setImageFileUploading(false);
        });
      }
    );
  };

  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'> 
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type="file" accept='image/*' onChange={handleImageChange} 
        ref={filePickerRef}
        hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>
          filePickerRef.current.click()
        }>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
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
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
           <img
            src={imageFileURL || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError &&
         <Alert color='failure'>
          {imageFileUploadError}
        </Alert>
        }
       
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
        />
         <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
        >
        </Button>
      
      </form>
      <div className=' flex justify-between mt-5'>
      <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          
        >
          Delete Account
        </Button>
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default DashProfile