import {  Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon ,FaSun } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import {signOutSuccess} from "../redux/user/userSlice"
import { useEffect, useState } from "react";

const Header = () => {
  const path  = useLocation().pathname;
  const {currentUser} = useSelector((state)=>state.user)
  const {theme} = useSelector(state=>state.theme)
  const dispatch = useDispatch();
  const [searchTerm , setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  console.log(searchTerm)
  useEffect(()=>{

      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      
    } 

  },[location.search])
  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess()); //it makes the current user null
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search?searchTerm=${searchTerm}`)
    

  }

  return (
    <div>
        <Navbar className='border-b-2 '>
          <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' > 
          <span className='px-2 py-1 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 rounded-lg text-white'>InspireLog</span>
          </Link>

          <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
         
        />
      </form>

      <Button className=" w-12 h-10 lg:hidden" color='gray' pill>
        <AiOutlineSearch />
      </Button>
      
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline " color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
          
        </Button>

          {/* we want to remove this button of signin once the user signs i  */}

          {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
      <Navbar.Toggle />
    </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
        </Navbar>

    </div>
    
  )
}

export default Header