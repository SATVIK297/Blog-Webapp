import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eligendi quaerat in quibusdam maiores fuga, et molestiae eaque incidunt cupiditate vitae quo ipsa quasi repellat cum saepe voluptatem, iste porro facilis aut obcaecati ducimus odio? Hic doloremque, perferendis velit accusamus ab ut voluptatem dicta alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quasi quaerat pariatur sed aspernatur, aliquam modi soluta similique repellendus? Quisquam, quas. Quisquam, quas. Quisquam, quas
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
   

      <div className='max-w-6xl mx-auto p-3 flex flex-col  gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap  justify-center gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home