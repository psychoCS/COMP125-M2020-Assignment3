"use strict";

import { Contact } from "./contact.js";

//import { objects.Person } from "./person.js"

// IIFE -Immediately Invoked Function Expression
(function () {
  function highlightActiveLink(id: string): void {
    let navAnchors = document.querySelectorAll("li a");

    for (const anchor of navAnchors) {
      anchor.className = "nav-link";
    }

    for (const anchor of navAnchors) {
      let anchorString = anchor.getAttribute("id");

      if (id === anchorString) {
        anchor.className = "nav-link active";
      }
    }
  }

  function validateForm(): void {
    let contact = new Contact();

    let contactForm = document.forms[0];

    contactForm.noValidate = true;

    let errorMessage = document.getElementById("errorMessage");

    let firstName = document.getElementById("firstName") as HTMLInputElement;

    firstName.addEventListener("blur", (event) => {
      if (firstName.value.length < 2) {
        firstName.focus();
        errorMessage.hidden = false;
        errorMessage.textContent =
          "Please enter a Valid First Name with a length of 2 or more characters";
      } else {
        contact.firstName = firstName.value;
        errorMessage.hidden = true;
      }
    });

    let lastName = document.getElementById("lastName") as HTMLInputElement;
    lastName.addEventListener("blur", (event) => {
      if (lastName.value.length < 2) {
        lastName.focus();
        errorMessage.hidden = false;
        errorMessage.textContent =
          "Please enter a Valid Last Name with a length of 2 or more characters";
      } else {
        contact.lastName = lastName.value;
        errorMessage.hidden = true;
      }
    });

    let contactNumber = document.getElementById(
      "contactNumber"
    ) as HTMLInputElement;
    contactNumber.addEventListener("blur", (event) => {
      let contactNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
      if (!contactNumberPattern.test(contactNumber.value)) {
        contactNumber.focus();
        errorMessage.hidden = false;
        errorMessage.textContent = "Please enter a Valid Contact Number";
      } else {
        contact.contactNumber = contactNumber.value;
        errorMessage.hidden = true;
      }
    });

    let emailAddress = document.getElementById(
      "emailAddress"
    ) as HTMLInputElement;
    emailAddress.addEventListener("blur", (event) => {
      let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!emailPattern.test(emailAddress.value)) {
        emailAddress.focus();
        errorMessage.hidden = false;
        errorMessage.textContent = "Please enter a Valid email address";
      } else {
        contact.emailAddress = emailAddress.value;
        errorMessage.hidden = true;
      }
    });

    let shortMessage = document.getElementById(
      "shortMessage"
    ) as HTMLInputElement;
    shortMessage.addEventListener("blur", (event) => {
      contact.shortMessage = shortMessage.value;
    });

    // creates a "hook" or reference to the button element with an id of "submitButton"
    let submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Submit Button Clicked");

      console.log(contact.toString());

      console.log(contact.toJSON());

      localStorage.setItem("contact", contact.toString());

      console.log(localStorage.getItem("contact"));

      localStorage.clear();
    });
  }

  function setPageContent(id: string): void {
    document.title = id;

    window.history.pushState("", id, "/" + id.toLowerCase());

    highlightActiveLink(id);

    // content switcher
    switch (id) {
      case "Home":
        HomeContent();
        break;
      case "Contact":
        ContactContent();
        break;
      case "Products":
        ProductsContent();
        break;
      case "Services":
        ServicesContent();
        break;
      case "About":
        AboutContent();
        break;
    }

    loadFooter();
  }

  function InitializeSite(): void {
    console.info("Header Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/partials/header.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let header = document.getElementsByTagName("header")[0];

        let headerData = XHR.responseText;

        header.innerHTML = headerData;

        setPageContent("Home");

        let navLinks = document.getElementsByTagName("a");

        for (const link of navLinks) {
          link.addEventListener("click", (event) => {
            event.preventDefault();

            let id: string = link.getAttribute("id");

            setPageContent(id);
          });
        }
      }
    });
  }

  function loadAddressBookData(): void {
    console.info("AddressBook Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Data/addressbook.json");

    // step 3 - Executes the request
    XHR.send();

    // step 4 - register the readystate event
    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let dataFile = JSON.parse(XHR.responseText);
        let addressBook = dataFile.addressBook;

        console.log(addressBook);

        let contactList = [];

        for (const record of addressBook) {
          let contact = new Contact();
          contact.setContact(record);
          contactList.push(contact);
        }

        console.log(contactList);

        let tableBody = document.getElementById("tableBody");
        for (const contact of contactList) {
          let row = document.createElement("tr");
          row.innerHTML = `
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.contactNumber}</td>
                    <td>${contact.emailAddress}</td>
                    `;
          tableBody.appendChild(row);
        }
      }
    });
  }

  function loadFooter(): void {
    console.info("Footer Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/partials/footer.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let footer = document.getElementsByTagName("footer")[0];

        let footerData = XHR.responseText;

        footer.innerHTML = footerData;
      }
    });
  }

  function AboutContent(): void {
    console.info("About Content Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/content/about.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let main = document.getElementsByTagName("main")[0];

        let mainData = XHR.responseText;

        main.innerHTML = mainData;
      }
    });
  }

  function ContactContent(): void {
    console.info("Contact Content Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/content/contact.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let main = document.getElementsByTagName("main")[0];

        let mainData = XHR.responseText;

        main.innerHTML = mainData;

        validateForm();
      }
    });
  }

  function HomeContent(): void {
    console.info("Home Content Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "/Views/content/home.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let main = document.getElementsByTagName("main")[0];

        let mainData = XHR.responseText;

        main.innerHTML = mainData;
      }
    });
  }

  function ProductsContent(): void {
    console.info("Products Content Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/content/products.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let main = document.getElementsByTagName("main")[0];

        let mainData = XHR.responseText;

        main.innerHTML = mainData;

        loadAddressBookData();
      }
    });
  }

  function ServicesContent(): void {
    console.info("Services Content Loading...");

    // step 1 - creates the XHR object
    let XHR = new XMLHttpRequest();

    // step 2 - configures the message
    XHR.open("GET", "./Views/content/services.html");

    // step 3 - Executes the request
    XHR.send();

    XHR.addEventListener("readystatechange", function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        let main = document.getElementsByTagName("main")[0];

        let mainData = XHR.responseText;

        main.innerHTML = mainData;
      }
    });
  }

  function setCookie(
    cookie_name: string,
    cookie_value: string,
    expiry_in_days: number,
    path: string = "/"
  ): void {
    let date = new Date();
    date.setTime(date.getTime() + expiry_in_days * 24 * 60 * 60 * 1000);

    let expires = "expires=" + date.toUTCString();

    path = encodeURIComponent(path);
    document.cookie =
      cookie_name + "=" + cookie_value + ";" + expires + ";" + path;
  }

  function getCookie(cookie_name: string): string {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);

    let cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let component = cookieArray[i];

      while (component.charAt(0) == " ") {
        component = component.substring(1);
      }
      if (component.indexOf(name) == 0) {
        return component.substring(name.length, component.length);
      }
    }
    return "";
  }

  // named function
  function Start(): void {
    console.log("%cApp Started...", "color:white; font-size: 24px;");

    InitializeSite();

    sessionStorage.setItem("username", "Tom");

    console.log(sessionStorage.getItem("username"));

    sessionStorage.clear();

    let tom = new objects.Person("Tom", 23);
    tom.SaysHello();

    let peter = new objects.Student("Peter", 22, "A1234567890");
    peter.SaysHello();
    peter.Studies();
  }

  window.addEventListener("load", Start);
})();
