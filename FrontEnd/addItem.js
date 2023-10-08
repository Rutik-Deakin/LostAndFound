document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Create a FormData object to capture the file
    const formData = new FormData();
    formData.append("itemImage", form.itemImage.files[0]);

    // Create a JSON object for other fields
    const item = {
      title: form.itemName.value,
      description: form.itemDescription.value,
      date: form.itemDate.value,
      location: form.itemLocation.value,
    };

    // Append the JSON object to FormData
    formData.append("item", JSON.stringify(item));

    try {
      // Use fetch API to send FormData object, which includes the file and other fields
      const response = await fetch("http://localhost:3000/add-item", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Check if status code is 2xx
        alert("Item added successfully");
        // Redirect or update UI as needed
      } else {
        const data = await response.json();
        alert(`Failed to add item: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the item.");
    }
  });
});
