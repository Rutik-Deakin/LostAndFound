document.addEventListener("DOMContentLoaded", async () => {
  // Fetch user info from MongoDB
  const userInfo = localStorage.getItem('user');

  // Update welcome message
  if (userInfo && (userInfo.firstname || userInfo.lastname)) {
    document.getElementById(
      "userName"
    ).textContent = userInfo.firstName || " " + userInfo.lastName || " ";
  }

  // Get the Sign Out button by its ID
  const signOutBtn = document.getElementById("signOutBtn");

  // Attach sign out button event
  if (signOutBtn) {
    signOutBtn.addEventListener("click", async () => {
      await signOutUser();
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
  if(!localStorage.getItem('user')) {
    window.location.href = "sign.html";
  }
}

eligibilityCheck();