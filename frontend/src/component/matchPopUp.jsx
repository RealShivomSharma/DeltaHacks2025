// MatchPopup.js
import React from 'react';
import './matchPopUp.css'; // Import styles for the popup
import { IoCalendarNumberSharp, IoChatbubblesOutline, IoLocation } from "react-icons/io5";
import { FaBath, FaBed, FaClock } from "react-icons/fa6";
import { MdElectricBolt, MdLocalFireDepartment } from "react-icons/md";
import { IoMdWater } from "react-icons/io";
import { GiOwl } from "react-icons/gi";
import { LuCigarette, LuCigaretteOff } from "react-icons/lu";
import { NoPetsAllowed } from "./petsLogo";
import Avatar from 'react-avatar';


const MatchPopup = ({ isMatch, onClose }) => {
    return (
        <div className={`popup ${isMatch ? 'popup--visible' : ''}`}>
            {/* <div className="popup-content"> */}
            <h1 style={{marginBottom:"32px"}}>It's a Match!</h1>
            <div
                className="card"
                style={{marginBottom:"48px"}}
            >
                <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{ borderRadius: "20px" }}></img>
                <div style={{ padding: "20px", textAlign: "left"}}>
                    <p style={{ fontWeight: "bold" }}>$1220/month</p>
                    <p ><FaClock style={{ display: "inline" }}></FaClock> Lease Term: 8 Months</p>
                    <p ><IoCalendarNumberSharp style={{ display: "inline" }}></IoCalendarNumberSharp> Start Date: September 1, 2025</p>
                    <p ><IoLocation style={{ display: "inline" }}></IoLocation>1280 Main Street West, Hamilton</p>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <p ><FaBath style={{ display: "inline" }}></FaBath> 2</p>
                        <p ><FaBed style={{ display: "inline" }}></FaBed> 4</p>
                    </div>
                    <p >Utilities Included:</p>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <p><MdElectricBolt style={{ display: "inline" }}></MdElectricBolt> Electricity</p>
                        <p><IoMdWater style={{ display: "inline" }} /> Water</p>
                        <p><MdLocalFireDepartment style={{ display: "inline" }} /> Heat</p>
                    </div>
                </div>
            </div>

            <div style={{ width:"70%",display: "flex", justifyContent: "space-between",marginBottom:"32px" }}>

                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' size='90' /> <p>John</p></div>

                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' size='90' /> <p>John</p></div>
                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' size='90' /> <p>John</p></div>

            </div>
            <button className='gcbutton' style={{marginBottom:"16px"}} onClick={onClose}>Start a group chat</button>
            <button onClick={onClose}>Keep Swiping</button>
            {/* </div> */}
        </div>
    );
};

export default MatchPopup;
