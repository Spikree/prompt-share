"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@node_modules/next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const {data: session } = useSession();
    const router = useRouter();
    const [posts,setPosts] = useState([]);

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
 
    if(session?.user.id) {
        fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?")

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`,{
          method: 'DELETE'
        })

        fetchPosts();
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Profile
      name="my"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
