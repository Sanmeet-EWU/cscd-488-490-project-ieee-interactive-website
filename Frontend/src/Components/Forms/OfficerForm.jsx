import { useState } from "react";
import request from "../../api/axiosConfig";
// Note: Possibly style "Add Social Media" button

export default function OfficerForm({ officer, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: officer?.name || '',
        position: officer?.position || '',
        email: officer?.email || '',
        chapter_group: officer?.chapter_group || 'sc',
        social_media: officer?.social_media || [],
        bio: officer?.bio || '',
        profile: officer?.profile || null,
        is_former_officer: officer?.is_former_officer || false
    });

    const chapters = [
        { id: 'sc', name: 'Spokane Section' },
        { id: 'power', name: 'Chapter: Power & Energy Society' },
        { id: 'comp', name: 'Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies' },
        { id: 'tech', name: 'Joint Chapter: Technology Management and Industry Application Societies' },
        { id: 'yp', name: 'Affinity Group: Young Professionals (YP)' },
        { id: 'wie', name: 'Affinity Group: Women In Engineering (WIE)' },
    ];

    const socialMediaPlatforms = [
        'LinkedIn',
        'Instagram',
        'Snapchat',
        'Youtube',
        'Twitch',
        'Twitter',
        'Facebook'
    ];

    const handleAddSocialMedia = () => {
        setFormData({
            ...formData,
            social_media: [...formData.social_media, { platform: '', url: '' }]
        });
    };

    const handleRemoveSocialMedia = (index) => {
        const updatedAccounts = formData.social_media.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            social_media: updatedAccounts
        });
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedAccounts = formData.social_media.map((account, i) =>
            i === index ? { ...account, [field]: value } : account
        );
        setFormData({
            ...formData,
            social_media: updatedAccounts
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "social_media") {
                formDataToSend.append(key, JSON.stringify(value)); 
            } else if (key === "profile" && value) {
                formDataToSend.append(key, value); 
            } else {
                formDataToSend.append(key, value);
            }
        });
       
        try {
            if (officer) {
                await request('patch', `/officers/${officer.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await request('post', '/officers', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            const plainObject = Object.fromEntries(formDataToSend.entries());

            onSubmit(plainObject);
        } catch (error) {
            console.error('Error submitting officer data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
            <div className="form-group">
                <label>Chapter/Group</label>
                <select
                    value={formData.chapter_group}
                    onChange={(e) => setFormData({ ...formData, chapter_group: e.target.value })}
                    required
                >
                    {chapters.map(chapter => (
                        <option key={chapter.name} value={chapter.id}>
                            {chapter.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Position</label>
                <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Is Former Officer?</label>
                <select
                    value={formData.is_former_officer ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, is_former_officer: e.target.value === 'true' })}
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label>Social Media Accounts</label>
                {formData.social_media.map((account, index) => (
                    <div key={index} className="social-media-entry">
                        <select
                            value={account.platform}
                            onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                        >
                            <option value="" disabled>Select a platform</option> 
                            {socialMediaPlatforms.map(platform => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </select>
                        <input
                            type="url"
                            value={account.url}
                            onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                            placeholder="Enter URL"
                        />
                        <button type="button" onClick={() => handleRemoveSocialMedia(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddSocialMedia}>Add Social Media</button>
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setFormData({ ...formData, profile: e.target.files[0] });
                        console.log(e.target.files[0])
                    }}
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {officer ? 'Update Officer' : 'Add Officer'}
                </button>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};