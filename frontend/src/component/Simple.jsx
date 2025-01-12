import React, { useState } from "react";
import TinderCard from "./SwipeCards";
// import TinderCard from 'react-tinder-card'
import { IoCalendarNumberSharp, IoChatbubblesOutline, IoLocation } from "react-icons/io5";
import { FaBath, FaBed, FaClock } from "react-icons/fa6";
import { MdElectricBolt, MdLocalFireDepartment } from "react-icons/md";
import { IoMdWater } from "react-icons/io";
import { GiOwl } from "react-icons/gi";
import { LuBird, LuCigarette, LuCigaretteOff } from "react-icons/lu";
import { NoPetsAllowed, PetsAllowed } from "./petsLogo";

import { PiChatCircleLight, PiChatCircleSlashLight } from "react-icons/pi";


const db = [


    {
        "type": "person",
        "name": "Brian Miller",
        "age": "21",
        "program": "Mechatronics Engineering",
        "isNightOwl": true,
        "isExtrovert": true,
        "isSmoker": true,
        "isPetFriendly": true,
        "imgLink": "https://st.depositphotos.com/1224365/2498/i/450/depositphotos_24980235-stock-photo-portrait-of-a-normal-man.jpg",
        "bio": "Hey there! I am currently a student at Mac. Feel free to reach out!"
    },


    {
        type: "house",
        rent: "1500",
        termLength: "12",
        startDate: "September 29, 2025",
        Address: "135 Fennell Ave W, Hamilton",
        numBed: "4",
        numBath: "2",
        imgLink: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        hasElec: true,
        hasHeat: true,
        hasWater: true,
    },

    
    {
        "type": "person",
        "name": "Alex Miller",
        "age": "24",
        "program": "Mechatronics Engineering",
        "isNightOwl": true,
        "isExtrovert": true,
        "isSmoker": true,
        "isPetFriendly": true,
        "imgLink": "https://media.istockphoto.com/id/116636149/photo/regret.jpg?s=612x612&w=0&k=20&c=h3J0aS2lyRvxr8P9a2KqNj63pa2oFvdbTOZLoZzcEUc=",
        "bio": "Hey there! I am currently a student at Mac. Feel free to reach out!"
    },

    {
        "type": "person",
        "name": "John Smith",
        "age": "26",
        "program": "Computer Science",
        "isNightOwl": false,
        "isExtrovert": false,
        "isSmoker": false,
        "isPetFriendly": false,
        "imgLink": "https://us.123rf.com/450wm/deagreez/deagreez2303/deagreez230308505/200905606-photo-of-confident-satisfied-promoter-young-man-banker-directing-fingers-mockup-open-new-cashback.jpg?ver=6",
        "bio": "Software developer. Always learning and exploring new tech!"
    },
    {
        type: "house",
        rent: "1200",
        termLength: "8",
        startDate: "September 1, 2025",
        Address: "892 East Street, Hamilton",
        numBed: "4",
        numBath: "3",
        imgLink: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
        hasElec: true,
        hasHeat: true,
        hasWater: true,
    },
    {
        "type": "person",
        "name": "Emily Johnson",
        "age": "23",
        "program": "Psychology",
        "isNightOwl": true,
        "isExtrovert": true,
        "isSmoker": false,
        "isPetFriendly": true,
        "imgLink": "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg?s=612x612&w=0&k=20&c=LoznG6eGT42_rs9G1dOLumOTlAveLpuOi_U755l_fqI=",
        "bio": "Psych major, cat lover, and aspiring therapist. Let's chat!"
    },
    {
        "type": "person",
        "name": "David Watson",
        "age": "28",
        "program": "Electrical Engineering",
        "isNightOwl": true,
        "isExtrovert": false,
        "isSmoker": true,
        "isPetFriendly": false,
        "imgLink": "https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg",
        "bio": "Engineer by day, night owl by night. Love tech and gadgets!"
    },
    {
        "type": "person",
        "name": "Lily Roberts",
        "age": "21",
        "program": "Business Administration",
        "isNightOwl": false,
        "isExtrovert": true,
        "isSmoker": false,
        "isPetFriendly": true,
        "imgLink": "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
        "bio": "Ambitious business student with a love for entrepreneurship."
    },
    {
        type: "house",
        rent: "1500",
        termLength: "12",
        startDate: "September 29, 2025",
        Address: "135 Fennell Ave W, Hamilton",
        numBed: "4",
        numBath: "2",
        imgLink: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        hasElec: true,
        hasHeat: true,
        hasWater: true,
    },
    {
        "type": "person",
        "name": "Ryan Green",
        "age": "30",
        "program": "Mechanical Engineering",
        "isNightOwl": false,
        "isExtrovert": false,
        "isSmoker": false,
        "isPetFriendly": true,
        "imgLink": "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
        "bio": "Mechanical engineer focused on design and problem-solving."
    },
    {
        "type": "person",
        "name": "Sophia White",
        "age": "25",
        "program": "Civil Engineering",
        "isNightOwl": false,
        "isExtrovert": true,
        "isSmoker": false,
        "isPetFriendly": true,
        "imgLink": "https://t4.ftcdn.net/jpg/01/51/99/39/360_F_151993994_mmAYzngmSbNRr6Fxma67Od3WHrSkfG5I.jpg",
        "bio": "Civil engineering student passionate about sustainable buildings."
    },
    {
        type: "house",
        rent: "1200",
        termLength: "8",
        startDate: "September 1, 2025",
        Address: "1280 Main Street West, Hamilton",
        numBed: "4",
        numBath: "3",
        imgLink: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396122.jpg&fm=jpg",
        hasElec: true,
        hasHeat: true,
        hasWater: true,
    },


];

function Simple({ setCount }) {
    const characters = db;
    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        setLastDirection(direction);
        setCount((count) => count + 1)
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/css?family=Damion&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
                rel="stylesheet"
            />
            <div className="cardContainer">
                {characters.map((character) => (
                    
                    <TinderCard
                        className="swipe"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                    >
                        {
                            character.type === "house" ? (
                                <div
                                    className="card"
                                >
                                    <img src={character.imgLink} style={{ borderRadius: "20px" }}></img>
                                    <div style={{ padding: "20px", textAlign: "left" }}>
                                        <p style={{ fontWeight: "bold" }}>${character.rent}/month</p>
                                        <p ><FaClock style={{ display: "inline" }}></FaClock> Lease Term: {character.termLength} Months</p>
                                        <p ><IoCalendarNumberSharp style={{ display: "inline" }}></IoCalendarNumberSharp> Start Date: {character.startDate}</p>
                                        <p ><IoLocation style={{ display: "inline" }}></IoLocation>{character.Address}</p>
                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            <p ><FaBed style={{ display: "inline" }}></FaBed> {character.numBed}</p>
                                            <p ><FaBath style={{ display: "inline" }}></FaBath> {character.numBath}</p>
                                        </div>

                                        <p >Utilities Included:</p>
                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            {character.hasElec && <p><MdElectricBolt style={{ display: "inline" }}></MdElectricBolt> Electricity</p>}
                                            {character.hasWater && <p><IoMdWater style={{ display: "inline" }} /> Water</p>}
                                            {character.hasHeat && <p><MdLocalFireDepartment style={{ display: "inline" }} /> Heat</p>}
                                        </div>
                                    </div>
                                </div>
                            ) : (<div
                                className="card"
                            >
                                <img src={character.imgLink} style={{ borderRadius: "20px" }}></img>
                                <div style={{ padding: "20px", textAlign: "left" }}>
                                    <p style={{ fontWeight: "bold" }}>{character.name}</p>
                                    <p >Age: {character.age} Years</p>
                                    <p > Program: {character.program}</p>
                                    <p>Year of Study: 4</p>
                                    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                                        {character.isNightOwl ? <p style={{ flex: "50%" }}><GiOwl fill="bold" style={{ display: "inline" }}></GiOwl> Night Owl</p>:<p style={{ flex: "50%" }}><LuBird fill="bold" style={{ display: "inline" }}></LuBird> Early Bird</p>}
                                        {character.isExtrovert ? <p style={{ flex: "50%" }}><PiChatCircleLight fill="bold" style={{ display: "inline" }}></PiChatCircleLight> Extrovert</p>:<p style={{ flex: "50%" }}><PiChatCircleSlashLight fill="bold" style={{ display: "inline" }}></PiChatCircleSlashLight> Introvert</p>}
                                        {character.isSmoker ? <p style={{ flex: "50%" }}><LuCigarette style={{ display: "inline" }} /> Smoker</p>: <p style={{ flex: "50%" }}><LuCigaretteOff style={{ display: "inline" }} /> Non-Smoker</p>}
                                        {character.isPetFriendly?<p style={{ flex: "50%" }}><PetsAllowed style={{ display: "inline" }} /> Pet Friendly</p>:<p style={{ flex: "50%" }}><NoPetsAllowed style={{ display: "inline" }} /> No Pets</p>}
                                    </div>

                                    {/* <div style={{display:"flex", justifyContent:"space-around",flexWrap:"1"}}>
    
                                    </div> */}
                                    <p >Bio:</p>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <i>{character.bio}</i>
                                    </div>
                                </div>
                            </div>)
                        /* */}



                    </TinderCard>
                ))}
            </div>
            {lastDirection ? (
                <h2 className="infoText">You swiped {lastDirection}</h2>
            ) : (
                <h2 className="infoText" />
            )}
        </div>
    );
}

export default Simple;

{/* <LuBird /> */ }
