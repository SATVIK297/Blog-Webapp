// import { Button } from 'flowbite-react'
// import React, { useState } from 'react'
// import {  Select, TextInput } from 'flowbite-react';
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import PostCard from '../components/PostCard';


// const ContactUs = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showMore, setShowMore] = useState(false);


//   useEffect(() => {
    
//     const fetchPosts = async () => {
//       setLoading(true);
//       const res = await fetch(`/api/post/getposts`);
//       if (!res.ok) {
//         setLoading(false);
//         return;
//       }
//       if (res.ok) {
//         const data = await res.json();
//         setPosts(data.posts);
//         setLoading(false);
//         if (data.posts.length === 9) {
//           setShowMore(true);
//         } else {
//           setShowMore(false);
//         }
//       }
//     };
//     fetchPosts();
//   }, [location.search]);
  


//   const handleShowMore = async () => {
//     const numberOfPosts = posts.length;
//     const startIndex = numberOfPosts;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('startIndex', startIndex);
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/post/getposts?${searchQuery}`);
//     if (!res.ok) {
//       return;
//     }
//     if (res.ok) {
//       const data = await res.json();
//       setPosts([...posts, ...data.posts]);
//       if (data.posts.length === 9) {
//         setShowMore(true);
//       } else {
//         setShowMore(false);
//       }
//     }
//   };


//   return (
//     <div className='w-full'>
//     <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
//       Posts results:
//     </h1>
//     <div className='p-7 flex flex-wrap gap-4'>
//       {!loading && posts.length === 0 && (
//         <p className='text-xl text-gray-500'>No posts found.</p>
//       )}
//       {loading && <p className='text-xl text-gray-500'>Loading...</p>}
//       {!loading &&
//         posts &&
//         posts.map((post) => <PostCard key={post._id} post={post} />)}
//       {showMore && (
//         <button
//           onClick={handleShowMore}
//           className='text-teal-500 text-lg hover:underline p-7 w-full'
//         >
//           Show More
//         </button>
//       )}
//     </div>
//   </div>
//   )
// }

// export default ContactUs





import { Button } from 'flowbite-react';
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('There was an error sending the message!', error);
      alert('There was an error sending the message!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button gradientDuoTone="purpleToPink" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
