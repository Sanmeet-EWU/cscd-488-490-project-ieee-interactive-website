import { useState } from "react"; // Import React hook for managing state
import request from "../../api/axiosConfig"; // Import custom axios configuration for API requests

// OfficerForm component receives officer data and callback functions for submit and cancel actions
export default function OfficerForm({ officer, onSubmit, onCancel }) {
  // Initialize form state using existing officer data (if provided) or default values
  const [formData, setFormData] = useState({
    name: officer?.name || "",
    position: officer?.position || "",
    email: officer?.email || "",
    chapter_group: officer?.chapter_group || "sc",
    social_media: officer?.social_media || [],
    bio: officer?.bio || "",
    profile: officer?.profile || null,
    is_former_officer: officer?.is_former_officer || false,
  });
  
  // State to track validation errors
  const [errors, setErrors] = useState({});

  // List of chapter/group options available in the form
  const chapters = [
    { id: "sc", name: "Spokane Section" },
    { id: "power", name: "Chapter: Power & Energy Society" },
    {
      id: "comp", 
      name: "Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies",
    },
    {
      id: "tech",
      name: "Joint Chapter: Technology Management and Industry Application Societies",
    },
    { id: "yp", name: "Affinity Group: Young Professionals (YP)" },
    { id: "wie", name: "Affinity Group: Women In Engineering (WIE)" },
  ];

  // List of allowed social media platforms with their URL patterns
  const socialMediaPlatforms = [
    { 
      name: "LinkedIn",
      pattern: "^https?://(?:www\\.)?linkedin\\.com/.*$",
      placeholder: "https://linkedin.com/in/username"
    },
    { 
      name: "Instagram",
      pattern: "^https?://(?:www\\.)?instagram\\.com/.*$",
      placeholder: "https://instagram.com/username"
    },
    { 
      name: "GitHub",
      pattern: "^https?://(?:www\\.)?github\\.com/.*$",
      placeholder: "https://github.com/username"
    }
  ];

  // Handler to add a new empty social media entry to the formData
  const handleAddSocialMedia = () => {
    setFormData({
      ...formData,
      social_media: [...formData.social_media, { platform: "", url: "" }],
    });
  };

  // Handler to remove a social media entry from formData by its index
  const handleRemoveSocialMedia = (index) => {
    const updatedAccounts = formData.social_media.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      social_media: updatedAccounts,
    });
  };

  // Handler to update a specific field (platform or url) in a social media entry
  const handleSocialMediaChange = (index, field, value) => {
    const updatedAccounts = formData.social_media.map((account, i) => {
      if (i === index) {
        const updatedAccount = { ...account, [field]: value };
        // If platform is changed, reset the URL
        if (field === "platform") {
          updatedAccount.url = "";
        }
        return updatedAccount;
      }
      return account;
    });
    setFormData({
      ...formData,
      social_media: updatedAccounts,
    });
  };
  
  // Function to validate file size
  const validateFileSize = (file) => {
    // 10MB in bytes
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    
    if (file && file.size > MAX_FILE_SIZE) {
      return "File size exceeds 10MB limit. Please choose a smaller image.";
    }
    
    return null;
  };
  
  // Handle file input change with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file size
      const errorMessage = validateFileSize(file);
      
      if (errorMessage) {
        // Set error message
        setErrors({...errors, profile: errorMessage});
        // Alert the user
        alert(errorMessage);
        // Reset the file input
        e.target.value = '';
      } else {
        // Clear any previous errors for this field
        const newErrors = {...errors};
        delete newErrors.profile;
        setErrors(newErrors);
        
        // Update form data with the file
        setFormData({ ...formData, profile: file });
        // Log the selected file for debugging purposes
        console.log(file);
      }
    }
  };

  // Handle form submission for creating or updating an officer
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      // Alert the user about validation errors
      alert("Please fix the errors before submitting the form.");
      return;
    }

    try {
      let profileUrl = formData.profile;

      // If a new profile image is selected, upload it to Cloudinary
      if (formData.profile && formData.profile instanceof File) {
        const uploadData = new FormData();
        uploadData.append('file', formData.profile);
        uploadData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'ieee-images');
        uploadData.append('folder', 'officers');

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
          profileUrl = data.secure_url;
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          throw error;
        }
      }

      // Create a FormData object to handle file uploads along with other form fields
      const formDataToSend = new FormData();
      // Append all formData entries to the FormData object
      Object.entries({...formData, profile: profileUrl}).forEach(([key, value]) => {
        // For social_media, stringify the value as it's an array of objects
        if (key === "social_media") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === "is_former_officer") {
          // Explicitly send as a boolean string ("true" or "false")
          formDataToSend.append(key, value ? "true" : "false");
        } else {
          // Append other fields directly
          formDataToSend.append(key, value);
        }
      });

      // If editing an existing officer, send a PATCH request; otherwise, send a POST request to add a new officer
      if (officer) {
        await request("patch", `/officers/${officer.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await request("post", "/officers", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Convert FormData entries to a plain object (useful for passing back to parent component)
      const plainObject = Object.fromEntries(formDataToSend.entries());
      // Call onSubmit callback with the plain object representing the submitted data
      onSubmit(plainObject);
    } catch (error) {
      // Log any errors that occur during the submission process
      console.error("Error submitting officer data:", error);
    }
  };

  return (
    // Render the form with multipart encoding for file uploads
    <form
      onSubmit={handleSubmit}
      className="admin-form"
      encType="multipart/form-data"
    >
      {/* Chapter/Group selection */}
      <div className="form-group">
        <label>Chapter/Group</label>
        <select
          value={formData.chapter_group}
          onChange={(e) =>
            setFormData({ ...formData, chapter_group: e.target.value })
          }
          required
        >
          {chapters.map((chapter) => (
            <option key={chapter.name} value={chapter.id}>
              {chapter.name}
            </option>
          ))}
        </select>
      </div>

      {/* Officer name input */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* Officer position input */}
      <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          required
        />
      </div>

      {/* Officer email input */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      {/* Former officer selection */}
      <div className="form-group">
        <label>Is Former Officer?</label>
        <select
          value={formData.is_former_officer ? "true" : "false"}
          onChange={(e) =>
            setFormData({
              ...formData,
              is_former_officer: e.target.value === "true",
            })
          }
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      {/* Social Media Accounts section */}
      <div className="form-group">
        <label>Social Media Accounts</label>
        {/* Render a social media entry for each account in the social_media array */}
        {formData.social_media.map((account, index) => (
          <div key={index} className="social-media-entry">
            {/* Dropdown to select the social media platform */}
            <select
              value={account.platform}
              onChange={(e) =>
                handleSocialMediaChange(index, "platform", e.target.value)
              }
              required
            >
              <option value="" disabled>
                Select a platform
              </option>
              {socialMediaPlatforms.map((platform) => (
                <option key={platform.name} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
            {/* URL input for the selected social media account */}
            <input
              type="url"
              value={account.url}
              onChange={(e) =>
                handleSocialMediaChange(index, "url", e.target.value)
              }
              placeholder={
                account.platform
                  ? socialMediaPlatforms.find(p => p.name === account.platform)?.placeholder
                  : "Enter URL"
              }
              pattern={
                account.platform
                  ? socialMediaPlatforms.find(p => p.name === account.platform)?.pattern
                  : undefined
              }
              required
            />
            {/* Button to remove this social media entry */}
            <button
              type="button"
              onClick={() => handleRemoveSocialMedia(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {/* Button to add a new social media account entry */}
        <button type="button" onClick={handleAddSocialMedia}>
          Add Social Media
        </button>
      </div>

      {/* Bio textarea input */}
      <div className="form-group">
        <label>Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>

      {/* File input for profile picture */}
      <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {errors.profile && <div className="error-message">{errors.profile}</div>}
        <small>Maximum file size: 10MB</small>
      </div>

      {/* Form action buttons for submit and cancel */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {officer ? "Update Officer" : "Add Officer"}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
