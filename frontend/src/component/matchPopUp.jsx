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




const MatchPopup = ({ isMatch, setCount }) => {
    return (
        <div className={`popup ${isMatch ? 'popup--visible' : ''}`}>
            {/* <div className="popup-content"> */}
            <h1 style={{marginBottom:"32px"}}>It's a Match!</h1>
            <div
                className="card"
                style={{marginBottom:"48px"}}
            >
                <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396122.jpg&fm=jpg" style={{ borderRadius: "20px" }}></img>
                <div style={{ padding: "20px", textAlign: "left"}}>
                    <p style={{ fontWeight: "bold" }}>$1200/month</p>
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

                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t4.ftcdn.net/jpg/01/51/99/39/360_F_151993994_mmAYzngmSbNRr6Fxma67Od3WHrSkfG5I.jpg' size='90' /> <p>Sophia</p></div>

                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg' size='90' /> <p>David</p></div>
                <div style={{ display: "flex", flexDirection: "column" }}><Avatar round={100} src='https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg' size='90' /> <p>Ryan</p></div>

            </div>
            <button className='gcbutton' style={{marginBottom:"16px"}} >Start a group chat</button>
            <button onClick={()=>{setCount((count) => count + 1)}}>Keep Swiping</button>
            {/* </div> */}
        </div>
    );
};

export default MatchPopup;
