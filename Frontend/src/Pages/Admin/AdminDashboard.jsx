import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { SiFirebase } from "react-icons/si";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";
import EventForm from "../../Components/Forms/EventForm";
import OfficerForm from "../../Components/Forms/OfficerForm";
import request from "../../api/axiosConfig";

// AdminDashboard component manages both events and officers data
const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { currentUser, logout } = useAuth(); // Destructure currentUser and logout function from Auth context

  // State to control the active tab: "events" or "officers"
  const [activeTab, setActiveTab] = useState("events");
  // State to show or hide the form modal (for adding/editing items)
  const [showForm, setShowForm] = useState(false);
  // State to store the currently selected item (for editing)
  const [selectedItem, setSelectedItem] = useState(null);
  // State arrays to hold events and officers data
  const [events, setEvents] = useState([]);
  const [officers, setOfficers] = useState([]);

  // Function to fetch events and officers data from the API
  const fetchEvents = async () => {
    try {
      // Request events and officers data from the backend
      const dataEvents = await request("get", "/events");
      const dataOfficers = await request("get", "/officers");
      // Update the state with the fetched data
      setEvents(dataEvents);
      setOfficers(dataOfficers);
      console.log(dataOfficers);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // useEffect to fetch data on component mount or when the currentUser changes.
  // Also, if no currentUser, redirect to the admin login page.
  useEffect(() => {
    if (!currentUser) {
      navigate("/admin");
    } else {
      fetchEvents();
    }
  }, [currentUser, navigate]);

  // Logout handler: call the logout function and navigate back to the login page
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Handler for form submission (both add and edit)
  const handleFormSubmit = async (data) => {
    // Refresh data after submission
    fetchEvents();
    // Check if editing an existing item (selectedItem not null)
    const isEditing = selectedItem !== null;
    // Determine which state to update based on active tab
    const updateState = activeTab === "events" ? setEvents : setOfficers;

    if (isEditing) {
      // Update the existing item in the corresponding state array
      updateState((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id ? { ...data, id: item.id } : item,
        ),
      );
    } else {
      // Add new item to the corresponding state array
      updateState((prevData) => {
        console.log(data);
        return [...prevData, { ...data }];
      });
    }

    // Close the form modal and clear the selected item
    setShowForm(false);
    setSelectedItem(null);
  };

  // Handler to delete an item (either event or officer)
  const handleDelete = async (id) => {
    try {
      // Determine the correct API endpoint based on active tab
      const endpoint =
        activeTab === "events" ? `/events/${id}` : `/officers/${id}`;
      await request("delete", endpoint); // Perform delete request

      // Update the state by filtering out the deleted item
      if (activeTab === "events") {
        setEvents((prev) => prev.filter((item) => item.id !== id));
      } else {
        setOfficers((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(
        `Error deleting ${activeTab === "events" ? "event" : "officer"}:`,
        error,
      );
    }
  };

  // Function to render the list of items (events or officers) based on the active tab
  const renderList = () => {
    // Choose the data array based on activeTab
    const data = activeTab === "events" ? events : officers;
    return data?.map((item, index) => (
      <div key={index} className="item-card">
        <div className="item-content">
          {/* Display title for events or name for officers */}
          <h4>{item.title2 || item.name}</h4>
          {/* If available, display event date and time */}
          {item.event_date && (
            <p>{`${item.event_date.split("T")[0]} at ${item.event_time.substring(0, 5)}`}</p>
          )}
          {/* Display officer position if present */}
          {item.position && <p>{item.position}</p>}
          {/* Display location for events or email for officers */}
          <p>{item.location || item.email}</p>
        </div>
        <div className="item-actions">
          {/* Edit button: open form with selected item data */}
          <button
            onClick={() => {
              setSelectedItem(item);
              setShowForm(true);
            }}
            className="btn-edit"
          >
            <FaEdit />
          </button>
          {/* Delete button: remove the item */}
          <button onClick={() => handleDelete(item.id)} className="btn-delete">
            <FaTrash />
          </button>
        </div>
      </div>
    ));
  };

  // If user is not authenticated, render nothing
  if (!currentUser) return null;

  return (
    <div className="admin-dashboard">
      {/* Dashboard header with title and logout button */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
        {/* Tab navigation to switch between managing events and officers */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            <FaCalendarAlt /> Events
          </button>
          <button
            className={`tab-button ${activeTab === "officers" ? "active" : ""}`}
            onClick={() => setActiveTab("officers")}
          >
            <FaUsers /> Officers
          </button>
          <button className="tab-button">
          <a href="https://console.firebase.google.com/u/0/project/caitlinchb-75527"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
          >
            <SiFirebase /> Firebase
          </a>
          </button>
        </div>
      </div>

      {/* Main content area for dashboard */}
      <div className="dashboard-content">
        <div className="section">
          {/* Section header with title and add button */}
          <div className="section-header">
            <h2>
              {activeTab === "events"
                ? "Event Management"
                : "Officer Management"}
            </h2>
            <button className="btn-add" onClick={() => setShowForm(true)}>
              <FaPlus /> Add {activeTab === "events" ? "Event" : "Officer"}
            </button>
          </div>
          {/* Render form modal for adding or editing an item */}
          {showForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>
                  {selectedItem ? "Edit" : "Add New"}{" "}
                  {activeTab === "events" ? "Event" : "Officer"}
                </h3>
                {activeTab === "events" ? (
                  <EventForm
                    event={selectedItem}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setSelectedItem(null);
                    }}
                  />
                ) : (
                  <OfficerForm
                    officer={selectedItem}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setSelectedItem(null);
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {/* Render the list of items (events or officers) */}
          <div className="items-list">{renderList()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
