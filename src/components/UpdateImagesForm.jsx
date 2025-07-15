import { useState } from 'react';
import axios from 'axios';

function UpdateImagesForm({ onUpdated }) {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileImage) formData.append('profileImage', profileImage);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const res = await axios.patch('http://localhost:5000/api/user/images', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Images updated!');
      if (onUpdated) onUpdated(); 
    } catch (err) {
      console.error('Image Update Error:', err);
      alert(err?.response?.data?.msg || 'Failed to update images');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <h3>Update Images</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Profile Image: </label>
        <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Cover Image: </label>
        <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateImagesForm;
