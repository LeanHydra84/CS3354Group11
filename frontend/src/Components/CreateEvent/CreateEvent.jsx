import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () =>  {
    const [title, setTitle] = useState(""); // State to track event title input value
    const [date, setDate] = useState(null); // State to track event date input value
    const [time, setTime] = useState(""); // State to track event time input value
    const [description, setDescription] = useState(""); // State to track event description input value
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Check if title, date, and time are empty
        if (!title.trim() || !date || !time.trim()) {
            setError("Please fill out all fields: Title, Date, and Time.");
            return;
        }

        // Check if date and time are valid
        if (!isValidTime(time)) {
            setError("Please enter a valid time.");
            return;
        }

        // If all validations pass, navigate to home
        navigate("/home");
    };

    const isValidTime = (time) => {
        // Regular expression to validate time format (HH:MM AM/PM)
        const timeFormat = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;

        if (!time.match(timeFormat)) {
            return false; // Time format is invalid
        }

        return true; // Time is valid
    };

    return(
        <div className="container">
            <div className="header">
                <div className="text">Create Event</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input-container">
                    <div className="info">Title</div>
                    <input 
                        type="text" 
                        placeholder="Enter event title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <div className="info">Date</div>
                    <DatePicker 
                        selected={date}
                        onChange={(date) => setDate(date)}
                        placeholderText="Select date"
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <div className="info">Time</div>
                    <input 
                        type="text" 
                        placeholder="12:00 AM" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <div className="info">Description</div>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="description-input"
                    />
                </div>
            </div>
            {error && <div className="errormessage">{error}</div>}
            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
};

export default CreateEvent;
