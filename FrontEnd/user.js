document.addEventListener("DOMContentLoaded", () => {
  // Fetch user info from MongoDB
  const userInfo = JSON.parse(localStorage.getItem('user'));

  // Update welcome message
  if (userInfo && (userInfo.firstname || userInfo.lastname)) {
    document.getElementById(
      "userName"
    ).innerHTML = (userInfo.firstname || " ") + " " + (userInfo.lastname || " ");
  }

  // Get the Sign Out button by its ID
  const signOutBtn = document.getElementById("signOutBtn");

  // Attach sign out button event
  if (signOutBtn) {
    signOutBtn.addEventListener("click", async () => {
      signOutUser();
    });
  }
});

async function getUserInfoFromDB() {
  // fetch user info from MongoDB
  return { name: "John Doe" }; // Placeholder
}

async function signOutUser() {
  localStorage.removeItem('user');
  window.location.href = "index.html";
}

const eligibilityCheck = () => {
  if (!localStorage.getItem('user')) {
    window.location.href = "sign.html";
  }
}

eligibilityCheck();