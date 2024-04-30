// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDScVEwsrbyS_HpjpMlMS8HQVTur55ftt8",
    authDomain: "homemanager-8dd42.firebaseapp.com",
    projectId: "homemanager-8dd42",
    storageBucket: "homemanager-8dd42.appspot.com",
    messagingSenderId: "448149708795",
    appId: "1:448149708795:web:88d98aa8dc5730522ab55e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
var auth = getAuth(app);

// Get a reference to the firestore service
var db = getFirestore(app);

function login() {
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (localStorage.getItem("email") != null) {
        email = localStorage.getItem("email");
    }
    if (localStorage.getItem("password") != null) {
        password = localStorage.getItem("password");
    }

    // Sign in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            localStorage.setItem("success", true);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            $(".login").slideToggle();
            $(".warning").html("");

            // Get data from Firestore
            getDocs(collection(db, "billslist")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    document.getElementById('bills_database_content').innerHTML += "Bill: " + doc.data().bill + "</br>Due: " + doc.data().due + "</br>Amount: " + doc.data().ammount + '</br></br>';
                });
            });
        })
        .catch((error) => {
            console.error('Error signing in: ', error);
        });
}

document.getElementById('login').addEventListener('click', login);
$(function() { 
    if (localStorage.getItem("success")) {
        login();
    }
});
