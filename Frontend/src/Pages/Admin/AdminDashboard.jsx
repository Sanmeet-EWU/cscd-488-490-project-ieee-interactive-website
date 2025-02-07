import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';
import EventForm from '../../Components/Forms/EventForm';
import OfficerForm from '../../Components/Forms/OfficerForm';
import request from '../../api/axiosConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [events, setEvents] = useState([]);
  const [officers, setOfficers] = useState([]);

  const fetchEvents = async () => {
    try {
      const dataEvents = await request('get', '/events');
      const dataOfficers = await request('get', '/officers');
      setEvents(dataEvents);
      setOfficers(dataOfficers);
      console.log(dataOfficers)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin');
    } else {
      fetchEvents();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleFormSubmit = async (data) => {
    fetchEvents()
    const isEditing = selectedItem !== null;
    const updateState = activeTab === 'events' ? setEvents : setOfficers;

    if (isEditing) {
      updateState((prevData) =>
        prevData.map(item => (item.id === selectedItem.id ? { ...data, id: item.id } : item))
      );
    } else {
      updateState((prevData) => {
        console.log(data);
        return [...prevData, { ...data }];
      });
    }

    setShowForm(false);
    setSelectedItem(null);
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = activeTab === 'events' ? `/events/${id}` : `/officers/${id}`;
      await request('delete', endpoint); // Delete request

      // Update the correct state
      if (activeTab === 'events') {
        setEvents(prev => prev.filter(item => item.id !== id));
      } else {
        setOfficers(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${activeTab === 'events' ? 'event' : 'officer'}:`, error);
    }
  };

  const renderList = () => {
    const data = activeTab === 'events' ? events : officers;
    return data.map((item, index) => (
      <div key={index} className="item-card">
        <div className="item-content">
          <h4>{item.title || item.name}</h4>
          {item.event_date && (
            <p>{`${item.event_date.split("T")[0]} at ${item.event_time.substring(0, 5)}`}</p>
          )}
          {item.position && <p>{item.position}</p>}
          <p>{item.location || item.email}</p>
        </div>
        <div className="item-actions">
          <button onClick={() => { setSelectedItem(item); setShowForm(true); }} className="btn-edit">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(item.id)} className="btn-delete">
            <FaTrash />
          </button>
        </div>
      </div>
    ));
  };


  if (!currentUser) return null;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        <div className="tab-navigation">
          <button className={`tab-button ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            <FaCalendarAlt /> Events
          </button>
          <button className={`tab-button ${activeTab === 'officers' ? 'active' : ''}`} onClick={() => setActiveTab('officers')}>
            <FaUsers /> Officers
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section">
          <div className="section-header">
            <h2>{activeTab === 'events' ? 'Event Management' : 'Officer Management'}</h2>
            <button className="btn-add" onClick={() => setShowForm(true)}>
              <FaPlus /> Add {activeTab === 'events' ? 'Event' : 'Officer'}
            </button>
          </div>
          {showForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>{selectedItem ? 'Edit' : 'Add New'} {activeTab === 'events' ? 'Event' : 'Officer'}</h3>
                {activeTab === 'events' ? (
                  <EventForm event={selectedItem} onSubmit={handleFormSubmit} onCancel={() => {
                    setShowForm(false);
                    setSelectedItem(null);
                  }} />
                ) : (
                  <OfficerForm officer={selectedItem} onSubmit={handleFormSubmit} onCancel={() => {
                    setShowForm(false);
                    setSelectedItem(null);
                  }} />
                )}
              </div>
            </div>
          )}
          <div className="items-list">{renderList()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// Fetch events from servers (havent tried)

/*const handleEventSubmit = async (eventData) => {
  try {
    const method = selectedEvent ? 'PUT' : 'POST';
    const url = selectedEvent
      ? `/admin-dashboard/events/${selectedEvent.id}`
      : '/admin-dashboard/events';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error('Failed to save event');

    fetchEvents(); // Refresh events after update
    setShowEventForm(false);
    setSelectedEvent(null);
  } catch (error) {
    console.error('Error saving event:', error);
  }
};

const handleDeleteEvent = async (id) => {
  try {
    await fetch(`/admin-dashboard/events/${id}`, { method: 'DELETE' });
    fetchEvents(); // Refresh events after deletion
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};
*/


// For moving Officers to FormerOfficers

/*const moveOfficerById = (officerId) => {
  const moveQuery = `
      INSERT INTO former_officers (chapter_id, name, title, email, icon_url, bio, date_ended)
      SELECT chapter_id, name, title, email, icon_url, bio, CURDATE()
      FROM officers WHERE id = ?;
  `;
  
  const deleteQuery = "DELETE FROM officers WHERE id = ?;";

  db.query(moveQuery, [officerId], (err, result) => {
      if (err) throw err;
      db.query(deleteQuery, [officerId], (err, result) => {
          if (err) throw err;
          console.log(`Moved officer with ID ${officerId} to former_officers`);
      });
  });
};

// Example: Move officer with ID 3
moveOfficerById(3);*/
