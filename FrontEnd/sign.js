// Function to validate the email format
function validateEmail(email) {
  const re = /^[^@]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return re.test(String(email).toLowerCase());
}

// Function to validate strong password
function validateStrongPassword(password) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,}$/;
  return re.test(password);
}

// Add submit event listener to the sign-in form
document.getElementById("signinForm").addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the email and password input elements
  const email = document.getElementById("signin-email");
  const password = document.getElementById("signin-password");

  // Get the error message elements for the email and password inputs
  const emailError = document.getElementById("signin-emailError");
  const passwordError = document.getElementById("signin-passwordError");

  // Set a flag for form validation
  let isValid = true;

  // Validate the email input value
  if (!validateEmail(email.value)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate the password input value
  if (password.value.trim() === "") {
    passwordError.textContent = "Please enter your password.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // Check if the form is valid
  if (isValid) {
    // Perform the sign-in HTTP request to the server
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sign-in successful
          console.log("Sign in successful!");

          // Reset the form
          document.getElementById("signinForm").reset();

          //Forward to portal.html
          window.location.href = "userPrompt.html";

          // Create and display a success message element
          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-3";
          successMessage.textContent = "Sign in successful!";
          document.getElementById("signinForm").appendChild(successMessage);

          // Remove the success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        } else {
          // Sign-in failed
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

// Event listener to the sign-up form
document.getElementById("signupForm").addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get input elements
  const firstname = document.getElementById("signup-firstname");
  const lastname = document.getElementById("signup-lastname");
  const phone = document.getElementById("signup-phone");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");
  const confirmPassword = document.getElementById("signup-confirm-password");

  // Get error message elements
  const firstnameError = document.getElementById("signup-firstnameError");
  const lastnameError = document.getElementById("signup-lastnameError");
  const phoneError = document.getElementById("signup-phoneError");
  const emailError = document.getElementById("signup-emailError");
  const passwordError = document.getElementById("signup-passwordError");
  const confirmPasswordError = document.getElementById(
    "signup-confirm-passwordError"
  );

  // Set a flag for form validation
  let isValid = true;

  // Validate first name input
  if (firstname.value.trim() === "") {
    firstnameError.textContent = "Please enter your first name.";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }

  // Validate last name input
  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Please enter your last name.";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }

  // Validate phone number input
  if (phone.value.trim() === "") {
    phoneError.textContent = "Please enter your phone number.";
    isValid = false;
  } else if (phone.value.trim().length !== 10) {
    phoneError.textContent = "Please enter a 10-digit phone number.";
    isValid = false;
  } else {
    phoneError.textContent = "";
  }

  // Validate email input
  if (email.value.trim() === "") {
    emailError.textContent = "Please enter your email.";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate password input
  if (password.value.trim() === "") {
    passwordError.textContent = "Please enter your password.";
    isValid = false;
  } else if (!validateStrongPassword(password.value)) {
    passwordError.textContent =
      "Your password should be at least 6 characters long, include a lowercase letter, an uppercase letter, and a number.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // Validate confirm password input
  if (confirmPassword.value.trim() === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  // Check if the form is valid
  if (isValid) {
    // Perform the sign-up HTTP request to the server
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname.value,
        lastname: lastname.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sign-up successful
          console.log("Sign up successful!");

          // Reset the form
          document.getElementById("signupForm").reset();

          // Display a success message element
          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-3";
          successMessage.textContent = "Sign Up Successful!";
          document.getElementById("signupForm").appendChild(successMessage);

          // Remove the success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        } else {
          // Sign-up failed
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
