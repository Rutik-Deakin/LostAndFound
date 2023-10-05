let items = [];
const fetchAllItems = async () => {
  const response = await axios.get("http://localhost:3000/items");
  console.log("Test: ", response.data.data);
  items = response.data.data;

  createItemCard = (item) => {
    const itemCard = document.createElement("div");
    itemCard.className = "col-md-4";
    itemCard.innerHTML = `
      <div class="item-card">
        <img src="${item?.image}" alt="Item Image">
        <div class="p-3">
          <h5>${item.title}</h5>
          <small>${item?.date}</small>
          <p>${item.description}</p>
          <p><strong>Location:</strong> ${item?.location}</p>
        </div>
      </div>
    `;
    return itemCard;
  };

  appendItemCardsToPage = (items) => {
    const itemsArea = document.getElementById("items-area");
    items.forEach((item) => {
      const itemCard = createItemCard(item);
      itemsArea.appendChild(itemCard);
    });
  };

  appendItemCardsToPage(items);
};
fetchAllItems();
