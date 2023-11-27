"use strict";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, setDoc, getDocs, doc, collection, query, } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const firebaseApp = initializeApp
({
    apiKey: "AIzaSyCauhB3BA-xKg_zqebSit2FwppIq9SZnNI",
    authDomain: "secretsanta-7bc16.firebaseapp.com",
    projectId: "secretsanta-7bc16",
    storageBucket: "secretsanta-7bc16.appspot.com",
    messagingSenderId: "77542571669",
    appId: "1:77542571669:web:2bad279d4fc66db33da59c",
    measurementId: "G-DWF84JPF5M"
});

const db = getFirestore(firebaseApp);
let people = "";

/**
 * When the user hits the enter button it takes the info, then passes it to addPeople().
 */
function handleEnter()
{
    let giverFeild = document.getElementById("giver"); //Gets the giver textfeild
    let receiverFeild = document.getElementById("receiver") //Gets the reciever textfeild
    let giver = giverFeild.value.trim();
    let reciever = receiverFeild.value.trim();

    if(giver == '' || giver == null || reciever == '' || reciever == null) //If they haven't put something in both feilds
    {
        alert("Both the your name and the person you choose need to be inserted.");
    }

    else //If there is something in both feilds
    {
        giver = titleCase(giver); 
        reciever = titleCase(reciever); 

        addPeople(giver, reciever);
    }
}

/**
 * Puts the name given into Title Case
 * 
 * @param {*} name 
 * @returns 
 */
function titleCase(name)
{
    name = name[0].toUpperCase() + name.substring(1).toLowerCase();
    return name;
}

/**
 * Puts the names into the database as long as they are not already in there.
 * 
 * @param {*} giver 
 * @param {*} reciever 
 */
async function addPeople(giver, reciever)
{
    if(!people.includes(giver)) //If the name is already in the database.
    {
        try 
        {
            const docRef = await setDoc(doc(db, "Santa", giver), 
            {
                "Giving To": reciever,
            }); //Puts the names into the datebase Santa

            alert("Submitted, Thank you!"); 
        } 
    
        catch (e) //If something goes wrong
        {
            console.error("Error adding names. Ask Vi for help.");
        }
    }

    else //If the person is already in the db
    {
        alert(giver + " has already been added to the log.");
    }

    location.reload(); //Refreshes page
}

/**
 *  Gets all of the people in the database
 */
async function readPeople() 
{ 
    const querySnapshot = await getDocs(collection(db, "Santa")); //Pulls all the names from the db
    
    querySnapshot.forEach((doc) => 
    {
        people = people + "," + doc.id
    }); //Adds each person to the string
}

function init()
{
    let button = document.getElementById("enter");

    button.onclick = handleEnter;
    readPeople();
}

window.onload = init;