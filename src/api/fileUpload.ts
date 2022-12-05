import axios from "axios";

const CLOUDINARY_KEY = import.meta.env.VITE_CLOUDINARY_KEY;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;


export const fileUpload = async (files: File[]) => {
  const uploaders = files.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('tags', `codeinfuse, medium, gist`);
    formData.append('upload_preset', CLOUDINARY_PRESET); // Replace the preset name with your own
    formData.append('api_key', CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
    formData.append('timestamp', String((Date.now() / 1000) | 0));

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData, config)
      .then(response => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  axios.all(uploaders).then(res => {
    // ... perform after upload is successful operation
    console.log(res);
  });
}
