"use strict";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, setDoc, doc, collection } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

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

function init()
{
    let button = document.getElementById("enter");

    button.onclick = handleEnter;
}

function handleEnter()
{
    let giverFeild = document.getElementById("giver");
    let receiverFeild = document.getElementById("receiver")
    let giver = giverFeild.value;
    let reciever = receiverFeild.value;
    if(giver == '' || giver == null || reciever == '' || reciever == null)
    {
        alert("Both the your name and the person you choose need to be inserted.");
    }

    else
    {
        giver = giver[0].toUpperCase() + giver.substring(1).toLowerCase();
        reciever = reciever[0].toUpperCase() + reciever.substring(1).toLowerCase();

        addPeople(giver, reciever);
        giverFeild.value = "";
        receiverFeild.value = "";
    }
}

async function addPeople(giver, reciever)
{
    if(document.cookie != "")
    {
        try 
        {
            const docRef = await setDoc(doc(db, "Santa", giver), 
            {
                "Giving To": reciever,
            });

            setCookie(giver, reciever)
            alert("Submitted, Thank you!")
        } 
    
        catch (e) 
        {
            console.error("Error adding names: ", e);
        }
    }

    else
    {
        validateSanta();
    }
}

function setCookie(giver, reciever)
{
    let data = [giver, reciever]
    const d = new Date();
    d.setTime(d.getTime() + (35*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "Data = " + data + ";" + expires + ";path=/";
}

function validateSanta()
{
    let cookie = document.cookie.split(",");
    alert("You have already submitted dummy. " + cookie[0] + ", is you right? Your giving a gift to " + cookie[1] + ", silly.");
}

window.onload = init;