// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async () => {
    let item = {};

    // Function to get the selected item from localStorage
    const getSelectedItem = async () => {
        const selectedItemId = localStorage.getItem('item') || "";

        if (selectedItemId.length) {
            try {
                const response = await axios.get(`http://localhost:3000/items/${selectedItemId}`);
                item = response.data.data;

                document.getElementById("itemImage").src = item.image || "";
                document.getElementById("itemTitle").textContent = item.title || "";
                document.getElementById("itemDescription").textContent = item.description || "";
                document.getElementById("itemLocation").innerHTML = `<b>Location: </b> ${item.location || ""}`;
                document.getElementById("itemDate").innerHTML = `<b>Date: </b>${item.date || ""}`;

                const user = item.user;
                if (user) {
                    document.getElementById("personName").textContent = `${user.firstname} ${user.lastname}`;
                    document.getElementById("personEmail").innerHTML = `<b>Email: </b>${user.email} <small>(Click for quick contact)</small>`;
                    document.getElementById("personEmail").setAttribute('href', `mailto:${user.email}`)
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }
    };
    getSelectedItem();
});
