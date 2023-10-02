document.addEventListener("DOMContentLoaded", async () => {
    // Fetch user info from MongoDB
    const userInfo = await getUserInfoFromDB();
  
    // Update welcome message
    if (userInfo && userInfo.name) {
        document.getElementById('welcomeUser').textContent = `Welcome, ${userInfo.name}`;
    }
  
    // Get the Sign Out button by its ID
    const signOutBtn = document.getElementById("signOutBtn");
  
    // Attach sign out button event
    if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            await signOutUser();
            // Redirect to index.html
            window.location.href = "index.html";
        });
    }
});

async function getUserInfoFromDB() {
    // Implement your code to fetch user info from MongoDB
    return { name: 'John Doe' }; // Placeholder
}

async function signOutUser() {
    // Implement your sign-out logic here
}
