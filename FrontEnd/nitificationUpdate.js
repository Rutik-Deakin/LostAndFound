// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user') || {});
  let notifications = [];
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const removeAllNotifications = () => {
    const itemsArea = document.getElementById("notifications-area");
    if (itemsArea) {
      while (itemsArea.firstChild) {
        itemsArea.removeChild(itemsArea.firstChild);
      }
    }
  }

  const updateNotifications = (newNotifications) => {
    const notificationsArea = document.getElementById('notifications-area');
    newNotifications.forEach(notification => {
      // Check if the notification is already displayed
      const existingNotification = document.getElementById(`notification-${notification._id}`);
      if (!existingNotification) {
        const notificationCard = document.createElement('div');
        notificationCard.id = `notification-${notification._id}`;
        notificationCard.classList.add('notification-card');
        notificationCard.addEventListener('click', () => {
          localStorage.setItem('item', notification.item._id);
          window.location.href="viewItem.html"
        })

        const dateString = notification.time;
        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString(undefined, options);

        const details = document.createElement('p');
        details.innerHTML = `<b>${notification.fromUser.firstname} ${notification.fromUser.lastname} </b> at <b> ${formattedDate} </b>`;
        notificationCard.appendChild(details);

        const message = document.createElement('p');
        message.textContent = `Recently tried to contact you for the item "${notification.item.title}"`;
        notificationCard.appendChild(message);

        notificationsArea.insertBefore(notificationCard, notificationsArea.firstChild);
      }
    });
  }

  const getNotification = async() => {
    let res = await axios.get(`http://localhost:3000/notifications/${loggedInUser._id}`)
    let newNotifications = res.data.data;

    if (!notifications.length) {
      notifications = newNotifications;
    } else {
      const test = []
      newNotifications.forEach((notification) => {
        if (notifications.some((n) => n._id == notification._id)) {
        } else {
          test.push(notification)
        }
      })
      notifications = test;
    }
    removeAllNotifications()
    updateNotifications(newNotifications);
  }

  getNotification();

  setInterval(() => {
    getNotification();
  }, 10000);
});
