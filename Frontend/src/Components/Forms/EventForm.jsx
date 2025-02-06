import { useEffect, useState } from "react";
import request from "../../api/axiosConfig";

export default function EventForm({ event, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(event || {
        title: '',
        event_date: '',
        event_time: '',
        location: '',
        description: '',
        link: '',
        banner: null
    });

    useEffect(() => {
        if (event) {
            setFormData({
                ...event,
                event_date: event.event_date ? event.event_date.split('T')[0] : '', 
                event_time: event.event_time ? event.event_time.substring(0, 5) : '' 
            });
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
    
        try {
            if (event) {
                await request('patch', `/events/${event.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await request('post', '/events', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
    
            const plainObject = Object.fromEntries(formDataToSend.entries());
    
            onSubmit(plainObject);
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Time</label>
                <input
                    type="time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Event Link</label>
                <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Banner Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>{
                        setFormData({ ...formData, banner: e.target.files[0] });
                        console.log(e.target.files[0])
                    }}
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {event ? 'Update Event' : 'Add Event'}
                </button>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};