import React, { useState } from 'react';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () =>  {
    const [title, setTitle] = useState(""); // State to track event title input value

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
                    <input 
                        type="text" 
                        placeholder="Enter date of event" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <div className="info">Time</div>
                    <input 
                        type="text" 
                        placeholder="Enter time of event" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="input"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
