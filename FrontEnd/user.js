document.addEventListener("DOMContentLoaded", () => {
  // Check for user eligibility
  eligibilityCheck();

  // Fetch user info from MongoDB
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // Update welcome message and Sign Out button
  if (userInfo && (userInfo.firstname || userInfo.lastname)) {
    document.getElementById("userName").innerHTML =
      (userInfo.firstname || " ") + " " + (userInfo.lastname || " ");
    createSignOutButton();
  }
});

async function getUserInfoFromDB() {
  // Fetch user info from MongoDB
  return { name: "John Doe" }; // Placeholder
}

async function signOutUser() {
  localStorage.removeItem("user");
  console.log("Signed out successfully!");
  window.location.href = "index.html";
}

const eligibilityCheck = () => {
  const location = (window.location.href || "").split("/").pop();
  const restrictedPages = ["userPrompt.html", "itemList.html", "addItem.html"];
  if (!localStorage.getItem("user") && restrictedPages.includes(location)) {
    window.location.href = "sign.html";
  }
};

const createSignOutButton = () => {
  const signOutBtn = document.createElement("button");
  signOutBtn.id = "signOutBtn";
  signOutBtn.className = "btn btn-danger";
  signOutBtn.innerHTML = "Sign Out";
  signOutBtn.addEventListener("click", () => {
    console.log("Signing out...");
    signOutUser();
  });

  // Append the button to the user section in the navbar
  document.getElementById("userSection").appendChild(signOutBtn);
};
