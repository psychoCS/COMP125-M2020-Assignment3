/*

Name: app.js
Author: Thiago Batista
Student Number: 301110966
Description: Assignment 3
Program: COMP125 M2020
Date: 07 / 08 / 2020
Website: Thiago `s Portfolio
File Description: Simple css file with all the codes for my first portfolio page.

*/

"use strict";

// IIFE -Immediately Ivoked Function Expression
(function () {

    function HeaderLoader() {
        // console control message
        console.info("Loading Header...");

        // create the Header Loader object
        let HRL = new XMLHttpRequest();

        // Gets everything from the header file 
        HRL.open("GET", "./Views/partials/header.html")

        // Send everything inside of it to... 
        HRL.send();

        // ... here. So all the codes from the header.html will be injected on the "current" page that have the header tag as soon as it opens.
        HRL.addEventListener("readystatechange", function () {
            if ((HRL.readyState === 4) && (HRL.status === 200)) {
                let header = document.getElementsByTagName("header")[0];
                let headerData = HRL.responseText;
                header.innerHTML = headerData;
            }
        });
    }

    function Paragraphs() {
        console.info("Paragraphs Loading...");

        // Creates the Object
        let PAR = new XMLHttpRequest();

        // That will open the Json file
        PAR.open("GET", "Scripts/paragraphs.json");

        // And Send the information... 
        PAR.send();

        // ...Here, so the JS can read it, slice it and inject it in the proper places 
        PAR.addEventListener("readystatechange", function () {
            if ((PAR.readyState === 4) && (PAR.status === 200)) {

                let paragraph = JSON.parse(PAR.responseText);
                var paragraphArray = paragraph.Paragraphs;
                let variable = document.getElementsByClassName("text")[0];

                // Loop to se witch page you are.
                if (variable = document.getElementsByClassName("text")[0]) {
                    document.getElementsByClassName("text")[0].innerHTML = paragraphArray[0].Introduction;
                } else if (variable = document.getElementsByClassName("text1")[0]) {
                    document.getElementsByClassName("text1")[0].innerHTML = paragraphArray[0].FirstProject;
                    document.getElementsByClassName("text2")[0].innerHTML = paragraphArray[0].SecondProject;
                    document.getElementsByClassName("text3")[0].innerHTML = paragraphArray[0].ThirdProject;
                }
            }
        });
    }

    function FooterLoader() {
        // console control message
        console.log("Footer added");

        // create the footer Loader object
        let FTL = new XMLHttpRequest();

        // Gets everything from the footer file 
        FTL.open("GET", "./Views/partials/footer.html")

        // Send everything inside of it to... 
        FTL.send();

        // ... here. So all the codes from the header.html will be injected on the "current" page that have the footer tag as soon as it opens.
        FTL.addEventListener("readystatechange", function () {
            if ((FTL.readyState === 4) && (FTL.status === 200)) {
                let footer = document.getElementsByTagName("footer")[0];
                let footerData = FTL.responseText;
                footer.innerHTML = footerData;
            }
        });
    }

    function validateForm() {
        let contactUsForm = document.forms[0];

        if (contactUsForm) {
            contactUsForm.noValidate = true;

            let errorMessage = document.getElementById("errorMessage");

            let firstName = document.getElementById("firstName");
            firstName.addEventListener("blur", (event) => {
                if (firstName.value.length < 2) {
                    firstName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter at least 2 or more characters";
                } else {
                    errorMessage.hidden = true;
                }
            });

            let lastName = document.getElementById("lastName");
            lastName.addEventListener("blur", (event) => {
                if (lastName.value.length < 3) {
                    lastName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter at least 3 or more characters";
                } else {
                    errorMessage.hidden = true;
                }
            });

            // creates a "hook" or reference to the button element with an id of "submitButton"
            let submitButton = document.getElementById("submitButton");

            submitButton.addEventListener("click", (event) => {
                event.preventDefault();
                console.log("Submit Button Clicked");
            });
        }
        return false;
    }

    // Start the functions
    function Start() {
        console.log('%cApp Started...', "color:white; font-size: 24px;");

        HeaderLoader();

        FooterLoader();

        Paragraphs()

        validateForm();

    }

    window.addEventListener("load", Start);

})();

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});