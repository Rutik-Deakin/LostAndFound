document.getElementById("submitEnquiry").addEventListener("click", function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    // Get the error message elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Set a flag for form validation
    let isValid = true;

    // Validate the name input value
    if (name.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validate the email input value
    if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate the message input value
    if (message.trim() === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    // Check if the form is valid
    if (!isValid) {
        return;
    }

    // Send a POST request to the server
    fetch('/submitEnquiry', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your enquiry. We will get back to you soon!');
            document.getElementById('enquiryForm').reset();
        } else {
            alert('There was a problem submitting your enquiry. Please try again.');
        }
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
