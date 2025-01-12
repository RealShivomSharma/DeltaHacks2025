import React, { useState } from "react";
import TinderCard from "./SwipeCards";
// import TinderCard from 'react-tinder-card'
import { IoCalendarNumberSharp, IoChatbubblesOutline, IoLocation } from "react-icons/io5";
import { FaBath, FaBed, FaClock } from "react-icons/fa6";
import { MdElectricBolt, MdLocalFireDepartment } from "react-icons/md";
import { IoMdWater } from "react-icons/io";
import { GiOwl } from "react-icons/gi";
import { LuBird, LuCigarette, LuCigaretteOff } from "react-icons/lu";
import { NoPetsAllowed } from "./petsLogo";


const db = [
    {
        type: "house",
        rent: "1200",
        termLength: "8",
        startDate: "September 1, 2025",
        Address: "1280 Main Street West, Hamilton",
        numBed: "4",
        numBath: "3",
        imgLink: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        hasElec: true,
        hasHeat: true,
        hasWater: true,
    },

    {
        type: "person",
        name: "John Smith",
        age: "24",
        program: "Software Engineering",
        isNightOwl: true,
        isExtrovert: true,
        isSmoker: true,
        isPetFriendly: true,
        imgLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dportrait&psig=AOvVaw3N809GkTEaD9xyn_cCL3gF&ust=1736782316582000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCAqbrA8IoDFQAAAAAdAAAAABAE",
        bio: "Hey there! My name is John and I am going into my 4th year of Software Engineering at Mac. Feel free to reach out if you are interested in renting together"
    },
    {
        name: "Richard Hendricks",
        url: "./img/richard.jpg"
    },
    {
        name: "Erlich Bachman",
        url: "./img/erlich.jpg"
    },
    {
        name: "Monica Hall",
        url: "./img/monica.jpg"
    },
    {
        name: "Jared Dunn",
        url: "./img/jared.jpg"
    },
    {
        name: "Dinesh Chugtai",
        url: "./img/dinesh.jpg"
    }
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
                                <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" style={{ borderRadius: "20px" }}></img>
                                <div style={{ padding: "20px", textAlign: "left" }}>
                                    <p style={{ fontWeight: "bold" }}>{character.name}</p>
                                    <p >Age: {character.age} Years</p>
                                    <p > Program: {character.program}</p>
                                    <p>Year of Study: 4</p>
                                    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                                        {character.isNightOwl ? <p style={{ flex: "50%" }}><GiOwl fill="bold" style={{ display: "inline" }}></GiOwl> Night Owl</p>:<p style={{ flex: "50%" }}><LuBird fill="bold" style={{ display: "inline" }}></LuBird> Night Owl</p>}
                                        {character.isExtrovert && <p style={{ flex: "50%" }}><IoChatbubblesOutline fill="bold" style={{ display: "inline" }}></IoChatbubblesOutline> Extrovert</p>}
                                        <p style={{ flex: "50%" }}><LuCigarette style={{ display: "inline" }} /> Smoker</p>
                                        <p style={{ flex: "50%" }}><NoPetsAllowed style={{ display: "inline" }} /> No Pets</p>
                                    </div>

                                    {/* <div style={{display:"flex", justifyContent:"space-around",flexWrap:"1"}}>
    
                                    </div> */}
                                    <p >Bio:</p>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <i>"Hey there! My name is John and I am going into my 4th year of Software Engineering at Mac. Feel free to reach out if you are interested in renting together"</i>
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
