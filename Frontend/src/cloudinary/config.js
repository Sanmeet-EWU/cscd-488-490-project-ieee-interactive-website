// Cloudinary configuration
// import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with your credentials
// Note: In production, these values should be stored in environment variables
// cloudinary.config({
//   cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
//   api_key: process.env.REACT_APP_CLOUDINARY_API_KEY || 'your_api_key',
//   api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET || 'your_api_secret',
//   secure: true
// });

// export default cloudinary;


import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  },
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY || 'your_api_key',
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET || 'your_api_secret'
});

export default cloudinary;