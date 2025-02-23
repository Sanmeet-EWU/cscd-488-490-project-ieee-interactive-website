//import React, { useEffect, useState } from "react";

import React from "react";
import "./PhotoGallery.css";
//import request from "../../api/axiosConfig";

/*const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPhotos = async () => {
        try {
            const response = await request.get("/photos");
            setPhotos(response.data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchPhotos();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="photo-gallery">
        {photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt={photo.description} />
        ))}
        </div>
    );
    }*/

const PhotoGallery = () => {
  console.log("PhotoGallery component is rendering");
  return (
    <div className="photo-container">
      <h1>Photo Gallery</h1>
      <p>This is a work in progress</p>
    </div>
  );
};
export default PhotoGallery;
