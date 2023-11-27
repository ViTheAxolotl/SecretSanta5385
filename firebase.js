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
let people;

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
    if(!people.contains(giver))
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
        alert(giver + " has already been added to the log.")
    }
}

async function readPeople()
{
    const q = query(collection(db, "Santa"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
    {
        people = people + "," + doc.id
    });
}

function init()
{
    let button = document.getElementById("enter");

    button.onclick = handleEnter;
    readPeople();
}

window.onload = init;