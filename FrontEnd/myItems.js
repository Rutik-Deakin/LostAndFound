let items = [];
let user = {};

const getLoggedInUserInfo = () => {
  const data = localStorage.getItem("user");
  user = JSON.parse(data || "{}");
  document.getElementById("userName").innerHTML =
    (user.firstname || " ") + " " + (user.lastname || " ");
};

const createItemCard = (item) => {
    const itemCard = document.createElement("div");
    itemCard.className = "col-md-4";
    itemCard.className = item._id;
    itemCard.innerHTML = `
      <div class="item-card">
        <img src="${item?.image}" alt="Item Image">
        <div class="p-3">
          <h5>${item.title}</h5>
          <small>${item?.date}</small>
          <p>${item.description}</p>
          <p><strong>Location:</strong> ${item?.location}</p>
          <button class="btn btn-danger" onclick="deleteItem('${item._id}')">Delete</button>
        </div>
      </div>
    `;
    
    return itemCard;
  };
  
const redirectToViewItem = (item) => {
  localStorage.setItem("item", item);
  window.location.href = "viewItem.html";
};

const appendItemCardsToPage = (items) => {
  const itemsArea = document.getElementById("items-area");
  items.forEach((item) => {
    const itemCard = createItemCard(item);
    itemsArea.appendChild(itemCard);
  });
const imgElements = document.querySelectorAll("img");
imgElements.forEach((img) => {
  img.addEventListener("error", () => {
    img.src = "../FrontEnd/images/default.png"; 
  });
});

};

const removeAllItems = () => {
  const itemsArea = document.getElementById("items-area");
  while (itemsArea.firstChild) {
    itemsArea.removeChild(itemsArea.firstChild);
  }
};

const fetchAllItems = async () => {
  const response = await axios.get(`http://localhost:3000/my-items/${user._id}`);
  items = response.data.data;
  appendItemCardsToPage(items);
};

const searchItem = () => {
  const searchTerm = document.getElementById("search-bar").value;
  const dataLower = searchTerm.toLowerCase().trim();
  const filteredItems = items.filter((item) => {
    const lowerCaseValues = Object.values(item).map((value) => {
      return typeof value === "string" ? value.toLocaleLowerCase() : value;
    });
    return lowerCaseValues.some((value) => {
      if (typeof value === "string") {
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

const deleteItem = async (id) => {
    if (confirm("Are you sure?")) {
        try {
            const res = await axios.delete(`http://localhost:3000/delete-item/${id}`);
            const elements = document.getElementsByClassName(id);
            if (res.data.statusCode == 200 && elements.length) {
                elements[0].remove();
            }
        } catch (error) {
            console.error(object);
        }
    }
}

getLoggedInUserInfo();

fetchAllItems();
