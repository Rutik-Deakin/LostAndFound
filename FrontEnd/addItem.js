document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const item = {
      title: formData.get("itemName"),
      description: formData.get("itemDescription"),
      date: formData.get("itemDate"),
      location: formData.get("itemLocation"),
    };

    try {
      const response = await fetch("http://localhost:3000/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });

      if (response.status === 201) {
        alert("Item added successfully");
        // Redirect or update UI as needed
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
