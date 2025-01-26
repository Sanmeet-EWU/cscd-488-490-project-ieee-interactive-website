import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(event || {
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: '',
    banner: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Event Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Banner Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({...formData, banner: e.target.files[0]})}
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

const OfficerForm = ({ officer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(officer || {
    name: '',
    position: '',
    email: '',
    chapter: 'ieee'
  });

  const chapters = [
    { id: 'ieee', name: 'Spokane Section' },
    { id: 'cs', name: 'Chapter: Power & Energy Society' },
    { id: 'wie', name: 'Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies' },
    { id: 'csie', name: 'Joint Chapter: Technology Management and Industry Application Societies' },
    { id: 'cs', name: 'Affinity Group: Women In Engineering (WIE)' },
    { id: 'cs', name: 'Affinity Group: Young Professionals (YP)' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label>Chapter/Group</label>
        <select
          value={formData.chapter}
          onChange={(e) => setFormData({...formData, chapter: e.target.value})}
          required
        >
          {chapters.map(chapter => (
            <option key={chapter.id} value={chapter.id}>
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
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showOfficerForm, setShowOfficerForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleEventSubmit = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...eventData, id: event.id } : event
      ));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleOfficerSubmit = (officerData) => {
    if (selectedOfficer) {
      setOfficers(officers.map(officer => 
        officer.id === selectedOfficer.id ? { ...officerData, id: officer.id } : officer
      ));
    } else {
      setOfficers([...officers, { ...officerData, id: Date.now() }]);
    }
    setShowOfficerForm(false);
    setSelectedOfficer(null);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt /> Events
          </button>
          <button 
            className={`tab-button ${activeTab === 'officers' ? 'active' : ''}`}
            onClick={() => setActiveTab('officers')}
          >
            <FaUsers /> Officers
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'events' ? (
          <div className="section">
            <div className="section-header">
              <h2>Event Management</h2>
              <button className="btn-add" onClick={() => setShowEventForm(true)}>
                <FaPlus /> Add Event
              </button>
            </div>
            {showEventForm && (
              <div className="modal">
                <div className="modal-content">
                  <h3>{selectedEvent ? 'Edit Event' : 'Add New Event'}</h3>
                  <EventForm 
                    event={selectedEvent}
                    onSubmit={handleEventSubmit}
                    onCancel={() => {
                      setShowEventForm(false);
                      setSelectedEvent(null);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="items-list">
              {events.map(event => (
                <div key={event.id} className="item-card">
                  <div className="item-content">
                    <h4>{event.title}</h4>
                    <p>{event.date} at {event.time}</p>
                    <p>{event.location}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventForm(true);
                      }} 
                      className="btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => setEvents(events.filter(e => e.id !== event.id))} 
                      className="btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="section">
            <div className="section-header">
              <h2>Officer Management</h2>
              <button className="btn-add" onClick={() => setShowOfficerForm(true)}>
                <FaPlus /> Add Officer
              </button>
            </div>
            {showOfficerForm && (
              <div className="modal">
                <div className="modal-content">
                  <h3>{selectedOfficer ? 'Edit Officer' : 'Add New Officer'}</h3>
                  <OfficerForm 
                    officer={selectedOfficer}
                    onSubmit={handleOfficerSubmit}
                    onCancel={() => {
                      setShowOfficerForm(false);
                      setSelectedOfficer(null);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="items-list">
              {officers.map(officer => (
                <div key={officer.id} className="item-card">
                  <div className="item-content">
                    <h4>{officer.name}</h4>
                    <p>{officer.position}</p>
                    <p>{officer.email}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => {
                        setSelectedOfficer(officer);
                        setShowOfficerForm(true);
                      }} 
                      className="btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => setOfficers(officers.filter(o => o.id !== officer.id))} 
                      className="btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
