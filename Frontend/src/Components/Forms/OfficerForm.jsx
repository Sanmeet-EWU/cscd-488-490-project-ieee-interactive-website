import { useState } from "react"; // Import React hook for managing state
import request from "../../api/axiosConfig"; // Import custom axios configuration for API requests
// Note: Possibly style "Add Social Media" button

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

  // List of available social media platforms for selection
  const socialMediaPlatforms = [
    "LinkedIn",
    "Instagram",
    "Snapchat",
    "Youtube",
    "Twitch",
    "Twitter",
    "Facebook",
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
    const updatedAccounts = formData.social_media.map((account, i) =>
      i === index ? { ...account, [field]: value } : account,
    );
    setFormData({
      ...formData,
      social_media: updatedAccounts,
    });
  };

  // Handle form submission for creating or updating an officer
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object to handle file uploads along with other form fields
    const formDataToSend = new FormData();
    // Append all formData entries to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      // For social_media, stringify the value as it's an array of objects
      if (key === "social_media") {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (key === "profile" && value) {
        // Append file if profile exists
        formDataToSend.append(key, value);
      } else if (key === "is_former_officer") {
        // Explicitly send as a boolean string ("true" or "false")
        formDataToSend.append(key, value ? "true" : "false");
      } else {
        // Append other fields directly
        formDataToSend.append(key, value);
      }
    });

    try {
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
            >
              <option value="" disabled>
                Select a platform
              </option>
              {socialMediaPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
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
              placeholder="Enter URL"
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
          onChange={(e) => {
            setFormData({ ...formData, profile: e.target.files[0] });
            // Log the selected file for debugging purposes
            console.log(e.target.files[0]);
          }}
        />
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
