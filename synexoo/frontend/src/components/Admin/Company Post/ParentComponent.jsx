// ParentComponent.jsx (or similar)

import React, { useState } from "react";
import CompanyPost from "./CompanyPost"; // Adjust the path as needed
import CompanyApply from "../../client/Company Apply/CompanyApply";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleAddPost = () => {
    setEditPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setIsModalOpen(true);
  };

  const handlePostSuccess = (newPost) => {
    setPosts((prevPosts) => {
      if (editPost) {
        return prevPosts.map((p) => (p._id === newPost._id ? newPost : p));
      } else {
        return [...prevPosts, newPost];
      }
    });
    setIsModalOpen(false);
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(
        `https://project-s-nuaq.onrender.com/api/jobs/delete/${id}`
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <button
        onClick={handleAddPost}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Post
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <CompanyPost post={editPost} onSuccess={handlePostSuccess} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <CompanyApply
        isAdmin={true}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        posts={posts}
      />
    </div>
  );
};

export default ParentComponent;
