import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import './Calendar.css';
import user_icon from '../Assets/profilePicture.png';
import CreateEvent from '../CreateEvent/CreateEvent.jsx'; // Import CreateEvent component
import { renderCalendar } from './CalendarFunctions'; // Import renderCalendar function
import editIcon from '../Assets/edit.png';
import deleteIcon from '../Assets/trash.png'; // Add delete icon import

const Main = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendars, setCalendars] = useState(['Calendar 1']); // Initial calendar
  const [editMode, setEditMode] = useState(Array(calendars.length).fill(false)); // Edit mode for each calendar
  const [checkboxColors, setCheckboxColors] = useState(Array(calendars.length).fill('#000000')); // Initial color for each checkbox
  const [showCreateEvent, setShowCreateEvent] = useState(false); // State to toggle CreateEvent visibility

  const handleEventButtonClick = () => {
    setShowCreateEvent(true); // Show the CreateEvent component
  };

  const addEvent = (eventData) => {
    setEvents([...events, eventData]);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const addCalendar = () => {
    const newCalendarName = `Calendar ${calendars.length + 1}`;
    setCalendars([...calendars, newCalendarName]);
    setEditMode([...editMode, false]);
    setCheckboxColors([...checkboxColors, '#000000']);
  };

  const toggleEditMode = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };

  const deleteCalendar = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this calendar?");
    if (isConfirmed) {
      const updatedCalendars = [...calendars];
      updatedCalendars.splice(index, 1);
      setCalendars(updatedCalendars);
      const updatedEditMode = [...editMode];
      updatedEditMode.splice(index, 1);
      setEditMode(updatedEditMode);
      const updatedColors = [...checkboxColors];
      updatedColors.splice(index, 1);
      setCheckboxColors(updatedColors);
    }
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...checkboxColors];
    updatedColors[index] = color;
    setCheckboxColors(updatedColors);
  };

  const handleSignOut = () => {
    // Redirect to the login page when signing out
    navigate("/");
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="background">
      <div className="containerHeader">
        <div className="headerColumnLeft">
          {/* Content for the first left column */}
        </div>
        <div className="headerColumnRight">
          <div className="signout-section">
            <button className="signoutButton" onClick={handleSignOut}>Sign Out</button>
            <div className="profile-picture">
              <img src={user_icon} alt="Profile" className="profile-img" />
            </div>
          </div>
        </div>
      </div>
  
      <div className="containerBody">
        <div className="bodyColumnLeft">
          <div className="textbody">Create</div>
          <div className="underline"></div>
          <div className='create-container'>
            <button className="eventButton" onClick={handleEventButtonClick}>Event</button>
          </div>
          <div className='create-container'>
            <button className="eventButton" onClick={addCalendar}>Calendar </button>
          </div>
          <div className="textbody2">My Calendars</div>
          <div className="underline"></div>
          {calendars.map((calendar, index) => (
            <div key={index} className='textCalendars'>
              <input type="checkbox" className="calendar-checkbox" style={{ backgroundColor: checkboxColors[index] }} />
              {editMode[index] ? (
                <div>
                  <input type="text" value={calendar} onChange={(e) => {
                    const updatedCalendars = [...calendars];
                    updatedCalendars[index] = e.target.value;
                    setCalendars(updatedCalendars);
                  }} />
                  <input type="color" value={checkboxColors[index]} onChange={(e) => handleColorChange(index, e.target.value)} style={{ width: '20px', height: '20px', border: 'none', padding: '0', marginLeft: '10px' }} />
                  <img src={deleteIcon} alt="Delete" className="deleteButton" onClick={() => deleteCalendar(index)} />
                </div>
              ) : (
                <span>{calendar}</span>
              )}
              <img src={editIcon} alt="Edit" className="editButton" onClick={() => toggleEditMode(index)} />
            </div>
          ))}
        </div>
        <div className="bodyColumnRight">
          <div className="calendar-header">
            <button onClick={prevMonth}>&lt;</button>
            <span className="calendar-title" colSpan="7">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            <button onClick={nextMonth}>&gt;</button>
          </div>
          <table className="calendar">
            <thead>
              <tr>
                {daysOfWeek.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderCalendar(currentDate, events, setEvents)}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Conditionally render CreateEvent component */}
      {showCreateEvent && (
        <div className="create-event-box">
          <CreateEvent addEvent={addEvent} />
        </div>
      )}
    </div>
  );
  
};

export default Main;
