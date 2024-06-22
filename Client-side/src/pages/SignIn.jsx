import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import {  useDeferredValue, useState } from "react"
import { Link ,useNavigate} from "react-router-dom"

import { signInFailure , signInStart ,signInSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import OAuth from "../components/OAuth"



const SignIn = () => {

  const [formData , setFormData]=  useState({})
  // const [errorMessage , setErrorMessage]  =useState(null);
  // const [loading , setLoading] = useState(false);
  //instead of these state we can use 

  //since i have define loading and error in my reducer so i can import them using use sleeector 

  //here i have imported error as errorMessage for better understanding
  const {loading , error : errorMessage} = useSelector(state=>state.user)

  

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleChange = (e)=>{

    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('please fill out all the details'))
    }
    try {
      dispatch(signInStart()) //when sign in starts it sets loading to true and error to null
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
       dispatch(signInFailure(data.message)); //if failed then error message needed to be passed as payload
      }
      if(res.ok) {
        dispatch(signInSuccess(data))  //passing user data as it is going  to be payload 
        navigate('/');
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message)); //if failed then error message needed to be passed as payload

    }
  };
  
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* {left side} */}
        <div className="flex-1">
        <Link to="/" className=' text-xxl font-bold dark:text-white text-4xl' > 
          <span className='px-2 py-1 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 rounded-lg text-white'>InspireLog</span>
          </Link>
          <p className='text-xl mt-5 font-black '>
           INSPIRE THE WORLD 
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
         
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email' 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password' 
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
              
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && 
          <Alert className="mt-5"> {errorMessage}</Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn