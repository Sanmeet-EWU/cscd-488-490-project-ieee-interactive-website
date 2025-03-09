import { useEffect, useState } from "react";
import request from "../../api/axiosConfig";

// EventForm component receives event data and callback functions for submit and cancel actions
export default function EventForm({ event, onSubmit, onCancel }) {
  // Initialize form state with provided event data or default empty values
  const [formData, setFormData] = useState(
    event || {
      title2: "",
      event_date: "",
      event_time: "",
      location: "",
      description: "",
      link: "",
      banner: null,
    },
  );

  // Update the form state when the event prop changes (e.g., when editing an existing event)
  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        // Format event_date to a YYYY-MM-DD string for the date input field
        event_date: event.event_date ? event.event_date.split("T")[0] : "",
        // Format event_time to a HH:MM string for the time input field
        event_time: event.event_time ? event.event_time.substring(0, 5) : "",
      });
    }
  }, [event]);

  // Handle for submission
  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent the default form submission behavior

    try {
      let bannerUrl = formData.banner;

      // If a new banner image is selected, upload it to Cloudinary
      if (formData.banner && formData.banner instanceof File) {
        const uploadData = new FormData();
        uploadData.append('file', formData.banner);
        uploadData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'ieee-images');
        uploadData.append('folder', 'events');

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, 
            {
              method: 'POST',
              body: uploadData,
            }
          );
    
          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }
          
          const data = await response.json();
          bannerUrl = data.secure_url;
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          throw error;
        }
      }

      // Create a new FormData object to handle file uploads along with other form fields
      const formDataToSend = new FormData();
      // Append each key/value pair from formData to formDataToSend
      Object.entries({ ...formData, banner: bannerUrl }).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // If editing an existing event, send a PATCH request; otherwise, send a POST request to create a new event
      if (event) {
        await request("patch", `/events/${event.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await request("post", "/events", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Convert FormData entries to a plain object (useful for passing back to the parent component)
      const plainObject = Object.fromEntries(formDataToSend.entries());

      // Call onSubmit callback with the plain object representing the form data
      onSubmit(plainObject);
    } catch (error) {
      // Log any errors that occur during submission process
      console.error("Error submitting event:", error);
    }
  };

  return (
    // Form element with multipart/form-data encoding for file uploads
    <form
      onSubmit={handleSubmit}
      className="admin-form"
      encType="multipart/form-data"
    >
      {/* Input field for the event title */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title2}
          onChange={(e) => setFormData({ ...formData, title2: e.target.value })}
          required
        />
      </div>
      {/* Input field for the event date */}
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.event_date}
          onChange={(e) =>
            setFormData({ ...formData, event_date: e.target.value })
          }
          required
        />
      </div>
      {/* Input field for the event time */}
      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={formData.event_time}
          onChange={(e) =>
            setFormData({ ...formData, event_time: e.target.value })
          }
          required
        />
      </div>
      {/* Input field for the event location */}
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
      </div>
      {/* Textarea for the event description */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      {/* Input field for the event link */}
      <div className="form-group">
        <label>Event Link</label>
        <input
          type="text"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />
      </div>
      {/* File input for the banner image */}
      <div className="form-group">
        <label>Banner Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            // Set the first selected file as the banner image in formData
            setFormData({ ...formData, banner: e.target.files[0] });
            // Log the file to the console for debugging
            console.log(e.target.files[0]);
          }}
        />
      </div>
      {/* Form actions: Submit and Cancel buttons */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {event ? "Update Event" : "Add Event"}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}