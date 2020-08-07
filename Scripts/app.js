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

    function IntroText() {
        console.log("successfully added the introduction paragraph");

        // Let's get the element on the page
        let text = document.getElementsByClassName("text")[0];

        if (text) {
            // Then lets create a new div element

            let newDiv = document.createElement("div");

            // Configure
            newDiv.innerHTML =
                `
                <p> It's really tricky to talk about yourself </p>
                <p> But I will try to keep as simples as possible</p>              
                <p> Brazilian, Born in 82 </p>
                <p> Together with my soul mate since 2011 </p>                
                <p> Living in Canada with her since 2019 </p>
                <p> Marvel Maniac (Comics, Games, Movies) </p>
                <p> Love games that get you new experiences </p>
                <p> My main goal is to turn all this chaos in codes</p>
                <p> Do let's go through the portal "Alice" </p>

                `;

            // step 4 attach the new element
            text.appendChild(newDiv);

            return true;
        }
        return false;
    }

    function projectsTextA() {
        console.log("successfully added project A paragraph");

        let intro = document.getElementsByClassName("text1")[0];

        if (intro) {

            let newDiv1 = document.createElement("div");

            newDiv1.innerHTML =
                `
                <p> CINECOM </p>
                <p> Here is where I push myself </p>
                <p> and learn new tricks about </p>     
                <p> video editing </p>     
     
                `;

            intro.appendChild(newDiv1);

            return true;
        }
        return false;
    }

    function projectsTextB() {
        console.log("successfully added project B paragraph");

        let text2 = document.getElementsByClassName("text2")[0];

        if (text2) {

            let newDiv2 = document.createElement("div");

            newDiv2.innerHTML =
                `
                <p> CODICTS </p>
                <p> I just love to see now new ideas </p>
                <p> on coding using java or css </p>     
                <p> And for me Codicts is one of the best </p>     
     
                `;

            text2.appendChild(newDiv2);

            return true;
        }
        return false;
    }

    function projectsTextC() {
        console.log("successfully added project C paragraph");

        let text3 = document.getElementsByClassName("text3")[0];

        if (text3) {

            let newDiv3 = document.createElement("div");

            newDiv3.innerHTML =
                `
                <p> Two Minute Papers </p>
                <p> I just love A.I. </p>
                <p> That something that I really </p>     
                <p> want to work with, and this channel </p>
                <p> Show me crazy stuff </p>          
     
                `;

            text3.appendChild(newDiv3);

            return true;
        }
        return false;
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

        IntroText();

        projectsTextA();

        projectsTextB();

        projectsTextC();

        validateForm();

        FooterLoader();
    }

    window.addEventListener("load", Start);

})();

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});