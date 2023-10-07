let items = [];

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

removeAllItems = () => {
  const itemsArea = document.getElementById("items-area");
  while (itemsArea.firstChild) {
    itemsArea.removeChild(itemsArea.firstChild);
  }
};

const fetchAllItems = async () => {
  const response = await axios.get("http://localhost:3000/items");
  items = response.data.data;
  appendItemCardsToPage(items);
};

const searchItem = () => {
  const searchTerm = document.getElementById("search-bar").value;
  const dataLower = searchTerm.toLowerCase().trim();
  const filteredItems = items.filter((item) => {
    const lowerCaseValues = Object.values(item).map((value) => {
      return typeof value === 'string' ? value.toLocaleLowerCase() : value;
    });
    return lowerCaseValues.some((value) => {
      if (typeof value === 'string') {
        return value.includes(dataLower);
      }
      return false; 
    });
  });
  removeAllItems();
  if (filteredItems.length) {
    appendItemCardsToPage(filteredItems);
  }
};

fetchAllItems();
